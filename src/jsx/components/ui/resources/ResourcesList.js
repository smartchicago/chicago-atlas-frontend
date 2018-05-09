import React from 'react';
import classNames from 'classnames';

export default class ResourcesList extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.resourcesPointToFocus !== prevProps.resourcesPointToFocus) {
      const elm = document.getElementById(`resource-list-item-${this.props.resourcesPointToFocus}`);

      elm.scrollIntoView();
      elm.classList.add('item-map-focused');
      setTimeout(() => elm.classList.remove('item-map-focused'), 3000);
    }
  }

  getResources(filteredResources) {
    return filteredResources.map((res, i) => {
      const cat = this.props.categories.filter(cat => res.categories.includes(cat.slug));

      const seeOnMapOnClick = (e, lat, long) => {
        this.props.onSelectedResource(lat, long);
        e.preventDefault();
      };

      return (
        <li key={i} className="c-list-box__item">
          {
            res.program_url.trim() === 'NULL' || res.program_url.trim() === ''
            ? <div className="c-list-box__link" target="_blank" id={`resource-list-item-${res.id}`}>
              <div className="c-list-box__header">
                <span className="c-list-box__title u-font--serif">{res.program_name}</span>
                <span className="c-list-box__icon-list">{renderIcons(cat)}</span>
              </div>
              <div className="c-list-box__info txt-color-rolling-stone u-fw--light">
                <i className="fa fa-map-marker" aria-hidden="true"></i> {res.address}
              </div>
              <div className="c-list-box__info see-on-map-container txt-color-rolling-stone u-fw--light">
                <div className="c-list-box__info txt-color-rolling-stone u-fw--light">
                  <i className="fa fa-phone" aria-hidden="true"></i> {res.phone}
                </div>

                <button
                  className="see-on-map-button"
                  onClick={e => seeOnMapOnClick(e, res.latitude, res.longitude)}
                >
                  See on map
                </button>
              </div>
            </div>
            : <a
              href={res.program_url}
              className="c-list-box__link clickable-resource-item"
              target="_blank"
              id={`resource-list-item-${res.id}`}
            >
              <div className="c-list-box__header">
                <span className="c-list-box__title u-font--serif">{res.program_name}</span>
                <span className="c-list-box__icon-list">{renderIcons(cat)}</span>
              </div>
              <div className="c-list-box__info txt-color-rolling-stone u-fw--light">
                <i className="fa fa-map-marker" aria-hidden="true"></i> {res.address}
              </div>
              <div className="c-list-box__info see-on-map-container txt-color-rolling-stone u-fw--light">
                <div className="c-list-box__info txt-color-rolling-stone u-fw--light">
                  <i className="fa fa-phone" aria-hidden="true"></i> {res.phone}
                </div>

                <button
                  className="see-on-map-button"
                  onClick={e => seeOnMapOnClick(e, res.latitude, res.longitude)}
                >
                  See on map
                </button>
              </div>
            </a>
          }
        </li>
      );
    });
  }

  render() {
    const {
      resources,
      filter,
      className
    } = this.props;

    const filteredResources = filterData(resources, filter);

    if (!filteredResources.length) {
      return (
        <ul className="c-list-box__inner">
          <li className="c-list-box__placeholder">
            <div>No Resources Available</div>
          </li>
        </ul>
      );
    }

    return (
      <div className={classNames(className, 'c-list-box custom-scrollbar')} ref="resourcesScroll">
        <ul className="c-list-box__inner">
          {this.getResources(filteredResources)}
        </ul>
      </div>
    );
  }
}

function renderIcons(cat) {
  return cat.map((c, i) => {
    return (
      <span className="c-list-box__icon" style={{ backgroundColor: c.color }} key={i}>
        <i className={classNames('fa', c.icon)} aria-hidden="true"></i>
      </span>
    );
  });
}

function filterData(list, filter) {
  return list.filter(item => {
    let v = false;
    filter.forEach(cat => {
      if (item.categories) {
        const categories = item.categories.split(',');
        if (item.categories && item.categories.includes(cat)) {
          v = true;
        }
      } else {
        v = false;
      }

    });
    return v;
  });
}
