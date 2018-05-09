import React from 'react';
import classNames from 'classnames';

export default (props) => (

  <div className={classNames('c-form-input u-mb--small', props.className, { 'in-focus': props.inFocus })}>
    { props.label && <label htmlFor={props.id} className="c-form-input__label">{props.label}</label> }
    <div className="c-form-input__wrapper">
      <i className="fa fa-search"></i>
      <input
        id={props.id}
        type="search"
        className="c-form-input__element"
        onChange={(e) => props.onTextChange(e.target.value, props.id)}
        placeholder={props.placeholder}
        value={props.text}
        onFocus={() => props.onFocus(props.id)}
        onBlur={() => props.onBlur(props.id)}
        autoComplete="off"
      />
      {
        props.dropdown &&
        <i className={classNames('fa fa-caret-down', { 'u-hidden': props.text.length })}></i>
      }
      {
        props.text.length
        ? <button className="c-form-input__clear" onClick={() => props.clearSearch(props.id)}>
          <i className="fa fa-times-circle"></i><span className="u-visuallyhidden">Clear search</span>
        </button>
        : null
      }
    </div>
  </div>

);
