import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

import parser from '../../utils/parsers';

function mapData(places) {

  var mapped = [];
  var grouped = groupBy(places, 'part');

  forEach(grouped, (areas, key) => {
    mapped.push({
      name: key,
      areas: areas
    });
  });

  return mapped;

}

function _renderZipCodes(zipCodes) {
  return zipCodes.map((item, i) => {
    const names = parser.splitZipCodes(item.name);
    const rows = names.map((name) => {
      return <li key={name}>
        <Link className="c-simple-list__link" to={`zip-codes/${item.slug}`}>{name}</Link>
      </li>;
    });
    return rows;
  });
}

function _renderList(props) {
  if (props.type === 'CommunityAreas') {
    return (
      <ul className="c-simple-list">
        {mapData(props.places.community_areas).map((item, i) =>
          <li key={i}>
            <ul>
              <li className="c-simple-list__heading">
                <h4 className="c-simple-list__title u-font--serif">{item.name}</h4>
              </li>
              { item.areas && item.areas.map((item, i) =>
                <li key={i}>
                  <Link className="c-simple-list__link" to={`community-areas/${item.slug}`}>{item.name}</Link>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    );
  } else if (props.type === 'ZipCodes') {
    return (
      <ul className="c-simple-list">
        { props.places.zip_codes && _renderZipCodes(props.places.zip_codes) }
      </ul>
    );
  }
}

export default (props) => (
  <div>{_renderList(props)}</div>
);
