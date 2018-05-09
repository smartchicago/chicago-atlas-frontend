import React from 'react';
import util from '../../../utils';
import { MAPBOX_TOKEN, MAPBOX_HOSPITAL_DETAIL_STYLE } from '../../../constants/configs';
import { CHICAGO_CENTER } from '../../../constants/mapCoordinates';

function addMap(props) {
  const latLong = props.hospital.lat_long.split(',');
  const markerlatLong = [JSON.parse(latLong[1]), JSON.parse(latLong[0])];
  const data = props.places;
  const marker = props.subType ? util.slugify(props.subType) : 'uncategorized';

  mapboxgl.accessToken = MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: 'hospital-datail-map',
    style: MAPBOX_HOSPITAL_DETAIL_STYLE,
    center: CHICAGO_CENTER,
    zoom: 9.6,
    maxZoom: 14
  });

  map.on('load', () => {

    map.addSource('markers', {
      type: 'geojson',
      data: {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': markerlatLong
          },
          'properties': {
            // 'title': '1',
            'icon': marker
          }
        }]
      },
      cluster: false
    });

    map.addLayer({
      'id': 'points',
      'type': 'symbol',
      'source': 'markers',
      'layout': {
        'icon-image': '{icon}',
        'icon-size': 1.25,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-padding': 0,
        'text-field': '{title}',
        'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.3],
        'text-anchor': 'bottom',
        'text-size': 14,
      },
      'paint': {
        'text-color': 'white'
      }
    });

    const geometry = {
      'type': 'Point',
      'coordinates': markerlatLong
    };
    const bbox = turf.extent(geometry);
    map.flyTo({center: markerlatLong});
    map.fitBounds(bbox, {padding: 20});

    map.scrollZoom.disable();
  });

}

class HospitalMap extends React.Component {

  componentDidMount() {
    addMap(this.props);
  }

  render() {
    return (
      <div className="v-hospital__datail-map" id="hospital-datail-map"></div>
    );
  }
}

export default HospitalMap;
