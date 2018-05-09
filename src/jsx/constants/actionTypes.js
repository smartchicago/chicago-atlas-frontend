import keyMirror from 'keymirror';

const actionTypes = keyMirror({

  // UI ACTIONS

  // dropdown ui
  'TOGGLE_DROPDOWN_CATEGORY': null,
  'TOGGLE_DROPDOWN_FOCUS': null,

  // header ui
  'HEADER_MOBILE_TOGGLED': null,
  'HEADER_MOBILE_CLOSE': null,

  // search ui
  'SEARCH_VALUE_UPDATED': null,
  'SEARCH_FOCUS_TOGGLED': null,
  'SEARCH_VALUE_CLEARED': null,

  // sidebar ui
  'SIDEBAR_NAV_TOGGLE': null,
  'SIDBAR_CATEGORY_TOGGLE': null,
  'SIDEBAR_INITIAL_CATEGORY': null,
  'SUSCRIBE_TO_ZOOM': null,
  'RESOURCES_POINT_CLICKED': null,
  'HOSPITALS_POINT_CLICKED': null,

  // table ui
  'TABLE_GROUP_TOGGLED': null,
  'TABLE_DATASET_TOGGLED': null,

  // tabs ui
  'TOPIC_TAB_TOGGLED': null,

  // nav list ui
  'NAVIGATION_LIST_GROUP_TOGGLED': null,

  // hospital details ui
  'HOSPITAL_PANEL_TOGGLED': null,

  // topic details ui
  'CHANGE_YEAR': null,
  'CHANGE_MAP_YEAR': null,
  'CHANGE_MAP_SLUG': null,
  'TOGGLE_TOPIC_TABLE': null,
  'TOGGLE_TOPIC_DEMO': null,

  // hospitals list ui
  'TOGGLE_HOSPITAL_CATEGORY': null,
  'HOSPITAL_CATEGORIES_UPDATED': null,
  'HOSPITALS_AREA_SELECTED': null,

  // resources list ui
  'RESOURCE_CATEGORY_TOGGLED': null,
  'RESOURCE_CATEGORIES_UPDATED': null,
  'RESOURCE_CLICKED': null,
  'NEW_RESOURCES_MAP': null,
  'NEW_HOSPITALS_MAP': null,
  'AREA_SELECTED': null,

  // NETWORK ACTION

  'ALL_TOPICS': null,
  'ALL_TOPICS_LOADING': null,
  'ALL_TOPICS_SUCCESS': null,
  'ALL_TOPICS_ERROR': null,

  'ALL_PLACES': null,
  'ALL_PLACES_LOADING': null,
  'ALL_PLACES_SUCCESS': null,
  'ALL_PLACES_ERROR': null,

  'RESOURCES_LIST': null,
  'RESOURCES_LIST_LOADING': null,
  'RESOURCES_LIST_SUCCESS': null,
  'RESOURCES_LIST_ERROR': null,

  'HOSPITALS_LIST': null,
  'HOSPITALS_LIST_LOADING': null,
  'HOSPITALS_LIST_SUCCESS': null,
  'HOSPITALS_LIST_ERROR': null,

  'HOSPITAL_DETAILS': null,
  'HOSPITAL_DETAILS_LOADING': null,
  'HOSPITAL_DETAILS_SUCCESS': null,
  'HOSPITAL_DETAILS_ERROR': null,

  // indicators table
  'TABLE_DATA': null,
  'TABLE_DATA_LOADING': null,
  'TABLE_DATA_SUCCESS': null,
  'TABLE_DATA_ERROR': null,

  // about us
  'PARTNERS_DATA': null,
  'PARTNERS_DATA_SUCCESS': null,
  'PARTNERS_DATA_LOADING': null,
  'PARTNERS_DATA_ERROR': null,

  // topic details measure info
  'MEASURE': null,
  'MEASURE_LOADING': null,
  'MEASURE_SUCCESS': null,
  'MEASURE_ERROR': null,

  'AREA_DETAILS': null,
  'AREA_DETAILS_LOADING': null,
  'AREA_DETAILS_SUCCESS': null,
  'AREA_DETAILS_ERROR': null,

  'AREA_DEMOGRAPHY': null,
  'AREA_DEMOGRAPHY_LOADING': null,
  'AREA_DEMOGRAPHY_SUCCESS': null,
  'AREA_DEMOGRAPHY_ERROR': null,

  'AREA_TABLE_DETAILS': null,
  'AREA_TABLE_DETAILS_LOADING': null,
  'AREA_TABLE_DETAILS_SUCCESS': null,
  'AREA_TABLE_DETAILS_ERROR': null,

  'AREA_RACE': null,
  'AREA_RACE_LOADING': null,
  'AREA_RACE_SUCCESS': null,
  'AREA_RACE_ERROR': null,

  'AREA_COI': null,
  'AREA_COI_LOADING': null,
  'AREA_COI_SUCCESS': null,
  'AREA_COI_ERROR': null,

  'AREA_ECONOMIC_HARDSHIP': null,
  'AREA_ECONOMIC_HARDSHIP_LOADING': null,
  'AREA_ECONOMIC_HARDSHIP_SUCCESS': null,
  'AREA_ECONOMIC_HARDSHIP_ERROR': null,

  'TOPIC_DETAILS': null,
  'TOPIC_DETAILS_LOADING': null,
  'TOPIC_DETAILS_SUCCESS': null,
  'TOPIC_DETAILS_ERROR': null,

  'TOPIC_CITY_DETAIL': null,
  'TOPIC_CITY_DETAIL_LOADING': null,
  'TOPIC_CITY_DETAIL_SUCCESS': null,
  'TOPIC_CITY_DETAIL_ERROR': null,

  'TOPIC_AREA_DETAIL': null,
  'TOPIC_AREA_DETAIL_LOADING': null,
  'TOPIC_AREA_DETAIL_SUCCESS': null,
  'TOPIC_AREA_DETAIL_ERROR': null,

  'TOPIC_DEMO': null,
  'TOPIC_DEMO_LOADING': null,
  'TOPIC_DEMO_SUCCESS': null,
  'TOPIC_DEMO_ERROR': null,

  'HOSPITALS_FOR_AREA': null,
  'HOSPITALS_FOR_AREA_LOADING': null,
  'HOSPITALS_FOR_AREA_SUCCESS': null,
  'HOSPITALS_FOR_AREA_ERROR': null,

  'RESOURCES_FOR_AREA': null,
  'MAP_ZOOMED': null,

});

export default actionTypes;
