import React from 'react';
import { browserHistory } from 'react-router';

import { MAPBOX_TOKEN, MAPBOX_COMMUNITY_AREAS_STYLE } from '../../../constants/configs';
import { CHICAGO_CENTER } from '../../../constants/mapCoordinates';
import { CITY_NAME } from '../../../constants/specialNames';
import mapColors from '../../../constants/mapColors';

import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

function mapData(places, type) {
  const container = {
    type: 'FeatureCollection',
    features: []
  };

  const keyName = type === 'ZipCodes' ? 'zip_codes' : 'community_areas';

  forEach(places[keyName], (areas, key) => {
    if (
      type === 'CommunityAreas' &&
      (key === 'null' ||
      areas.name === CITY_NAME ||
      areas.geo_type === 'Zip')
    ) { return; }

    container.features.push({
      type: 'Feature',
      properties: areas,
      geometry: JSON.parse(areas.geometry)
    });
  });

  return container;
}

function clearMapHover(map, popup) {
  map.setFilter('community-area-fills-hover', ['==', 'id', '']);
  document.getElementById('map').style.cursor = 'default';
  popup.remove();
}

function _addMap(data, type) {

  mapboxgl.accessToken = MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: 'map',
    style: MAPBOX_COMMUNITY_AREAS_STYLE,
    center: CHICAGO_CENTER,
    zoom: 9.8
  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('load', () => {
    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point, {layers: ['community-area-fills']});

      if (features && features.length) {
        document.getElementById('map').style.cursor = 'pointer';
        map.setFilter('community-area-fills-hover', ['==', 'name', features[0].properties.name]);

        popup
        .setLngLat(e.lngLat)
        .setHTML(`<h6>${features[0].properties.name}</h6>`)
        .addTo(map);

      } else {
        clearMapHover(map, popup);
      }
    });

    map.on('mouseout', function() {
      clearMapHover(map, popup);
    });

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, {layers: ['community-area-fills']});
      features.length ? browserHistory.push(`community-areas/${features[0].properties.slug}`) : null;
    });

    map.addSource('community-areas', {
      'type': 'geojson',
      'data': mapData(data, type)
    });

    if (type === 'CommunityAreas') {
      map.addLayer({
        'id': 'community-area-fills',
        'type': 'fill',
        'source': 'community-areas',
        'layout': {},
        'cursor': 'pointer',
        'paint': {
          'fill-color': {
            'property': 'part',
            'type': 'categorical',
            'stops': mapColors
          },
          'fill-opacity': 0.99
        }
      });
    } else if (type === 'ZipCodes') {
      map.addLayer({
        'id': 'community-area-fills',
        'type': 'fill',
        'source': 'community-areas',
        'layout': {},
        'cursor': 'pointer',
        'paint': {
          'fill-color': '#AFDDF9',
          'fill-opacity': 0.99
        }
      });
    }

    map.addLayer({
      'id': 'community-area-fills-hover',
      'type': 'fill',
      'source': 'community-areas',
      'layout': {},
      'paint': {
        'fill-color': '#FD4141',
        'fill-opacity': 0.9
      },
      'filter': ['==', 'name', '']
    });

    map.addLayer({
      'id': 'community-area-borders',
      'type': 'line',
      'source': 'community-areas',
      'layout': {},
      'paint': {
        'line-color': 'rgba(255,255,255, 0.5)',
        'line-width': 1.5
      }
    });

    map.scrollZoom.disable();
  });
}

class InteractiveMap extends React.Component {

  componentDidMount() {
    if (!isEmpty(this.props.places)) {
      _addMap(this.props.places, this.props.type);
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEmpty(this.props.places) &&
      (this.props.places !== prevProps.places)) {
      _addMap(this.props.places, this.props.type);
    }
  }

  render() {
    return (
      <div className="interactive-map" id="map"></div>
    );
  }

}

export default InteractiveMap;
