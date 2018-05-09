
import actionTypes from '../constants/actionTypes';

const initialState = {
  collapsed: true
};

function uiHeader(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.HEADER_MOBILE_CLOSE:
      return Object.assign({}, state, { collapsed: true });
    case actionTypes.HEADER_MOBILE_TOGGLED:
      return Object.assign({}, state, { collapsed: !state.collapsed });
    default:
      return state;
  }
}

export default uiHeader;
