
import hospitals from '../constants/hospitalCategories';

import actionTypes from '../constants/actionTypes';

import util from '../utils';

const initialState = {
  categories: hospitals.map(cat => cat.slug),
  areaSelect: '',
  filteredHospitals: []
};

function viewHospitalsList(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.TOGGLE_HOSPITAL_CATEGORY:
      if (action.toggleAll) {
        return Object.assign({}, state, {
          categories: state.categories.length < initialState.categories.length ? initialState.categories : []
        });
      } else {
        const categories = util.updateArray(state.categories, action.id);
        return Object.assign({}, state, { categories: categories });
      }
    case actionTypes.HOSPITAL_CATEGORIES_UPDATED:
      return Object.assign({}, state, { categories: action.values });
    case actionTypes.HOSPITALS_AREA_SELECTED:
      if (action.value.length) {
        return Object.assign({}, state, { areaSelect: { [action.id]: action.value } });
      } else {
        return Object.assign({}, state, { areaSelect: {} });
      }
    case actionTypes.HOSPITALS_FOR_AREA_SUCCESS:
      return Object.assign({}, state, { filteredHospitals: action.payload });
    default:
      return state;
  }

}

export default viewHospitalsList;
