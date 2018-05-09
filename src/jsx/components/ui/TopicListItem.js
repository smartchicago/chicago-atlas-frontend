import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

export default (props) => (

  <ul className="c-navigation-list">
    <li>
      <h3
        tabIndex="0"
        onClick={() => props.toggleGroup(props.index.toString())}
        className="c-navigation-list__title u-font--serif"
      >
        {props.name}
        <i className={classNames('fa', props.collapsed.includes(props.index.toString()) ? 'fa-caret-down' : 'fa-caret-up')} aria-hidden="true" />
      </h3>
    </li>

    {props.sub_categories && props.sub_categories.map(function(subCategory, i) {
      return (
        <li key={i}>
          <ul
            className={
              classNames(
                'c-navigation-list',
                props.collapsed.includes(props.index.toString()) ? 'c-navigation-list__ul--hide' : ''
              )
            }
          >
            <li>
              <h3
                tabIndex="0"
                onClick={() => props.toggleGroup(props.index.toString() + i.toString())}
                className="c-navigation-list__title u-font--serif"
              >
                <i className={classNames('fa', props.collapsed.includes(props.index.toString() + i.toString()) ? 'fa-caret-down' : 'fa-caret-up')} aria-hidden="true" />
                {subCategory.name}
              </h3>
            </li>
            {subCategory.indicators && subCategory.indicators.map((link, i2) => {
              return (
                <li
                  key={i2}
                  className={
                    classNames(
                      'c-navigation-list',
                      props.collapsed.includes(props.index.toString() + i.toString())
                      ? 'c-navigation-list__ul--hide' : ''
                    )
                  }
                >
                  <Link className="c-navigation-list__link" to={`/indicators/${link.slug}`}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
        </li>
      );
    })}
  </ul>

);
