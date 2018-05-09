
import { LOCATION_CHANGE } from 'react-router-redux';

import actionTypes from '../constants/actionTypes';

import parser from '../utils/parsers';

const initialState = {
  data: null,
  city: null, // table & bar chart
  area: [], // table & map
  demo: null, // line chart,
  selectedYear: null,
  selectedMapYear: null,
  selectedMapSlug: null,
  activeTable: 0,
  selectedDemography: null,
  error: false,
  loading: false
};

function viewTopicDetails(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.TOPIC_DETAILS_SUCCESS:
      const data = parser.topicDetails(action.payload);
      return Object.assign({}, state, {
        data: data,
        selectedYear: data.years[0],
        selectedMapYear: data.yearsForMap[0],
        selectedDemography: data.demography.length ? {
          value: data.demography[0].slug,
          label: data.demography[0].demography
        } : null
      });
    case actionTypes.TOPIC_CITY_DETAIL_SUCCESS:
      return Object.assign({}, state, { city: action.payload, loading: false });
    case actionTypes.TOPIC_AREA_DETAIL_SUCCESS:
      return Object.assign({}, state, { area: action.payload });
    case actionTypes.CHANGE_YEAR:
      return Object.assign({}, state, { selectedYear: action.year });
    case actionTypes.CHANGE_MAP_YEAR:
      return Object.assign({}, state, {
        selectedMapYear: action.year,
      });
    case actionTypes.CHANGE_MAP_SLUG:
      return Object.assign({}, state, {
        selectedMapSlug: action.slug,
      });
    case actionTypes.TOGGLE_TOPIC_TABLE:
      return Object.assign({}, state, { activeTable: action.id });
    case actionTypes.TOPIC_DEMO_SUCCESS:
      return Object.assign({}, state, { demo: action.payload });
    case actionTypes.TOGGLE_TOPIC_DEMO:
      return Object.assign({}, state, { selectedDemography: action.value });
    case actionTypes.TOPIC_DETAILS_ERROR:
      return Object.assign({}, state, { error: true });
    case LOCATION_CHANGE:
      return Object.assign({}, state, { error: false });
    case actionTypes.TOPIC_DETAILS_LOADING:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }

}

export default viewTopicDetails;
