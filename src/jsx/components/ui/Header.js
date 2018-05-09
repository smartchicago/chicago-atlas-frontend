import React from 'react';
import classNames from 'classnames';
import { IndexLink } from 'react-router';
import MainNavbar from './MainNavbar';
import MainNavbarLinks from '../../../data/MainNavbar.json';

const Logo = process.env.PUBLIC_URL + '/images/logo_partner_cdph.png';

export default (props) => (

  <header className="main-header" role="banner">
    <IndexLink
      to={'/'}
      activeClassName="active"
      className="main-header__logo"
      onClick={props.closeMenu}
    >
      <img src={Logo} alt="Chicago Health Atlas" />
    </IndexLink>

    <nav className={classNames('main-header__navbar', { 'visible': !props.collapsed })}>
      <MainNavbar links={MainNavbarLinks} closeMenu={props.closeMenu} />
    </nav>

    <span
      tabIndex="0"
      onClick={props.toggleMenu}
      className={classNames('main-header__menu', { 'is-open': !props.collapsed })}
    >
      <i className="menu-icon__lines" aria-hidden="true"></i>
      <span className="u-visuallyhidden">Menu</span>
    </span>
  </header>
);
