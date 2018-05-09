
import actionTypes from '../constants/actionTypes';

import util from '../utils';

const initialState = {
  collapsed: [],
  datasetsExpanded: []
};

function uiTable(state = initialState, action) {

  if (!action) {
    return state;
  }

  let newArray;

  switch (action.type) {
    case actionTypes.TABLE_GROUP_TOGGLED:
      newArray = util.updateArray(state.collapsed, action.id);
      return Object.assign({}, state, { collapsed: newArray });
    case actionTypes.TABLE_DATASET_TOGGLED:
      newArray = util.updateArray(state.datasetsExpanded, action.id);
      return Object.assign({}, state, { datasetsExpanded: newArray });
    default:
      return state;
  }
}

export default uiTable;
