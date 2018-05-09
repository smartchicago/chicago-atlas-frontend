import React from 'react';
import classNames from 'classnames';

export default (props) => (
  <ul className={classNames(props.className, 'c-icon-links no-print')}>
    {
      props.api &&
      <li>
        <a href={props.api}>
          <i className="fa fa-code" aria-hidden="true"></i>
          <span className="u-visuallyhidden">API endpoint</span>
        </a>
      </li>
    }
    {
      props.download &&
      <li>
        <a href={props.download}>
          <i className="fa fa-download" aria-hidden="true"></i>
          <span className="u-visuallyhidden">Download data</span>
        </a>
      </li>
    }
    <li>
      <button onClick={() => handlePrint(props.section, props)}>
        <i className="fa fa-print" aria-hidden="true"></i>
        <span className="u-visuallyhidden">Print</span>
      </button>
    </li>
  </ul>
);

function handlePrint(section = 'root', props) {

  if (props.handlePrint) {
    return props.handlePrint(section);
  }

  const el = document.getElementById(section);
  el.classList.add('is-printable');
  window.print();
  el.classList.remove('is-printable');
}
