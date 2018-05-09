import React from 'react';
import classNames from 'classnames';

export default (props) => (
  <div className="c-gender-chart u-txt--center">
    <div className="c-gender-chart__wrapper no-print" data-name="Gender">
      <svg viewBox="0 0 32 32" className="c-gender-chart__svg">
        <circle
          r="16" cx="16" cy="16" className="c-gender-chart__pie"
          style={{ strokeDasharray: `${props.male} 100` }}
        />
      </svg>
    </div>
    <p className="print-only">Female | Male</p>
    <p className="c-gender-chart__info">
      <i className="fa fa-female"></i>
      <span>{`${props.female}% | ${props.male}%`}</span>
      <i className="fa fa-male"></i>
    </p>
  </div>
);
