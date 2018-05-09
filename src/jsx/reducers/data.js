
import actionTypes from '../constants/actionTypes';

const initialState = {
  topicsList: [],
  placesList: {},
  indicatorsTable: {},
  resourcesList: [],
  hospitalsList: [],
  measure: [],
  partners: []
};

function Data(state = initialState, action) {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case actionTypes.PARTNERS_DATA_SUCCESS:
      return Object.assign({}, state, { partners: action.payload });

    case actionTypes.TABLE_DATA_SUCCESS:
      return Object.assign({}, state, { indicatorsTable: action.payload });
    case actionTypes.ALL_TOPICS_SUCCESS:
      return Object.assign({}, state, { topicsList: action.payload });
    case actionTypes.ALL_PLACES_SUCCESS:
      return Object.assign({}, state, { placesList: action.payload });
    case actionTypes.RESOURCES_LIST_SUCCESS:
      return Object.assign({}, state, {
        resourcesList: Array.isArray(action.payload) ? action.payload : action.payload.resources
      });
    case actionTypes.HOSPITALS_LIST_SUCCESS:
      return Object.assign({}, state, { hospitalsList: action.payload });
    case actionTypes.MEASURE_SUCCESS:
      return Object.assign({}, state, { measure: action.payload });
    default:
      return state;
  }

}

export default Data;
