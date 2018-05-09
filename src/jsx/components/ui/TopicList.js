import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import TopicListItem from './TopicListItem';

import isEmpty from 'lodash/isEmpty';

export default (props) => {
  return (
    <div className="t-columns">
      {
        !isEmpty(props.data)
        ? renderListItems(props)
        : <div>No results</div>
      }
    </div>
  );
};

function renderListItems(props) {
  return props.data.map((item, i) =>
    <TopicListItem
      key={i}
      index={i}
      name={item.name}
      sub_categories={item.sub_categories}
      toggleGroup={props.toggleGroup}
      collapsed={props.collapsed}
    />
  );
}
