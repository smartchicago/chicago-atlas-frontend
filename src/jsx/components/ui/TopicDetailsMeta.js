import React from 'react';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import SaveWidget from './SaveWidget';

export default (props) => (

  <div>
    <header className="details-heading c-area__header grid grid--from-medium">
      <div className="grid__col grid__col--9">
        <h1 className="t-main-title">
          {props.topic.data ? props.topic.data.name : null}
        </h1>
        {
          !isEmpty(props.indicatorData) &&
          <span className="c-label">
            <i className="fa fa-certificate txt-color-coral-red" aria-hidden="true"></i>
            Healthy Chicago 2.0 indicator
          </span>
        }
        {props.topic.data && props.topic.data.description &&
          <span className="u-txt--uppercase t-minor-title u-block v-topic__description">{props.topic.data.description}</span>
        }
      </div>
      <div className="grid__col grid__col--3 u-clearfix">
        <SaveWidget
          className="c-icon-links--floated"
          section={'topic-details'}
          download={props.city && props.city.length ? props.city[0].uploader_path.url : null}
          api={'https://chicagohealth.herokuapp.com/apidoc'}
        />
      </div>
    </header>
    {
      !isEmpty(props.indicatorData) && !isEmpty(props.indicatorData.target) &&
      <div className="c-indicator-meta u-mb--small">
        <Link to={'/healthy-chicago'} className="c-indicator-meta__img">
          <img src="/images/hc2-logo-crop.png" alt="Healthy Chicago 2.0" />
        </Link>
      </div>
    }
  </div>
);
