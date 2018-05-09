import React from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

import isEmpty from 'lodash/isEmpty';

const colspan = 6;

export default (props) => (

  <table className={classNames(props.className, 'c-table')}>

    <thead className="c-table__head u-font--serif">
      <tr>
        {_buildHeadings(props.headings)}
      </tr>
    </thead>

    {buildGroups(props.data, props)}

  </table>

);

function buildGroups(groups = [], props) {
  return groups.map((group, i) => {
    return (
      <tbody className={classNames('c-table__group', props.collapsed.includes(group.id) ? 'is-collapsed' : '')} key={i}>
        <tr>
          <td
            colSpan={colspan}
            className="c-table__cell c-table__cell--groupname u-font--serif u-txt--capitalize"
            onClick={() => props.toggleGroup(group.id)}
            onKeyPress={(e) => e.charCode === 13 && props.toggleGroup(group.id)}
            tabIndex="0"
            role="button"
            aria-label="Collapse group"
          >
            <i className={classNames('fa', props.collapsed.includes(group.id) ? 'fa-caret-up' : 'fa-caret-down')}
              aria-hidden="true"
            />
            {group.name}
          </td>
        </tr>
        {buildRows(group.rows, props)}
      </tbody>
    );
  });
}

function _buildHeadings(headings = []) {

  if (!headings.length) {
    return <th colSpan={colspan} className="c-table__cell c-table__cell--head u-fw--normal">{'No data'}</th>;
  }

  return headings.map((heading, i) => {
    return (
      <th className="c-table__cell c-table__cell--head" key={i}>
        {heading}
      </th>
    );
  });

};

function buildRows(rows = [], props) {
  if (!rows.length) {
    return <tr><td colSpan={colspan} className="c-table__cell">{'No Data'}</td></tr>;
  }

  return rows.map((row, i) => {
    return (
      <tr key={i}>
        <td
          className="c-table__cell u-fw--medium"
          tabIndex="0"
          role="button"
          aria-label="Indicator details"
          onClick={() => browserHistory.push(`/indicators/${row.indicator_slug}`)}
          onKeyPress={(e) => e.charCode === 13 && browserHistory.push(`/indicators/${row.indicator_slug}`)}
          title={row.description}
        >
          {row.indicator}
        </td>
        {
          <td className="c-table__cell c-table__baseline">
            {row.citywide_baseline}
          </td>
        }
        {
          row.priority_population &&
          <td className="c-table__cell">
            {row.priority_population}
          </td>
        }
        {
          <td className="c-table__cell c-table__baseline">
            {row.priority_baseline}
          </td>
        }
        {
          <td className="c-table__cell c-table__baseline">
            {row.target}
          </td>
        }
        <td className="c-table__cell">
          {
            row.source &&
            <a href={row.source.datasource_url} target="_blank">{row.source.datasource}</a>
          }
        </td>
      </tr>
    );
  });
}

function renderBaselineData(data = [], props, id) {
  return data.map((d, i) => {
    return (
      <div key={i} className={classNames('c-table-cell__dataset', { 'is-expanded': props.datasetsExpanded.includes(id) })}>
        <div className="c-table-cell__value">
          <span>{d.value}</span>
          { d.beep && <small>per 10,000</small> }
        </div>
        <span className="c-table-cell__year">({d.year})</span>
        {
          (i === 0 && data.length > 1)
          ? <i
            tabIndex="0"
            className={classNames('fa', props.datasetsExpanded.includes(id) ? 'fa-chevron-circle-up' : 'fa-chevron-circle-down')}
            onClick={() => props.expandDataset(id)}
            ></i>
          : <i className="fa">&nbsp;</i>
        }
      </div>
    );
  });
}
