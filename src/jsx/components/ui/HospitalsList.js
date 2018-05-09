import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import util from '../../utils';

export default class HospitalsList extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.hospitalsPointToFocus !== prevProps.hospitalsPointToFocus) {
      const elm = document.getElementById(`resource-list-item-${this.props.hospitalsPointToFocus}`);

      elm.scrollIntoView();
      elm.classList.add('item-map-focused');
      setTimeout(() => elm.classList.remove('item-map-focused'), 3000);
    }
  }

  render() {
    const {
      filter,
      hospitals,
      className,
      categories,
      onSelectedHospital
    } = this.props;

    const filtered = filterData(hospitals, filter);

    if (!filtered.length) {
      return (
        <ol className="c-list-box__inner">
          <li className="c-list-box__placeholder">
            <div>No Hospitals Available</div>
          </li>
        </ol>
      );
    }

    const seeOnMapOnClick = (e, lat, long) => {
      onSelectedHospital(lat, long);
      e.preventDefault();
    };

    return (
      <div className={classNames(className, 'c-list-box c-list-box--alt custom-scrollbar')}>
        <ol className="c-list-box__inner">
          {filtered.map((res, i) => {
            const cat = categories.filter(cat => {
              const type = res.sub_type ? util.slugify(res.sub_type) : 'uncategorized';
              return type.includes(cat.slug);
            })[0];

            return (
              <li key={i} className="c-list-box__item">
                <Link to={`/hospitals/${res.slug}`} className="c-list-box__link" id={`resource-list-item-${res.src_id}`}>
                  <span
                    className={`${res.newIndex ? 'c-list-box-list' : 'c-list-box__icon'}`}
                    style={{ backgroundColor: cat.color }}>
                    {res.newIndex}
                  </span>
                  <div className="c-list-box__header">
                    <span className="c-list-box__title">{res.name}</span>
                  </div>
                  <div className="c-list-box__info txt-color-rolling-stone u-fw--light">
                    <i className="fa fa-map-marker" aria-hidden="true"></i> {res.addr_street}, IL {res.addr_zip}
                  </div>
                  <div className="c-list-box__info see-on-map-container txt-color-rolling-stone u-fw--light">
                    <div>
                      <i className="fa fa-phone" aria-hidden="true"></i> {res.contact_phone}
                    </div>

                    <button
                      className="see-on-map-button"
                      onClick={e => seeOnMapOnClick(e, res.latitude, res.longitude)}
                    >
                      See on map
                    </button>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

function filterData(list, filter) {
  return list.filter(item => {
    let v = false;
    filter.forEach(cat => {
      const type = item.sub_type ? util.slugify(item.sub_type) : 'uncategorized';
      if (type.includes(cat)) {
        v = true;
      }
    });
    return v;
  });
}
