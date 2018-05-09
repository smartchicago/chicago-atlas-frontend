import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';

export default React.createClass({
  displayName: 'Tabs',

  render() {
    const activeTabIndex = this.props.activeTab;
    let tabContent;

    const tabs = this.props.data.map((tab, index) => {
      const active = index.toString() === activeTabIndex.toString();
      if (active) {
        tabContent = (<tab.component {...tab.props} />);
      }
      return (
        <li key={index} className={classnames('c-tabs__item', { 'is-active': active })}>
          <button onClick={() => this.props.toggleTab(index)} disabled={tab.disabled}>
            {tab.label}
          </button>
        </li>
      );
    });

    return (
      <div className="c-tabs">
        <div className="u-relative">
          <Select
            className="c-tabs__select no-print"
            name="tab-topic-select"
            options={this.mapOptions()}
            onChange={(v) => this.props.toggleTab(v.value)}
            value={activeTabIndex}
            clearable={false}
            searchable={false}
          />
        </div>
        <ul className="c-tabs__list no-print">{tabs}</ul>
        <div className="c-tabs__content">{tabContent}</div>
      </div>
    );
  },

  mapOptions() {
    return this.props.data.map((tab, index) => {
      return {
        label: tab.label,
        value: index,
        disabled: tab.disabled
      };
    });
  }

});
