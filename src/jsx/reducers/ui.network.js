import { LOCATION_CHANGE } from 'react-router-redux';

import actionTypes from '../constants/actionTypes';

const initialState = {
  allTopicsLoading: false,
  allTopicsError: false,
  allPlacesLoading: false,
  allPlacesError: false,
  allResourcesLoading: false,
  allResourcesError: false,
  allHospitalsLoading: false,
  allHospitalsError: false,
  hospitalDetailsLoading: false,
  hospitalDetailsError: false
};

function uiNetwork(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.ALL_TOPICS_LOADING:
      return Object.assign({}, state, { allTopicsLoading: true, allTopicsError: false });
    case actionTypes.ALL_TOPICS_ERROR:
      return Object.assign({}, state, { allTopicsLoading: false, allTopicsError: true });
    case actionTypes.ALL_TOPICS_SUCCESS:
      return Object.assign({}, state, { allTopicsLoading: false, allTopicsError: false });
    case actionTypes.ALL_PLACES_LOADING:
      return Object.assign({}, state, { allPlacesLoading: true, allPlacesError: false });
    case actionTypes.ALL_PLACES_ERROR:
      return Object.assign({}, state, { allPlacesLoading: false, allPlacesError: true });
    case actionTypes.ALL_PLACES_SUCCESS:
      return Object.assign({}, state, { allPlacesLoading: false, allPlacesError: false });
    case actionTypes.RESOURCES_LIST_LOADING:
      return Object.assign({}, state, { allResourcesLoading: true, allResourcesError: false });
    case actionTypes.RESOURCES_LIST_ERROR:
      return Object.assign({}, state, { allResourcesLoading: false, allResourcesError: true });
    case actionTypes.RESOURCES_LIST_SUCCESS:
      return Object.assign({}, state, { allResourcesLoading: false, allResourcesError: false });
    case actionTypes.HOSPITALS_LIST_LOADING:
      return Object.assign({}, state, { allHospitalsLoading: true, allHospitalsError: false });
    case actionTypes.HOSPITALS_LIST_ERROR:
      return Object.assign({}, state, { allHospitalsLoading: false, allHospitalsError: true });
    case actionTypes.HOSPITALS_LIST_SUCCESS:
      return Object.assign({}, state, { allHospitalsLoading: false, allHospitalsError: false });
    case actionTypes.HOSPITAL_DETAILS_LOADING:
      return Object.assign({}, state, { hospitalDetailsLoading: true, hospitalDetailsError: false });
    case actionTypes.HOSPITAL_DETAILS_ERROR:
      return Object.assign({}, state, { hospitalDetailsLoading: false, hospitalDetailsError: true });
    case actionTypes.HOSPITAL_DETAILS_SUCCESS:
      return Object.assign({}, state, { hospitalDetailsLoading: false, hospitalDetailsError: false });
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
}

export default uiNetwork;
