
import isEmpty from 'lodash/isEmpty';

import { API } from '../constants/configs'; // has slash at the end

import actionTypes from '../constants/actionTypes';

function fetchData(url, cache) {
  return new Promise((resolve, reject) => {
    if (!isEmpty(cache)) {
      resolve(cache);
    } else {
      fetch(url)
        .then(resp => resp.json())
        .then(payload => resolve(payload))
        .catch(err => {
          reject(err);
        });
    }
  });
}

export function allPlaces(placesList) {
  return {
    type: actionTypes.ALL_PLACES,
    payload: fetchData(`${API}places`, placesList)
  };
}

export function allTopics(topicsList) {

  return {
    type: actionTypes.ALL_TOPICS,
    payload: fetchData(`${API}topics`, topicsList)
  };
}

export function partners(cache) {
  return {
    type: actionTypes.PARTNERS_DATA,
    payload: fetchData('/data/about.json', cache)
  };
}

export function areaDetails(name) {

  return {
    type: actionTypes.AREA_DETAILS,
    payload: fetchData(`${API}place/${name}`)
  };

}

export function areaDemography(name) {

  return {
    type: actionTypes.AREA_DEMOGRAPHY,
    payload: fetchData(`${API}place/demography/${name}`)
  };

}

export function areaTableData(categorySlug, areaSlug) {

  return {
    type: actionTypes.AREA_TABLE_DETAILS,
    payload: fetchData(`${API}${areaSlug}/${categorySlug}/community_area_detail`)
  };

}

export function areaRace(areaSlug) {
  return {
    type: actionTypes.AREA_RACE,
    payload: fetchData(`${API}race/${areaSlug}`, null, true)
  };
}

export function areaEconomicHardship() {
  return {
    type: actionTypes.AREA_ECONOMIC_HARDSHIP,
    payload: fetchData(`${API}area_indices/economic-hardship`)
  };
}

export function areaCOI() {
  return {
    type: actionTypes.AREA_COI,
    payload: fetchData(`${API}area_indices/child-opportunity-index`)
  };
}

export function hospitalDetails(name) {
  return {
    type: actionTypes.HOSPITAL_DETAILS,
    payload: fetchData(`${API}hospital/${name}`)
  };

}

export function allHospitals(hospitalsList) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.MAP_ZOOMED,
      payload: { mapSize: [], updateMap: true }
    });
    dispatch({
      type: actionTypes.HOSPITALS_LIST,
      payload: fetchData(`${API}hospitals`, hospitalsList)
    });
  };
}

export function areaHospitals(value) {
  return {
    type: actionTypes.HOSPITALS_FOR_AREA,
    payload: fetchData(`${API}${value}/hospitals`)
  };
}

export function allResources(resourcesList) {
  return {
    type: actionTypes.RESOURCES_LIST,
    payload: fetchData(`${API}resources_all`, resourcesList)
  };
}

// @TODO: refactor to move this logic outside action creators
export function areaResources(value, id, places) {

  let requestURL = `${API}resources/${value}`;

  if (id === 'zip-search') {
    const zipCodeGeometry = JSON.parse(places.zip_codes.find(x => x.slug === value).geometry);
    const bbox = turf.extent(zipCodeGeometry);
    for (var i in bbox) {
      bbox[i] = bbox[i].toString().replace('.', ',');
    }
    requestURL = `${API}resources/${bbox[3]}/${bbox[2]}/${bbox[1]}/${bbox[0]}`;
  }

  return (dispatch) => {
    return fetch(requestURL)
    .then(resp => resp.json())
    .then(payload => {
      dispatch(loadResourcesForArea(payload));
    })
    .catch(err => console.error(err));
  };

}

function loadResourcesForArea(payload) {
  return {
    type: actionTypes.RESOURCES_FOR_AREA,
    payload: payload
  };
}

export function tableData(cache) {
  return {
    type: actionTypes.TABLE_DATA,
    payload: fetchData(`${API}topic_sources/`, cache, true)
  };
}

export function topicCityData(slug, year) {
  return {
    type: actionTypes.TOPIC_CITY_DETAIL,
    payload: fetchData(`${API}topic_city/${year}/${slug}`)
  };
}

export function topicAreaData(slug, year) {
  return {
    type: actionTypes.TOPIC_AREA_DETAIL,
    payload: fetchData(`${API}topic_area/${year}/${slug}`)
  };
}

export function topicDemoData(indicator, demo) {
  return {
    type: actionTypes.TOPIC_DEMO,
    payload: fetchData(`${API}topic_demo/${indicator}/${demo}`)
  };
}

export function topicDetails(id) {
  return {
    type: actionTypes.TOPIC_DETAILS,
    payload: fetchData(`${API}topic_detail/${id}`)
  };
}

export function measures(cache) {
  return {
    type: actionTypes.MEASURE,
    payload: fetchData('/data/mocks/measure.json', cache, true)
  };
}
