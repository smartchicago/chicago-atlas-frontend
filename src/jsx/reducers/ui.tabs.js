
import actionTypes from '../constants/actionTypes';

const initialState = {
  active: 0
};

function Tabs(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.TOPIC_TAB_TOGGLED:
      return Object.assign({}, state, { active: action.index });
    default:
      return state;
  }
}

export default Tabs;
