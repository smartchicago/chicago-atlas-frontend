import React from 'react';
import { browserHistory } from 'react-router';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

import { MAPBOX_TOKEN, MAPBOX_COMMUNITY_AREAS_STYLE } from '../../../constants/configs';
import { CHICAGO_CENTER } from '../../../constants/mapCoordinates';
import mUtils from '../../../utils/mapUtilities';

function _addMap(props) {
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

  mUtils.startMap(map, popup, props.places, props.area, props.topicSlug, props);
}

class InteractiveMap extends React.Component {

  componentDidMount() {
    _addMap(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.area.length || (this.props.area[0] && prevProps.area[0] && this.props.area[0].id !== prevProps.area[0].id)) {
      _addMap(this.props);
    }
  }

  renderLegends() {
    const {topicSlug, mapStops} = this.props;

    const stopItems = mapStops.map((stop, index) => {
      return (
        <li key={`${stop[0]}-${index}`}>
          <span
            className="interactive-map__legend-key"
            style={{backgroundColor: stop.color}}
          >
          </span>
          <span className="interactive-map__legend-label">
            {`${stop.start} - ${stop.end}`}
          </span>
        </li>
      );
    });
    return (
      <ul className="interactive-map__legend" id="legend">
        {stopItems}
      </ul>
    );
  }

  render() {
    return (
      <div className="interactive-map" id="map">
        {this.renderLegends()}
      </div>
    );
  }
}

export default InteractiveMap;
