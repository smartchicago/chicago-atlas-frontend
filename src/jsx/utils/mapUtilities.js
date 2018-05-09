import util from './index';

import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import inRange from 'lodash/inRange';

import {
  MAP_KEY,
  CITY_NAME,
  NO_DATA_AVAILABLE
} from '../constants/specialNames';

import { browserHistory } from 'react-router';

function dynamicColors(mapStops, year) {
  return {
    'fill-color': {
      'property': MAP_KEY,
      'type': 'interval',
      'stops': getStopsForMap(mapStops, year)
    }
  };
}

function getStopsForMap(mapStops, year) {

  let resultDefault;

  const filteredByYear = mapStops
    .filter(stop => stop.year === String(year));

  if (!filteredByYear.length) {
    resultDefault = mapStops
      .filter(stop => stop.year === 'default');
  }
  mapStops = resultDefault || filteredByYear;
  
  const stop = (resultDefault || filteredByYear)
    .map(stop => [stop.start, stop.color]);

  return stop;
}

function cleanName(str) {
  if (!str) {
    return '';
  }
  return str.replace(/[^A-Z0-9]/ig, '').toLowerCase();
}

function clearMapHover(map, popup) {
  map.setFilter('community-area-fills-hover', ['==', 'id', '']);
  document.getElementById('map').style.cursor = 'default';
  popup.remove();
}

function mapData(places, data, slug) {

  const container = {
    type: 'FeatureCollection',
    features: []
  };
  forEach(places.community_areas, (areas, key) => {

    if (key === 'null' ||
      areas.name === CITY_NAME ||
      areas.geo_type === 'Zip') {
      return;
    }

    const filteredArea = data.filter(d => cleanName(d.geo_group_name.split('-')[1]) === cleanName(areas.name))[0];
    areas[MAP_KEY] = filteredArea && filteredArea[MAP_KEY] ? filteredArea[MAP_KEY] : '';

    container.features.push({
      type: 'Feature',
      properties: areas,
      geometry: JSON.parse(areas.geometry)
    });
  });

  return container;
}

function newPopup(e, features, map, popup, slug) {
  const mapKey = 'weight_percent';
  if (features && features.length) {
    const config = util.findConfigObject(slug, 'map');
    const tooltipSymbol = config ? config.symbol : '%';
    const value = features[0].properties[mapKey];

    const subtitle = value === '' ? NO_DATA_AVAILABLE : `${value.toFixed(1)} ${tooltipSymbol}`;

    document.getElementById('map').style.cursor = 'pointer';

    map.setFilter('community-area-fills-hover', ['==', 'name', features[0].properties.name]);

    popup
    .setLngLat(e.lngLat)
    .setHTML(`
        <h6>${features[0].properties.name}</h6>
        <p class="mapboxgl-popup__info">${subtitle}</p>
      `)
    .addTo(map);

  } else {
    clearMapHover(map, popup);
  }
}

function startMap(map, popup, data, areasData, slug, props) {
  map.on('load', () => {
    map.scrollZoom.disable();
    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point, {layers: ['community-area-fills']});
      newPopup(e, features, map, popup, slug);
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
      'data': mapData(data, areasData, slug)
    });

    map.addLayer({
      'id': 'community-area-fills',
      'type': 'fill',
      'source': 'community-areas',
      'cursor': 'pointer',
      'paint': dynamicColors(props.mapStops, props.year)
    });

    map.addLayer({
      'id': 'community-area-fills-hover',
      'type': 'fill',
      'source': 'community-areas',
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
      'paint': {
        'line-color': 'rgba(255,255,255, 0.5)',
        'line-width': 1.5
      }
    });

  });
}

export default {
  cleanName: cleanName,
  clearMapHover: clearMapHover,
  mapData: mapData,
  newPopup: newPopup,
  startMap: startMap,
};
