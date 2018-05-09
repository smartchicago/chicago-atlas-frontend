import React from 'react';
import { Link, withRouter } from 'react-router';
import classNames from 'classnames';
import SearchContainer from '../containers/SearchContainer';

import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';

import util from '../../utils';
import parser from '../../utils/parsers';

import { COMMUNITY_AREAS_GROUP_NAME, ZIP_CODES_KEY } from '../../constants/specialNames';

const SidebarNav = React.createClass({

  render() {
    const filteredTopics = util.filterTopicsList(this.props.topics, this.props.filter);
    const filteredAreas = util.filterAreasList(this.props.places, this.props.filter);
    return (
      <nav className="c-sub-nav main-layout__sidebar no-print">
        <div className="c-sub-nav__header c-sub-nav__box">
          <SearchContainer
            id="sidebar-search"
            placeholder="Indicators, Community Area, or Zip Code"
            className={classNames('c-sub-nav__search c-form-input--simple', {'mobile-hidden': !this.props.navOpen})}
          />
          {
            this.props.navOpen
            ? <button
              className="u-txt--uppercase txt-color-coral-red u-fw--bold c-sub-nav__close"
              onClick={() => this.props.toggleNav()}
            >Close</button>
            : this.renderClosedHeaderMobile(this.props)
          }
        </div>
        <div className="c-sub-nav__dropdown custom-scrollbar">
          <ul className={classNames('', {'mobile-hidden': !this.props.navOpen})}>
            { filteredTopics.length ? this.renderTopCategory('topic', this.props, 'Indicators') : null }
            <li className="c-sub-nav__list-container">
              {this.loadCategories(filteredTopics, this.props, 'indicators', 1)}
            </li>
          </ul>
          <ul className={classNames('', {'mobile-hidden': !this.props.navOpen})}>
            { filteredAreas.length ? this.renderTopCategory('areas', this.props, 'Community Areas') : null }
            <li className="c-sub-nav__list-container">
              {this.loadCategories(filteredAreas, this.props, 'areas', 1)}
            </li>
          </ul>
        </div>
      </nav>
    );
  },

  renderClosedHeaderMobile(props) {
    return (
      <div
        className="u-txt--center c-sub-nav__mobile"
        onClick={() => props.toggleNav()}
        tabIndex="0"
      >
        <i className="fa fa-search u-float--left" aria-hidden="true"></i>
        <span className="txt-color-coral-red u-fw--bold">{ props.name || <span>&nbsp;</span> }</span>
        <i className="fa fa-angle-down u-float--right" aria-hidden="true"></i>
      </div>
    );
  },

  renderTopCategory(section, props, sectionName) {
    const queryParams = this.props.location.query;
    const isExpanded = (props.openCategories[0] === section) || !isEmpty(props.filter) || ((has(queryParams, 'zip') && sectionName === COMMUNITY_AREAS_GROUP_NAME));
    return (
      <li
        className={classNames('c-sub-nav__top-level u-txt--uppercase c-sub-nav__box u-fw--bold c-form-dropdown__item',
          {'open': isExpanded})}
        tabIndex="0"
        onClick={(e) => this.props.toggleCategory(section, 0)}
      >
        {<i className={classNames('fa', { 'fa-minus': isExpanded }, { 'fa-plus': !isExpanded })}></i>}
        {sectionName}
      </li>
    );
  },

  loadCategories(categories, props, linkKey, categoryLevel) {
    if (!categories.length) {
      return null;
    }
    return categories.map((category, i) => {
      const queryParams = this.props.location.query;
      const isExpanded = (this.props.openCategories[categoryLevel] === util.slugify(category.name)) || !isEmpty(props.filter) || (has(queryParams, 'zip') && util.slugify(category.name) === ZIP_CODES_KEY);

      return (
        <ul key={i} className="c-sub-nav__list">
          <li
            onClick={(e) => this.props.toggleCategory(util.slugify(category.name), categoryLevel)}
            tabIndex="0"
            className={classNames('c-sub-nav__box c-form-dropdown__item', {'open': isExpanded})}
          >
            {<i className={classNames('fa', { 'fa-minus': isExpanded }, { 'fa-plus': !isExpanded })}></i>}
            <span className="u-txt--capitalize">{ category.name }</span>
          </li>
          <li className="c-sub-nav__list-container">
            {
              has(category, 'sub_categories')
              ? this.loadCategories(category.sub_categories, props, linkKey, categoryLevel + 1)
              : this.loadLink(category[linkKey], props.filter)
            }
          </li>
        </ul>
      );
    });
  },

  loadLink(cat, filter) {
    if (!cat || !cat.length) {
      return null;
    }
    return (
      <ul className="c-sub-nav__list">
        {
          cat.map((link, i) => {
            let parentSlug = '/indicators/';
            const endpoint = link.slug;
            const zipGeoType = 'Zip';
            if (has(link, 'geo_type')) {
              parentSlug = link.geo_type === 'Zip' ? '/zip-codes/' : '/community-areas/';
            }
            const names = link.geo_type === zipGeoType ? parser.splitZipCodes(link.name) : [link.name];
            const rows = names.map((name, j) => {
              return util.stringContains(name, filter) && <li key={name} className="c-sub-nav__link-item">
                <Link
                  onClick={(e) => this.props.toggleTab(0)}
                  className="c-sub-nav__link c-form-dropdown__item"
                  to={link.geo_type === zipGeoType ? `${parentSlug}${endpoint}?zip=${name}` : `${parentSlug}${endpoint}`}
                  activeClassName="link-active"
                >
                  {name}
                </Link>
              </li>;
            });
            return rows;
          })
      }
      </ul>
    );
  }

});

export default withRouter(SidebarNav);
