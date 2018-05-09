import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';

import parser from '../../../utils/parsers';

import {
  COMMUNITY_AREAS_UNDERSCORE,
  ZIP_CODES_UNDERSCORE
} from '../../../constants/specialNames';

export default (props) => (
  <div>
    <p className="u-fw--bold txt-color-gray">Community Area</p>
    {
      props.places &&
      <div className="select-filter">
        <div className="select-filter__element">
          <Select
            name="res-area-search"
            options={mapOptions(props.places[COMMUNITY_AREAS_UNDERSCORE])}
            onChange={(v) => props.handleSelect(v, 'area-search', props.places)}
            value={props.areaSelect['area-search'] || null}
            placeholder="area"
            clearable={false}
          />
        </div>
        <div className="select-filter__element">
          <Select
            className="Select--inset"
            name="res-area-search"
            options={mapZipCodes(props.places[ZIP_CODES_UNDERSCORE])}
            onChange={(v) => props.handleSelect(v, 'zip-search', props.places)}
            value={props.areaSelect['zip-search'] || null}
            placeholder="zip code"
            clearable={false}
          />
        </div>
      </div>
    }
  </div>

);

function mapOptions(places) {
  if (!places) {
    return [];
  }
  return places.map(v => {
    return {
      label: v.name,
      value: v.slug
    };
  });
};

function mapZipCodes(places) {
  if (!places) {
    return [];
  }
  const zipCodes = [];
  places.map(v => {
    const names = parser.splitZipCodes(v.name);
    names.map((name) => {
      zipCodes.push({
        label: name,
        value: `${name}-${v.slug}`
      });
    });
  });
  return zipCodes;
}
