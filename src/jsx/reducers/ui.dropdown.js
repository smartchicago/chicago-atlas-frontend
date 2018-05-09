
import { LOCATION_CHANGE } from 'react-router-redux';

import actionTypes from '../constants/actionTypes';

import util from '../utils';

const initialState = {
  dropdownInFocus: null,
  expandedCategories: [],
  expandedSubCategories: []
};

function uiDropdown(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.TOGGLE_DROPDOWN_FOCUS:
      if (!action.isBlur) {
        return Object.assign({}, state, { dropdownInFocus: action.id });
      } else {
        return Object.assign({}, state, { dropdownInFocus: null });
      }

    case actionTypes.TOGGLE_DROPDOWN_CATEGORY:
      if (!action.isSub) {
        const categories = util.updateArray(state.expandedCategories, action.value);
        return Object.assign({}, state, { expandedCategories: categories });
      } else {
        const categories = util.updateArray(state.expandedSubCategories, action.value);
        return Object.assign({}, state, { expandedSubCategories: categories });
      }

    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
}

export default uiDropdown;
