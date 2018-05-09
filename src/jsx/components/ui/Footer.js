import React from 'react';

import meta from '../../../data/meta.json';

export default (props) => (
  <footer className="main-footer" role="contentinfo">
    <div className="grid">
      <div className="grid__col main-footer__col">© Smart Chicago</div>
      <div className="grid__col main-footer__col">
        <a href={meta.smart_chicago.twitter}
          className="u-color--current"
          target="_blank"
        >
          @smartchicago
        </a>
        &nbsp;|&nbsp;
        <strong>
          <a href={meta.smart_chicago.github}
            className="u-color--current"
            target="_blank"
          >
            github
          </a>
        </strong>
      </div>
    </div>
  </footer>
);
