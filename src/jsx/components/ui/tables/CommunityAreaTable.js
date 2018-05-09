import React from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

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
  return groups.map((group, i) => {
    return (
      <tbody className={classNames('c-table__group', collapsed.includes(group.id) ? 'is-collapsed' : '')} key={i}>
        {
          group.name &&
          <tr>
            <td
              colSpan={groups[0].rows.length && groups[0].rows[0].cells.length}
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
        {_buildCells(row.cells, row.slug)}
      </tr>
    );
  });
}

function _buildCells(cells = [], slug) {
  return cells.map((cell, i) => {
    if (i === 0) {
      return (
        <td key={i}
          className="c-table__cell"
          tabIndex="0"
          role="button"
          aria-label="Indicator details"
          onClick={() => browserHistory.push(`/indicators/${slug}`)}
          onKeyPress={(e) => e.charCode === 13 && browserHistory.push(`/indicators/${slug}`)}
        >
          {cell}
        </td>
      );
    } else {
      return (
        <td key={i} className="c-table__cell">{cell}</td>
      );
    }
  });
}
