
import categories from '../constants/resourceCategories';

import actionTypes from '../constants/actionTypes';

import util from '../utils';

const initialState = {
  categories: categories.map(cat => cat.slug),
  areaSelect: '',
  filteredResources: [],
  resourcesLoading: false,
  mapSize: [],
  updateMap: true,
  resourceClicked: {},
  suscribeToZoom: null,
  resourcesMap: null,
  hospitalsMap: null,
  resourcesPointToFocus: null
};

function viewResourcesList(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.RESOURCE_CATEGORY_TOGGLED:
      if (action.toggleAll) {
        return Object.assign({}, state, {
          categories: state.categories.length < initialState.categories.length ? initialState.categories : [],
          resourcesLoading: false,
          updateMap: true
        });
      } else {
        const categories = util.updateArray(state.categories, action.id);
        return Object.assign({}, state, {
          categories: categories,
          resourcesLoading: false,
          updateMap: true
        });
      }
    case actionTypes.RESOURCE_CLICKED:
      return Object.assign({}, state, {
        resourceClicked: {
          lat: action.values.lat,
          long: action.values.long
        }
      });
    case actionTypes.NEW_RESOURCES_MAP:
      return Object.assign({}, state, {
        resourcesMap: action.value
      });
    case actionTypes.SUSCRIBE_TO_ZOOM:
      return Object.assign({}, state, {
        suscribeToZoom: action.value
      });
    case actionTypes.NEW_HOSPITALS_MAP:
      return Object.assign({}, state, {
        hospitalsMap: action.value
      });
    case actionTypes.RESOURCE_CATEGORIES_UPDATED:
      return Object.assign({}, state, {
        categories: action.values,
        resourcesLoading: false,
        updateMap: true
      });
    case actionTypes.AREA_SELECTED:
      if (action.value.length) {
        return Object.assign({}, state, {
          areaSelect: { [action.id]: action.value },
          resourcesLoading: true,
          updateMap: true
        });
      } else {
        return Object.assign({}, state, { areaSelect: {} });
      }
    case actionTypes.RESOURCES_FOR_AREA:
      return Object.assign({}, state, {
        filteredResources: action.payload.resources,
        resourcesLoading: false,
        updateMap: true
      });
    case actionTypes.MAP_ZOOMED:
      return Object.assign({}, state, {
        mapSize: action.payload.mapSize,
        updateMap: action.payload.updateMap
      });
    case actionTypes.RESOURCES_POINT_CLICKED:
      return Object.assign({}, state, {
        resourcesPointToFocus: action.value
      });
    case actionTypes.HOSPITALS_POINT_CLICKED:
      return Object.assign({}, state, {
        hospitalsPointToFocus: action.value
      });
    default:
      return state;
  }

}

export default viewResourcesList;
