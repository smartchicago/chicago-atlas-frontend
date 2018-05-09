import { LOCATION_CHANGE } from 'react-router-redux';

import actionTypes from '../constants/actionTypes';

const initialState = {
  value: {},
  inFocus: null
};

function uiSearch(state = initialState, action) {

  if (!action) {
    return state;
  }

  let value;

  switch (action.type) {
    case actionTypes.SEARCH_VALUE_UPDATED:
      value = Object.assign({}, state.value, { [action.id]: action.value });
      return Object.assign({}, state, { value: value });
    case actionTypes.SEARCH_FOCUS_TOGGLED:
      return Object.assign({}, state, { inFocus: state.inFocus === action.id ? null : action.id });
    case actionTypes.SEARCH_VALUE_CLEARED:
      value = Object.assign({}, state.value, { [action.id]: '' });
      return Object.assign({}, state, { value: value });
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
}

export default uiSearch;
