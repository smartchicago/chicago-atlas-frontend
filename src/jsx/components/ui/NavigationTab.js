import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

export default (props) => (

  <ul className={classNames('c-navigation-tab', props.className)}>
    {buildSections(props.sections)}
  </ul>

);

function buildSections(sections) {
  return sections.map((section, i) => {
    return (
      <li key={i} className="c-navigation-tab__item">
        <Link to={section.url} className="c-navigation-tab__link" activeClassName="is-active">
          <span>{section.name}</span>
        </Link>
      </li>
    );
  });
}
