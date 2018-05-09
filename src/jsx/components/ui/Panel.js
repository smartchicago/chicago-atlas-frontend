import React from 'react';
import classNames from 'classnames';

import SaveWidget from './SaveWidget';

export default (props) => (
  <section
    className="c-panel u-mb--small print-section"
    role="tablist"
    aria-live="polite"
    id={props.id}
  >
    <header className="c-panel__header">
      <div
        className="c-panel__title-wrapper"
        onClick={() => props.togglePanel(props.id)}
        onKeyPress={(e) => e.charCode === 13 && props.togglePanel(props.id)}
        tabIndex="0"
        role="button"
      >
        <i className={classNames('fa',
            isOpen(props) ? 'fa-caret-up txt-color-coral-red' : 'fa-caret-down txt-color-charade')}
          aria-hidden="true"
        />
        <h2 className="c-panel__title u-font--serif">{props.title}</h2>
      </div>
      {
        props.controls &&
        <div className="c-panel__controls">
          <SaveWidget
            className="in-panel"
            // api={'https://chicagohealth.herokuapp.com/apidoc'}
            section={props.id}
            handlePrint={props.handlePrint}
          />
        </div>
      }
    </header>
    <div className={classNames('c-panel__content', !isOpen(props) ? 'u-hidden' : '')}
      aria-expanded={isOpen(props) && true}
    >
      {props.children}
    </div>
  </section>
);

function isOpen(props) {
  return props.openPanels.includes(props.id);
}
