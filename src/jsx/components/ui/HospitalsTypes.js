import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';

import resourcesData from '../../constants/hospitalCategories';

export default (props) => (
  <div>
    <p className="u-fw--bold txt-color-gray">Categories</p>
    {renderCategoryFilter(resourcesData, props)}
    <Select
      className="categories-filter__select"
      multi={true}
      options={mapCategories(resourcesData)}
      value={getSelectedCategories(props.categories)}
      optionRenderer={(opt) => renderCategoryOption(opt)}
      onChange={(value) => props.updateSelectedCategories(value)}
    />
  </div>

);

function renderCategoryFilter(allCategories, props) {
  const items = allCategories.map((cat, i) => {
    return (
      <li key={i} className="c-checkbox-filter__item">
        <label htmlFor={cat.slug}>
          <input
            type="checkbox"
            id={cat.slug}
            checked={props.categories.includes(cat.slug)}
            onChange={(e) => props.toggleCategory(e.target.id)}
          />
          <span className="c-checkbox-filter__icon" style={{ backgroundColor: cat.color }}></span>
          {cat.name}
        </label>
      </li>
    );
  });

  return (
    <ul className="c-checkbox-filter hospitals-filter__checkboxes c-checkbox-filter--alt">
      <li className="c-checkbox-filter__item">
        <label htmlFor="category-all">
          <input
            type="checkbox"
            id="category-all"
            checked={props.categories.length === allCategories.length}
            onChange={(e) => props.toggleCategory(e.target.id, true)}
          />All
        </label>
      </li>
      {items}
    </ul>
  );
}

function getSelectedCategories(selected) {
  const filteredData = resourcesData.filter(cat => selected.includes(cat.slug));
  return filteredData.map((cat) => {
    return {
      label: cat.name,
      value: cat.slug
    };
  });
}

function mapCategories(categories) {
  return categories.map((cat) => {
    return {
      label: cat.name,
      value: cat.slug
    };
  });
}

function renderCategoryOption(cat) {
  const thisCat = resourcesData.filter(data => data.slug === cat.value)[0];
  return (
    <div>
      { cat.value !== 'all' &&
      <span className="c-checkbox-filter__icon" style={{ backgroundColor: thisCat.color }}>
        <i className={classNames('fa', thisCat.icon)} aria-hidden="true"></i>
      </span>
      }
      {cat.label}
    </div>
  );
}
