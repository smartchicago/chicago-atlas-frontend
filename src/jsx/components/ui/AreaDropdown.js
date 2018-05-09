import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import isEmpty from 'lodash/isEmpty';
import util from '../../utils';

import { ZIP_CODES_NAME } from '../../constants/specialNames';
import parser from '../../utils/parsers';

export default (props) => (
  <div className={classNames('c-form-dropdown custom-scrollbar', { 'is-visible': props.inFocus })}>
    {
      !isEmpty(props.data)
      ? loadPlaces(props)
      : <div className="c-form-dropdown__category c-form-dropdown__item u-txt--capitalize">No areas available</div>
    }
  </div>
);

function loadPlaces(props) {
  const filteredData = util.filterAreasList(util.mapAreas(props.data), props.filter);
  if (!filteredData.length) {
    return <div className="c-form-dropdown__category c-form-dropdown__item u-txt--capitalize">No results</div>;
  }
  return filteredData.map((place, i) => {
    const isExpanded = props.expandedCategories.includes(place.name) || !props.searchInputEmpty;
    return <ul key={i}>
      <li
        className={classNames('c-form-dropdown__category c-form-dropdown__item', { 'is-expanded': isExpanded })}
        onClick={() => props.toggleCategory(place.name)}
        tabIndex="0"
        onFocus={() => props.onFocus(props.id)}
        onBlur={() => props.onBlur(props.id)}
      >
        <i className={classNames('fa', { 'fa-minus': isExpanded }, { 'fa-plus': !isExpanded })}></i>
        <span>{ place.name }</span>
      </li>
      <li>
        <ul>{ place.name === ZIP_CODES_NAME ? loadZipCodeAreas(place.areas, props.filter) : loadAreas(place.areas) }</ul>
      </li>
    </ul>;
  });
}

function loadAreas(areas) {
  return areas.map((a, i) => {
    const parentSlug = a.geo_type === 'Zip' ? '/zip-codes/' : '/community-areas/';
    return (
      <li key={i}>
        <Link className="c-form-dropdown__link c-form-dropdown__item" to={`${parentSlug}${a.slug}`}>{a.name}</Link>
      </li>
    );
  });
}

function loadZipCodeAreas(areas, filter) {
  return areas.map((a, i) => {
    const parentSlug = a.geo_type === 'Zip' ? '/zip-codes/' : '/community-areas/';
    const names = parser.splitZipCodes(a.name);
    const rows = names.map((name, j) => {
      return util.stringContains(name, filter) && <li key={name}>
        <Link className="c-form-dropdown__link c-form-dropdown__item" to={`${parentSlug}${a.slug}`}>{name}</Link>
      </li>;
    });
    return rows;
  });
}
