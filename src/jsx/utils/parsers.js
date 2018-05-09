
import util from './index';

function flatten(arr) {
  return [].concat.apply([], arr);
}

function getFirstYear(year) {
  return year.toString().split('-')[0];
}

function getYearsFormatted(filteredData) {
  const allYears = filteredData.map(d => d.year);
  const uniqueArr = util.unique(allYears, v => v);
  return uniqueArr.sort((a, b) => getFirstYear(b) - getFirstYear(a));
}

function getYears(data) {
  const filteredData = data.filter(
    d => !d.for_map
  );
  return getYearsFormatted(filteredData);
}

function getYearsForMap(data) {
  const filteredData = data.filter(
    d => d.for_map
  );
  return getYearsFormatted(filteredData);
}

function getYearsForSummary(data) {
  return getYearsFormatted(data);
}

function topicDetails(payload) {
  const data = payload.static_header[0];
  const tempObj = {
    name: data.name,
    category: data.category,
    sub_category: data.sub_category,
    slug: data.slug,
    id: data.id,
    description: data.description,
    years: getYears(payload.data),
    yearsForMap: getYearsForMap(payload.data),
    yearsForSummary: getYearsForSummary(payload.data),
    demography: util.unique(payload.demo_list, d => d.slug),
    demography_order: data.demography_order,
    mapStops: data.map_value_colors
  };

  // removing economic-hardship by client request
  tempObj.demography = tempObj.demography.filter(function(obj) {
    return obj.slug !== 'economic-hardship';
  });

  return tempObj;
}

function getDataFromMock(data, slug, key) {
  if (!data) {
    return null;
  }
  const filtered = data.filter(d => d.slug.toLowerCase() === slug);
  if (filtered.length) {
    return filtered[0][key];
  } else {
    return null;
  }
}

function splitZipCodes(zipCodes) {
  const regExp = new RegExp([',|&']); // Regula exp to split by comma and &
  return zipCodes.replace(/ /g, '').split(regExp);
}

function planeIndicatorName(name) {
  return name.replace(/ |-/g, '').toLowerCase();
}

export default {
  topicDetails: topicDetails,
  getDataFromMock: getDataFromMock,
  planeIndicatorName: planeIndicatorName,
  splitZipCodes: splitZipCodes
};
