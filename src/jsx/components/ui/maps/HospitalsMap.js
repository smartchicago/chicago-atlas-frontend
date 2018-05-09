import React from 'react';
import { browserHistory } from 'react-router';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import throttle from 'lodash/throttle';
import util from '../../../utils';

import { MAPBOX_TOKEN, MAPBOX_HOSPITAL_DETAIL_STYLE } from '../../../constants/configs';
import { CHICAGO_CENTER } from '../../../constants/mapCoordinates';

function getMapResources(data) {
  const container = {
    type: 'FeatureCollection',
    features: []
  };

  forEach(data, (areas, key) => {
    if (areas.lat_long) {
      areas.l_t = areas.lat_long.split(',');
      areas.longitude = JSON.parse(areas.l_t[1]);
      areas.latitude = JSON.parse(areas.l_t[0]);
    }

    areas.icon = areas.sub_type ? util.slugify(areas.sub_type) : 'uncategorized';
    areas.iconText = key + 1;

    container.features.push({
      type: 'Feature',
      properties: areas,
      geometry: {
        type: 'Point',
        coordinates: [areas.longitude, areas.latitude]
      }
    });
  });

  return container;
}

function filterData(props) {
  return props.hospitals.filter(item => {
    let v = false;
    props.filter.forEach(cat => {
      const type = item.sub_type ? util.slugify(item.sub_type) : 'uncategorized';
      if (type.includes(cat)) {
        v = true;
      }
    });
    return v;
  });
}

function getAreaSelected(areaSelect, places) {
  return places.find(x => x.slug === areaSelect['area-search']);
}

function getZipCodeSelected(zipCodeSelect, zipcodes) {
  let slug = zipCodeSelect['zip-search'].split('-');
  slug = slug.length > 1 ? slug[1] : slug[0];
  return zipcodes.find(x => x.slug === slug);
}

function addMap(props) {
  const data = props.places;

  mapboxgl.accessToken = MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: 'markers-map',
    style: MAPBOX_HOSPITAL_DETAIL_STYLE,
    center: CHICAGO_CENTER,
    zoom: 9.6
  });

  props.newHospitalsMap(map);

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  const resources = getMapResources(filterData(props));

  if (props.updateOnZoom) {
    const showBounds = () => {
      props.trimmResorcesByZone(map.getBounds());
    };
    map.on('moveend', throttle(() => showBounds(), 2000));
  }

  map.on('load', () => {

    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true. GL-JS will add the point_count property to your source data.
    map.addSource('hospitals', {
      type: 'geojson',
      data: resources,
      cluster: true,
      clusterMaxZoom: 10, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'hospitals',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': {
          property: 'point_count',
          type: 'interval',
          stops: [
            [0, '#A2A9AC'],
            [10, '#727E82'],
            [20, '#4E5658'],
          ]
        },
        'circle-radius': {
          property: 'point_count',
          type: 'interval',
          stops: [
            [0, 25],
            [10, 35],
            [20, 45]
          ]
        }
      }
    });

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'hospitals',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
        'text-size': 14
      },
      paint: {
        'text-color': '#fff'
      }
    });

    map.addLayer({
      id: 'hospitals',
      type: 'symbol',
      source: 'hospitals',
      filter: ['!has', 'point_count'],
      layout: {
        'icon-image': '{icon}',
        'icon-size': 1.25,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-padding': 0,
        'text-field': '{iconText}',
        'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.3],
        'text-anchor': 'bottom',
        'text-size': 12,
      },
      paint: {
        'text-color': '#fff'
      }
    });

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['hospitals'] });

      if (!features.length) {
        return;
      }

      const feature = features[0];
      props.hospitalsPointClicked(feature.properties.src_id);
    });

    let areaSelect;
    if (props.areaSelect && !isEmpty(props.areaSelect['area-search'])) {
      areaSelect = getAreaSelected(props.areaSelect, props.places.community_areas);
    }
    if (props.areaSelect && !isEmpty(props.areaSelect['zip-search'])) {
      areaSelect = getZipCodeSelected(props.areaSelect, props.places.zip_codes);
    }

    if (areaSelect) {
      const geometry = JSON.parse(areaSelect.geometry);
      const bounds = new mapboxgl.LngLatBounds();
      map.addLayer({
        id: 'maine',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: geometry
          }
        },
        layout: {

        },
        paint: {
          'fill-color': '#AFDDF9',
          'fill-opacity': 0.8
        }
      }, 'barrier_line-land-polygon');

      const bbox = turf.extent(geometry);
      map.flyTo({center: JSON.parse(areaSelect.centroid)});
      map.fitBounds(bbox, {padding: 20});
    }
  });

}

class HospitalsMap extends React.Component {

  componentDidMount() {
    if (!isEmpty(this.props.places)) {
      addMap(this.props);
    }
  }

  componentDidUpdate(prevProps) {
    if ((!isEmpty(this.props.places) ||
      (this.props.filteredResources !== prevProps.filteredResources)) &&
      (this.props.updateMap || prevProps.hospitals.length !== this.props.hospitals.length)) {
      addMap(this.props);
    }
  }

  render() {
    return (
      <div className="interactive-map" id="markers-map"></div>
    );
  }
}

export default HospitalsMap;
