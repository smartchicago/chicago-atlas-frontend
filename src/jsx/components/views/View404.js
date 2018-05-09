import React from 'react';
import { Link } from 'react-router';

export default (props) => (
  <div className="u-txt--center">
    <h1 className="t-main-title">Oh no!</h1>
    <h2 className="t-subtitle">This probably isn’t what you’re looking for.</h2>
    <Link className="v-404__button" to="/">Back to Home</Link>
    <div className="v-404__image-container">
      <img
        className="v-404__img"
        src={process.env.PUBLIC_URL + '/images/svg/404.svg'}
        alt="Page not found"
      />
    </div>
  </div>
);
