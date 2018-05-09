
import { LOCATION_CHANGE } from 'react-router-redux';

import actionTypes from '../constants/actionTypes';

const initialState = {
  dataLoading: true,
  demoLoading: true,
  data: {},
  demo: {},
  tables: {},
  race: [],
  economicHardship: [],
  coi: [], // child opportunity index
  error: false
};

function viewAreaDetails(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.AREA_DETAILS_SUCCESS:
      return Object.assign({}, state, { data: action.payload, dataLoading: false });
    case actionTypes.AREA_DEMOGRAPHY_SUCCESS:
      return Object.assign({}, state, { demo: action.payload, demoLoading: false });
    case actionTypes.AREA_TABLE_DETAILS_SUCCESS:
      const newState = Object.assign({}, state.tables, { [action.payload[0].slug]: action.payload });
      return Object.assign({}, state, { tables: newState });
    case actionTypes.AREA_RACE_SUCCESS:
      return Object.assign({}, state, { race: action.payload });
    case actionTypes.AREA_ECONOMIC_HARDSHIP_SUCCESS:
      return Object.assign({}, state, { economicHardship: action.payload });
    case actionTypes.AREA_COI_SUCCESS:
      return Object.assign({}, state, { coi: action.payload });
    case actionTypes.AREA_DETAILS_ERROR:
    case actionTypes.AREA_DEMOGRAPHY_ERROR:
      return Object.assign({}, state, { error: true });
    case actionTypes.AREA_DETAILS_LOADING:
    case actionTypes.AREA_DEMOGRAPHY_LOADING:
      return Object.assign({}, state, { dataLoading: true, demoLoading: true });
    case LOCATION_CHANGE:
      return Object.assign({}, state, { error: false });
    default:
      return state;
  }
}

export default viewAreaDetails;
