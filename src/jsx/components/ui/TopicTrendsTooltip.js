import React from 'react';

import { NO_DATA_AVAILABLE } from '../../constants/specialNames';

import util from '../../utils';

function deslugify(slug) {
  return slug;
}

export default (props) => {

  const { active } = props;

  if (active) {
    const { payload, label } = props;
    return (
      <div className="c-chart-trends-tooltip">
        <p className="c-chart-trends-tooltip__title u-txt--center">{label}</p>
        <div className="c-chart-trends-tooltip__content">
          {renderContent(payload, props.graphSymbol)}
        </div>
        <p className="c-chart-trends-tooltip__footer u-txt--center">{props.keyName.replace('_', ' ')}</p>
      </div>
    );
  }

  return null;

};

function getGroupValue(value, symbol) {
  return value === NO_DATA_AVAILABLE ? value : `${value.toFixed(1)}${symbol}`;
}

function renderContent(payload, symbol) {
  return payload.map((group, i) => {
    return (
      <div key={i}>
        {group.value &&
          <div>
            <i className="c-chart-trends-tooltip__color-box"
              style={{ backgroundColor: group.color }} />
            <span>{group.name}: </span>
            <strong>{getGroupValue(group.value, symbol)}</strong>
          </div>
        }
      </div>
    );
  });
}
