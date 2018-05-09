import React from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

import {
  SUPPRESSED_TABLE_COLUMN_FLAG,
  CONTEXT_TABLE_COLUMN_FLAG,
  CONTEXT_TABLE_COLUMN_NUMBER,
  EMPTY_DEMOGRAPHY_ORDER
} from '../../../constants/specialNames';

import parser from '../../../utils/parsers';

export default (props) => (

  <table className={classNames(props.className, 'c-table')}>

    <thead className="c-table__head u-font--serif">
      <tr>
        {buildHeadings(props.headings)}
      </tr>
    </thead>

    {buildGroups(props.data, props)}

  </table>

);

function buildHeadings(headings = []) {

  if (!headings.length) {
    return <th className="c-table__cell c-table__cell--head u-fw--normal">{'No data'}</th>;
  }

  return headings.map((heading, i) => {
    return (
      <th className="c-table__cell c-table__cell--head u-fw--normal" key={i}>
        {heading}
      </th>
    );
  });

};

function buildGroups(groups = [], props) {
  const collapsed = props.collapsed || [];
  if (props.demography_order && props.demography_order !== EMPTY_DEMOGRAPHY_ORDER) {
    let orderedGroups = [];
    const demographies = parser.planeIndicatorName(props.demography_order).split(',');
    demographies.map(demography => {
      const group = groups.filter(group => {
        return parser.planeIndicatorName(group.name) === demography;
      });
      if (group.length) {
        orderedGroups.push(group[0]);
      }
    });
    if (orderedGroups.length < groups.length) {
      groups = groups.filter(group => {
        return !demographies.includes(parser.planeIndicatorName(group.name));
      });
      orderedGroups = orderedGroups.concat(groups);
    }
    groups = orderedGroups;
  }
  return groups.map((group, i) => {
    const colspan = (groups[0].rows.length && groups[0].rows[0].data && groups[0].rows[0].data.length) || (groups[0].rows.length && groups[0].rows[0].length);
    return (
      <tbody className={classNames('c-table__group', collapsed.includes(group.id) ? 'is-collapsed' : '')} key={i}>
        {
          group.name &&
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
              <i className={classNames('fa', collapsed.includes(group.id) ? 'fa-caret-up' : 'fa-caret-down')}
                aria-hidden="true"
              />
              {group.name}
            </td>
          </tr>
        }
        {_buildRows(group.rows)}
      </tbody>
    );
  });
}

function _buildRows(rows = []) {
  if (!rows.length) {
    return <tr><td className="c-table__cell">{'No Data'}</td></tr>;
  }
  return rows.map((row, i) => {
    return (
      <tr key={i}>
        {_buildCells(row, row.flag)}
      </tr>
    );
  });
}

function _buildCells(cells = [], flag) {
  if (cells.data) {
    return cells.data.map((cell, i) => {
      const addTooltip = (flag === SUPPRESSED_TABLE_COLUMN_FLAG && cell === '—' && i === CONTEXT_TABLE_COLUMN_NUMBER) ||
        (flag === CONTEXT_TABLE_COLUMN_FLAG && i === CONTEXT_TABLE_COLUMN_NUMBER);
      return (
        <td key={i} className={`c-table__cell${addTooltip ? ' c-table-tooltip-hover' : ''}`}>
          {(addTooltip && <div className="c-table-tooltip">
            <a href="/about#about">Learn More</a>
            </div>
          )}
          {cell}
          {flag === CONTEXT_TABLE_COLUMN_FLAG && i === CONTEXT_TABLE_COLUMN_NUMBER &&
            <span className="txt-color-coral-red">*</span>
          }
        </td>
      );
    });
  } else {
    return cells.map((cell, i) => {
      return (
        <td key={i} className="c-table__cell">{cell}</td>
      );
    });
  }
}
