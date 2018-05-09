import { LOCATION_CHANGE } from 'react-router-redux';

import actionTypes from '../constants/actionTypes';

const initialState = {
  openPanels: [],
  data: {}
};

function viewHospitalDetails(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.HOSPITAL_DETAILS_SUCCESS:
      return Object.assign({}, state, { data: action.payload });
    case actionTypes.HOSPITAL_PANEL_TOGGLED:
      let panels;
      if (state.openPanels.includes(action.id)) {
        panels = state.openPanels.filter(id => id !== action.id);
      } else {
        panels = [action.id].concat(state.openPanels);
      }
      return Object.assign({}, state, { openPanels: panels });
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }

}

export default viewHospitalDetails;
