import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import util from '../../utils';

export default (props) => (
  <div
    className={classNames('c-form-dropdown custom-scrollbar', { 'is-visible': props.inFocus })}>
    {
      props.topics.length
      ? loadTopics(props)
      : <div className="c-form-dropdown__category c-form-dropdown__item u-txt--capitalize">No indicators available</div>
    }
  </div>
);

function loadTopics(props) {
  const filteredTopics = util.filterTopicsList(props.topics, props.filter);
  if (!filteredTopics.length) {
    return <div className="c-form-dropdown__category c-form-dropdown__item u-txt--capitalize">No results</div>;
  }
  return filteredTopics.map((category, i) => {
    const isExpanded = props.expandedCategories.includes(category.id) || !props.searchInputEmpty;
    return <ul key={i}>
      <li
        className={classNames('c-form-dropdown__category c-form-dropdown__item', { 'is-expanded': isExpanded })}
        onClick={() => props.toggleCategory(category.id)}
        tabIndex="0"
        onFocus={() => props.onFocus(props.id)}
        onBlur={() => props.onBlur(props.id)}
      >
        <i className={classNames('fa', { 'fa-minus': isExpanded }, { 'fa-plus': !isExpanded })}></i>
        <span>{ category.name }</span>
        <span>{ `(${calculateTotalIndicatorsForCategory(category)})` }</span>
      </li>
      <li>{ loadSubCategories(category.sub_categories, props) }</li>
    </ul>;
  });
}

function loadSubCategories(subcategories, props) {
  return subcategories.map((sub, i) => {
    const isExpanded = props.expandedSubCategories.includes(sub.id) || !props.searchInputEmpty;
    return <ul key={i}>
      <li
        className={classNames('c-form-dropdown__category c-form-dropdown__item', { 'is-expanded': isExpanded })}
        onClick={() => props.toggleSubCategory(sub.id)}
        tabIndex="0"
        onFocus={() => props.onFocus(props.id)}
        onBlur={() => props.onBlur(props.id)}
      >
        <i className={classNames('fa', { 'fa-minus': isExpanded }, { 'fa-plus': !isExpanded })}></i>
        <span>{ sub.name }</span>
        <span>{ `(${sub.indicators.length})` }</span>
      </li>
      <li>
        <ul>{ loadIndicators(sub.indicators) }</ul>
      </li>
    </ul>;
  });
}

function loadIndicators(indicators) {
  return indicators.map((ind, i) => {
    return (
      <li key={i}>
        <Link className="c-form-dropdown__link c-form-dropdown__item" to={`/indicators/${ind.slug}`}>{ind.name}</Link>
      </li>
    );
  });
}

function calculateTotalIndicatorsForCategory(category) {
  const totalIndicators = category.sub_categories.reduce((total, sub) => {
    return total + sub.indicators.length;
  }, 0);
  if (totalIndicators === 0) {
    return null;
  }
  return totalIndicators;
}
