import React from 'react';
import {
  MAPBOX_TOKEN,
  MAPBOX_COMMUNITY_AREA_DETAIL_STYLE,
  MAPBOX_ZIPCODE_DETAIL_STYLE
} from '../../../constants/configs';

import { CHICAGO_CENTER } from '../../../constants/mapCoordinates';

let mapStyle;

function _addMap(props) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  switch (props.data.geography.geo_type) {
    case 'Zip':
      mapStyle = MAPBOX_ZIPCODE_DETAIL_STYLE;
      break;
    case 'Community Area':
      mapStyle = MAPBOX_COMMUNITY_AREA_DETAIL_STYLE;
      break;
    default:
      mapStyle = MAPBOX_COMMUNITY_AREA_DETAIL_STYLE;
  }

  const map = new mapboxgl.Map({
    container: 'area-detail-map',
    style: mapStyle,
    center: CHICAGO_CENTER,
    zoom: 8
  });

  map.on('load', function() {

    map.addLayer({
      'id': 'maine',
      'type': 'fill',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': JSON.parse(props.data.geography.geometry)
        }
      },
      'layout': {},
      'paint': {
        'fill-color': '#FD4141',
        'fill-opacity': 1
      }
    });
  });

  map.dragRotate.disable();
  map.scrollZoom.disable();
  map.touchZoomRotate.disableRotation();
}

class InteractiveMap extends React.Component {

  componentDidMount() {
    _addMap(this.props);
  }

  render() {
    return (
      <div className="c-area-detail-map">
        <div id="area-detail-map" />
      </div>
    );
  }

}

export default InteractiveMap;
