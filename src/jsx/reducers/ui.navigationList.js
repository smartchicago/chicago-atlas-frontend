
import actionTypes from '../constants/actionTypes';

const initialState = {
  collapsed: []
};

function uiTopics(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.NAVIGATION_LIST_GROUP_TOGGLED:

      var index = state.collapsed.indexOf(action.id);

      if (index > -1) {
        var newData = state.collapsed.slice();
        newData.splice(index, 1);
        return { collapsed: newData };
      } else {
        return {
          collapsed: state.collapsed.concat(action.id)
        };
      }

    default:
      return state;
  }

}

export default uiTopics;
