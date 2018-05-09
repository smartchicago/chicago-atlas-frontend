import React from 'react';
import { Link } from 'react-scroll';

import util from '../../utils';
import categories from '../../constants/hospitalCategories';
import HospitalDetailMap from '../ui/maps/HospitalDetailMap';

export default (props) => (

  <section className="v-hospital no-print">

    <header className="details-heading grid grid--from-medium">

      <div className="grid__col grid__col--8">
        <h1 className="t-main-title">{props.name}</h1>
      </div>

      <div className="grid__col grid__col--4 u-clearfix">
        <div className="u-float--left">
          {
            props.sub_type &&
            <span
              className="v-hospital__label c-label"
              style={{ borderColor: getColor(props.sub_type) }}>{props.sub_type}</span>
          }
        </div>
        { (props.facebook || props.twitter) &&
          <div className="u-float--right">
            <ul className="c-icon-links">
              {
                props.facebook &&
                <li>
                  <a href={props.facebook}>
                    <i className="fa fa-facebook-square" aria-hidden="true"></i>
                    <span className="u-visuallyhidden">Facebook</span>
                  </a>
                </li>
              }
              {
                props.twitter &&
                <li>
                  <a href={`https://twitter.com/${props.twitter}`}>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <span className="u-visuallyhidden">Twitter</span>
                  </a>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </header>

    <div className="layout--narrow">
      <div className="grid grid--gutters">

        <div className="grid__col grid__col--4 v-hospital__map u-relative">
          <HospitalDetailMap hospital={props.hospital} subType={props.sub_type} />
        </div>

        <div className="grid__col grid__col--7 v-hospital__data">

          <ul className="v-hospital__meta">
            {
              (props.addr_street && props.addr_city && props.addr_zip) &&
              <li>
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <span className="txt-color-rolling-stone">
                  {_buildAddress(props.addr_street, props.addr_city, props.addr_zip)}
                </span>
              </li>
            }
            {
              props.phone &&
              <li>
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span className="txt-color-rolling-stone">
                  {props.phone}
                </span>
              </li>
            }
            {
              props.url &&
              <li>
                <i className="fa fa-external-link" aria-hidden="true"></i>
                <a target="_blank" rel="noopener" href={props.url}>website</a>
              </li>
            }
            {
              (props.report_url && props.report_name) &&
              <li>
                <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                <a href={props.report_url}>{props.report_name}</a>
              </li>
            }
            {
              props.chna_url &&
              <li>
                <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                <a href={props.chna_url}>Community Health Needs Assessment</a>
              </li>
            }
          </ul>

          { props.description && <p className="u-font--serif">{props.description}</p> }

          <ul className="grid grid--gutters v-hospital__stats">
            {
              props.total_admissions &&
              <li className="grid__col grid__col--6">
                <p className="u-mb--none">Total Admissions in {_getYear(props.admissions.end_date)}</p>
                <div className="v-hospital__stats-value">{props.total_admissions.toLocaleString()}</div>
                <small>
                  <Link className="u-txt--capitalize" to="admission" href smooth={true} duration={500}>View all admission data</Link>
                </small>
              </li>
            }
            {
              props.total_revenue &&
              <li className="grid__col grid__col--6">
                <p className="u-mb--none">Total Revenue in {_getYear(props.revenue.end_date)}</p>
                <div className="v-hospital__stats-value">{props.total_revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <small>
                  <Link className="u-txt--capitalize" to="revenue" href smooth={true} duration={700}>View all revenue data</Link>
                </small>
              </li>
            }
          </ul>

        </div>
      </div>
    </div>

  </section>

);

function _buildAddress(street, city, zip) {
  return `${street} ${city}, IL ${zip}`;
}

function _getYear(timestamp) {
  const date = new Date(timestamp);
  return date.getFullYear();
}

function getColor(type) {
  return categories.filter(c => util.slugify(type).includes(c.slug))[0].color;
}
