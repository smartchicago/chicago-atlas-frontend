
import actionTypes from '../constants/actionTypes';

export function toggleDropdownCategory(value, isSub) {
  return {
    type: actionTypes.TOGGLE_DROPDOWN_CATEGORY,
    value: value,
    isSub: isSub
  };
}

export function toggleDropdownFocus(id, isBlur) {
  return {
    type: actionTypes.TOGGLE_DROPDOWN_FOCUS,
    id: id,
    isBlur: isBlur
  };
}

export function closeMenu() {
  return {
    type: actionTypes.HEADER_MOBILE_CLOSE
  };
}

export function toggleMenu() {
  return {
    type: actionTypes.HEADER_MOBILE_TOGGLED
  };
}

export function updateSearchValue(text, id) {
  return {
    type: actionTypes.SEARCH_VALUE_UPDATED,
    value: text,
    id: id
  };
}

export function toggleSearchFocus(id) {
  return {
    type: actionTypes.SEARCH_FOCUS_TOGGLED,
    id: id
  };
}

export function clearSearchValue(id) {
  return {
    type: actionTypes.SEARCH_VALUE_CLEARED,
    id: id
  };
}

export function toggleSidebarNav() {
  return {
    type: actionTypes.SIDEBAR_NAV_TOGGLE
  };
}

export function toggleSidebarCategory(name, key) {
  return {
    type: actionTypes.SIDBAR_CATEGORY_TOGGLE,
    name: name,
    key: key
  };
}

export function initialSidebarPosition(openCategories) {
  return {
    type: actionTypes.SIDEBAR_INITIAL_CATEGORY,
    openCategories: openCategories
  };
}

export function toggleTableGroup(id) {
  return {
    type: actionTypes.TABLE_GROUP_TOGGLED,
    id: id
  };
}

export function expandDataset(id) {
  return {
    type: actionTypes.TABLE_DATASET_TOGGLED,
    id: id
  };
}

export function toggleTab(index) {
  return {
    type: actionTypes.TOPIC_TAB_TOGGLED,
    index: index
  };
}

export function toggleNavListGroup(id) {
  return {
    type: actionTypes.NAVIGATION_LIST_GROUP_TOGGLED,
    id: id
  };
}

export function togglePanel(id) {
  return {
    type: actionTypes.HOSPITAL_PANEL_TOGGLED,
    id: id
  };
}

export function toggleHospitalCategory(id, toggleAll) {
  return {
    type: actionTypes.TOGGLE_HOSPITAL_CATEGORY,
    id: id,
    toggleAll: toggleAll
  };
}

export function updateSelectHospitalsCats(values) {
  return {
    type: actionTypes.HOSPITAL_CATEGORIES_UPDATED,
    values: values
  };
};

export function updateHospitalsAreaSelect(value, id) {
  return {
    type: actionTypes.HOSPITALS_AREA_SELECTED,
    value: value,
    id: id
  };
}

export function hospitalClicked(lat, long) {
  return (dispatch, getState) => {
    if (long && lat) {
      getState().viewResourcesList.hospitalsMap.flyTo({
        center: [
          long,
          lat
        ],
        zoom: 18
      });
    }
  };
}

export function changeYear(year) {
  return {
    type: actionTypes.CHANGE_YEAR,
    year: year
  };
}

export function changeMapYear(year) {
  return {
    type: actionTypes.CHANGE_MAP_YEAR,
    year
  };
}

export function changeMapSlug(slug) {
  return {
    type: actionTypes.CHANGE_MAP_SLUG,
    slug
  };
}

export function toggleTable(id) {
  return {
    type: actionTypes.TOGGLE_TOPIC_TABLE,
    id: id
  };
}

export function toggleDemo(value) {
  return {
    type: actionTypes.TOGGLE_TOPIC_DEMO,
    value: value
  };
}

export function resourceClicked(lat, long) {
  return (dispatch, getState) => {
    if (long && lat) {
      const map = getState().viewResourcesList.resourcesMap;

      map.flyTo({
        center: [
          long,
          lat
        ],
        zoom: 18
      });
    }
  };
}

export function newHospitalsMap(map) {
  return {
    type: actionTypes.NEW_HOSPITALS_MAP,
    value: map
  };
}

export function newResourcesMap(map) {
  return {
    type: actionTypes.NEW_RESOURCES_MAP,
    value: map
  };
}

export function updateSelectedResourceCats(values) {
  return {
    type: actionTypes.RESOURCE_CATEGORIES_UPDATED,
    values: values
  };
}

export function updateZoneOnMapZoom(newCoords) {
  return {
    type: actionTypes.MAP_ZOOMED,
    payload: { mapSize: newCoords, updateMap: false }
  };
}

export function resourcesPointClicked(itemId) {
  return {
    type: actionTypes.RESOURCES_POINT_CLICKED,
    value: itemId
  };
}

export function hospitalsPointClicked(itemId) {
  return {
    type: actionTypes.HOSPITALS_POINT_CLICKED,
    value: itemId
  };
}

export function toggleResourcesCategory(id, toggleAll) {
  return {
    type: actionTypes.RESOURCE_CATEGORY_TOGGLED,
    id: id,
    toggleAll: toggleAll
  };
}

export function updateResourcesAreaSelect(value, id) {
  return {
    type: actionTypes.AREA_SELECTED,
    value: value,
    id: id
  };
}
