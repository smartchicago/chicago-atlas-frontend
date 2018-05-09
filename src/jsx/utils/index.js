
import forEach from 'lodash/forEach';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import TopicsConfig from '../../data/topics-config.json';

function slugify(string) {
  if (!string) {
    return '';
  }
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function findConfigObjectGroup(configKey, group) {
  return configKey['trends-over-time-keys'].find((v) => {
    return v.keyName === group;
  });
}

function findConfigObject(topic, group) {
  const configKeyObject = TopicsConfig.find((v) => {
    return v.slug === topic;
  });
  const DefaultConfigKeyObject = group === 'map' || !configKeyObject ? {
    'value': 'weight_percent',
    'symbol': '%'
  } : {
    'keyName': group,
    'value': configKeyObject['trends-over-time-keys'][0].value,
    'symbol': configKeyObject['trends-over-time-keys'][0].symbol
  };
  return configKeyObject && findConfigObjectGroup(configKeyObject, group) ? findConfigObjectGroup(configKeyObject, group) : DefaultConfigKeyObject;
}

function updateArray(array, value) {
  let newArray = [];
  if (array.includes(value)) {
    newArray = array.filter(item => item !== value);
  } else {
    newArray = [value].concat(array);
  }
  return newArray;
}

function getYear(timestamp) {
  return new Date(timestamp).getFullYear();
}

function stringContains(value, queue) {
  return value && value.toLowerCase().includes(queue.toLowerCase().trim());
}

function filterTopicsList(topics, filter) {
  if (!topics || !topics.length) {
    return [];
  }
  return topics.reduce((acc, topic) => {
    if (stringContains(topic.name, filter)) {
      return acc.concat(Object.assign({}, topic));
    }
    const subCategories = topic.sub_categories.reduce((acc, cat) => {
      if (stringContains(cat.name, filter)) {
        return acc.concat(Object.assign({}, cat));
      }
      const indicators = cat.indicators.filter(ind => stringContains(ind.name, filter));
      return !indicators.length ? acc : acc.concat(Object.assign({}, cat, { indicators: indicators }));
    }, []);
    return !subCategories.length ? acc : acc.concat(Object.assign({}, topic, { sub_categories: subCategories }));
  }, []);
}

function filterAreasList(places, filter) {
  if (!places || !places.length) {
    return [];
  }
  return places.reduce((acc, place) => {
    if (stringContains(place.name, filter)) {
      return acc.concat(Object.assign({}, place));
    }
    const filteredAreas = (place.areas && place.areas.length) ? place.areas.filter(a => stringContains(a.name, filter)) : [];
    return !filteredAreas.length ? acc : acc.concat(Object.assign({}, place, { areas: filteredAreas }));
  }, []);
}

function mapAreas(places) {
  const mapped = [];
  const grouped = groupBy(places.community_areas, 'part');

  forEach(grouped, (areas, key) => {
    if (key === 'null') {
      return;
    }
    mapped.push({
      name: key,
      areas: areas
    });
  });

  mapped.push({
    name: 'zip codes',
    areas: places.zip_codes
  });

  return mapped;
}

function mapCurrentCategory(tree, context) {
  if (!tree.length) {
    return [];
  }
  const key = context === 'topic' ? 'sub_categories' : 'areas';
  const openCategories = {};
  openCategories['0'] = context;
  openCategories['1'] = slugify(tree[0].name);
  openCategories['2'] = slugify(tree[0][key][0].name);
  return openCategories;
}

function getHighestLowest(arr) {
  let lowest = Number.POSITIVE_INFINITY;
  let highest = Number.NEGATIVE_INFINITY;
  let tmp;

  for (var i = arr.length - 1; i >= 0; i--) {
    tmp = arr[i].value;
    if (tmp < lowest) lowest = tmp;
    if (tmp > highest) highest = tmp;
  }

  return [lowest, highest];
}

function unique(arr, f) {
  const vArr = arr.map(f);
  return arr.filter((_, i) => vArr.indexOf(vArr[i]) === i);
}

export default {
  slugify: slugify,
  updateArray: updateArray,
  getYear: getYear,
  filterTopicsList: filterTopicsList,
  mapAreas: mapAreas,
  filterAreasList: filterAreasList,
  mapCurrentCategory: mapCurrentCategory,
  getHighestLowest: getHighestLowest,
  unique: unique,
  findConfigObjectGroup: findConfigObjectGroup,
  findConfigObject: findConfigObject,
  stringContains: stringContains
};
