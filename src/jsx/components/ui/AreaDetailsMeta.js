import React from 'react';

import SaveWidget from './SaveWidget';

export default (props) => (

  <div className="c-area-meta__info">

    <header className="details-heading grid grid--from-medium">

      <div className="grid__col grid__col--8">
        <h1 className="t-main-title">{props.data.geography.name}</h1>
      </div>

      <div className="grid__col grid__col--4 u-clearfix u-txt--center">
        <SaveWidget
          className="c-icon-links--floated"
          section={'area-details'}
          api={'https://chicagohealth.herokuapp.com/apidoc'}
        />
      </div>

    </header>

    <div className="c-area-meta__links">
      {
        props.data.geography.geo_type === 'Zip'
        ? <p>Corresponding zip codes include:</p>
        : <p>Corresponding community areas include:</p>
      }
      {renderAdjecentAreas(props.data)}
    </div>

    <div className="c-area-meta__buttons no-print">
      <button onClick={() => props.goToResources()}>
        Area Resources
      </button>
      <button onClick={() => props.goToHospitals()}>
        Area Hospitals
      </button>
      <button onClick={() => props.goToAbout()}>
        Learn more about Zip Codes
      </button>
    </div>

  </div>

);

function renderAdjecentAreas(data) {
  let areas = [];
  if (data.geography.geo_type === 'Zip') {
    areas = data.adjacent_community_areas;
  } else {
    areas = data.adjacent_zips;
  }

  return areas.map((area, i) => {
    return (
      <a className="c-pill-link" key={i} href={area.slug}>{area.name}</a>
    );
  });

}
