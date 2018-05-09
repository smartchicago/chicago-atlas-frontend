import React from 'react';
import { Link } from 'react-router';

export default (props) => (
  <ul>
    { renderLinks(props) }
  </ul>
);

function renderLinks(props) {
  return props.links.map((dynamicLink, index) => {
    return (
      <li key={index} className="main-header__nav-item">
        {renderLink(dynamicLink, props)}
      </li>
    );
  });
}

function renderLink(dynamicLink, props) {
  if (dynamicLink.external) {
    return <a href={dynamicLink.link} className="main-header__nav-link">{dynamicLink.name}</a>;
  } else {
    return (
      <Link
        onClick={props.closeMenu}
        to={dynamicLink.link}
        activeClassName="active"
        className="main-header__nav-link"
      >
        {dynamicLink.name}
      </Link>
    );
  }
}
