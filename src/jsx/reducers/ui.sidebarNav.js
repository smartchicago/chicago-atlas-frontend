
import { LOCATION_CHANGE } from 'react-router-redux';

import actionTypes from '../constants/actionTypes';

const initialState = {
  isOpen: false,
  openCategories: {}
};

import util from '../utils';

function uiSidebarNav(state = initialState, action) {

  if (!action) {
    return state;
  }

  let newState;

  switch (action.type) {
    case actionTypes.SIDEBAR_NAV_TOGGLE:
      return Object.assign({}, state, { isOpen: !state.isOpen });
    case actionTypes.SIDBAR_CATEGORY_TOGGLE:
      if (state.openCategories[action.key.toString()] === action.name) {
        newState = Object.assign({}, state.openCategories, { [action.key.toString()]: '' });
        return Object.assign({}, state, { openCategories: newState });
      } else {
        newState = Object.assign({}, state.openCategories, { [action.key.toString()]: action.name });
        return Object.assign({}, state, { openCategories: newState });
      }
    case actionTypes.SIDEBAR_INITIAL_CATEGORY:
      return Object.assign({}, state, { openCategories: action.openCategories });
    case LOCATION_CHANGE:
      if (action.payload.pathname.includes('community-areas/') ||
        action.payload.pathname.includes('topics/')) {
        return state;
      } else {
        return initialState;
      }
    default:
      return state;
  }
}

export default uiSidebarNav;
