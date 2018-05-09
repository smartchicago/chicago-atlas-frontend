import React from 'react';

export default (props) => (

  <div className="details-heading grid grid--from-medium">
    <div className="grid__col grid__col--8">
      <h2 className="t-subtitle">{props.title}</h2>
    </div>
    <div className="grid__col grid__col--4 u-clearfix">
      {props.children}
    </div>
  </div>

);
