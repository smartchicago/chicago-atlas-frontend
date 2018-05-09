import React from 'react';
import classNames from 'classnames';

export default (props) => (

  <div className={
      classNames(props.className, 'c-loader', {
        'is-loading': props.loading,
        'has-overlay': props.hasOverlay && props.loading
      })
    }
    style={{ 'minHeight': props.minHeight }}
  >
    <span className="c-loader__icon" style={{ fontSize: props.iconSize }}>
      <i className="fa fa-spin fa-spinner"></i>
    </span> { props.children }
  </div>

);
