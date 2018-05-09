import React from 'react';
import { browserHistory } from 'react-router';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import throttle from 'lodash/throttle';
import util from '../../../utils';

import { MAPBOX_TOKEN, MAPBOX_RESOURCES_STYLE } from '../../../constants/configs';
import { CHICAGO_CENTER } from '../../../constants/mapCoordinates';
import resourceCategories from '../../../constants/resourceCategories';

function getResourcesIcon(category) {
  let iconName;
  forEach(resourceCategories, resourceData => {
    if (resourceData.name === category) {
      // TODO: change resources' slugs back to lowercase
      iconName = resourceData.name.toLowerCase();
    }
  });
  return iconName;
}

function getMapResources(data) {
  const container = {
    type: 'FeatureCollection',
    features: []
  };

  forEach(data, (areas, key) => {
    areas.icon = getResourcesIcon(areas.categories);

    container.features.push({
      type: 'Feature',
      properties: areas,
      geometry: {
        'type': 'Point',
        'coordinates': [areas.longitude, areas.latitude]
      }
    });
  });

  return container;
}

function filterData(props) {
  let list;
  if (props.resources) {
    list = isEmpty(props.areaSelect) ? props.resources : props.filteredResources;
  } else if (props.hospitals) {
    list = isEmpty(props.areaSelect) ? props.hospitals : props.hospitals;
  }

  return list.filter(item => {
    let v = false;
    props.filter.forEach(cat => {
      if (item.categories && item.categories.includes(cat)) {
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
    style: MAPBOX_RESOURCES_STYLE,
    center: CHICAGO_CENTER,
    zoom: 9.6
  });

  props.newResourcesMap(map);

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  const resources = getMapResources(filterData(props));

  const showBounds = () => {
    props.trimmResorcesByZone(map.getBounds());
  };
  map.on('moveend', throttle(() => showBounds(), 5000));

  map.on('load', () => {

    map.addSource('resources', {
      type: 'geojson',
      data: resources,
      cluster: true,
      clusterMaxZoom: 13,
      clusterRadius: 50
    });

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'resources',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': {
          property: 'point_count',
          type: 'interval',
          stops: [
            [0, '#CFD0D5'],
            [100, '#A2A9AC'],
            [500, '#727E82'],
            [750, '#4E5658']
          ]
        },
        'circle-radius': {
          property: 'point_count',
          type: 'interval',
          stops: [
            [0, 25],
            [100, 35],
            [500, 45],
            [750, 55]
          ]
        }
      }
    });

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'resources',
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
      id: 'points',
      type: 'symbol',
      source: 'resources',
      interactive: true,
      filter: ['!has', 'point_count'],
      layout: {
        'icon-image': '{icon}',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-padding': 0
      }
    }, 'place-city-sm');

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['points'] });

      if (!features.length) {
        return;
      }

      const feature = features[0];
      props.resourcesPointClicked(feature.properties.id);
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
        layout: {},
        paint: {
          'fill-color': '#AFDDF9',
          'fill-opacity': 0.8
        }
      }, 'barrier_line-land-polygon');

      map.flyTo({
        center: JSON.parse(areaSelect.centroid),
        zoom: 12
      });
    }
  });
}

class ResourcesMap extends React.Component {

  componentDidMount() {
    if (!isEmpty(this.props.places)) {
      addMap(this.props);
    }
  }

  componentDidUpdate(prevProps) {
    if ((!isEmpty(this.props.places) ||
      (this.props.filteredResources !== prevProps.filteredResources)) &&
      this.props.updateMap) {
      addMap(this.props);
    }
  }

  render() {
    return (
      <div className="interactive-map" id="markers-map"></div>
    );
  }
}

export default ResourcesMap;
