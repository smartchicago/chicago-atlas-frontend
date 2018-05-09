import React from 'react';
import classNames from 'classnames';

import util from '../../utils';

export default (props) => (
  <div className={classNames('c-levels-icon u-txt--center', props.className)}>
    <div className={classNames('c-levels-icon__graphic no-print', util.slugify(props.indicator), util.slugify(props.level))}>
      <i className={classNames('fa', props.icon)}></i>
    </div>
    <span className="u-txt--capitalize u-font--serif">{props.level}</span>
    <p>{props.label}</p>
  </div>
);
