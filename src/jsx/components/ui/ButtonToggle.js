import React from 'react';
import classNames from 'classnames';

export default (props) => (

  <div className={classNames('c-form-toggle', props.className)}>
    <label className={classNames('c-form-toggle__label', { active: props.selected === 0 })}>
      <input
        type="radio"
        checked={props.selected === 0}
        onChange={e => props.toggle(0)}
        className="c-form-toggle__input"
      />
      {props.labelLeft}
    </label>
    <label className={classNames('c-form-toggle__label', { active: props.selected === 1 })}>
      <input
        type="radio"
        checked={props.selected === 1}
        onChange={e => props.toggle(1)}
        className="c-form-toggle__input"
      />
      {props.labelRight}
    </label>
  </div>

);
