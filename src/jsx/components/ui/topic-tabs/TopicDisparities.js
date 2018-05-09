import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Select from 'react-select';

import * as fetch from '../../../actions/fetchActions';
import * as ui from '../../../actions/uiActions';

import DisparitiesBarChart from '../charts/DisparitiesBarChart';

import Max from 'lodash/max';
import Ceil from 'lodash/ceil';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';

import util from '../../../utils';

import {
  NO_DATA_AVAILABLE,
  RACE_ETHNICITY_KEY,
  ALL_RACE_GROUP_NAME,
  ECONOMIC_HARDSHIP,
  ECONOMIC_HARDSHIP_LOW,
  ECONOMIC_HARDSHIP_HIGH,
  ECONOMIC_HARDSHIP_MEDIUM,
  GRADE,
  GRADE_KINDERGARTEN
} from '../../../constants/specialNames';

const TopicDisparities = React.createClass({
  componentDidUpdate(prevProps) {
    if (prevProps.params.name !== this.props.params.name ||
      prevProps.year !== this.props.year) {
      const slug = this.props.params.name;
      this.props.fetchCityData(slug, this.props.year);
    }
  },

  mapOptions(years) {
    if (!years) {
      return [];
    }
    return years.map(y => {
      return {
        label: y.toString(),
        value: y
      };
    });
  },

  checkIfKeyHasData(key, data) {
    const values = data.map(v => v[key]);
    const testValue = values.filter(function(item, pos) {
      return values.indexOf(item) === pos;
    });

    return testValue[0];
  },

  getCityWide(data) {
    return data.find(x => x.demo_group_name === ALL_RACE_GROUP_NAME);
  },

  getMaxValue(data, cityWide) {
    const values = this.checkIfKeyHasData('upper_95ci_weight_percent', data)
     ? data.map(v => v.upper_95ci_weight_percent)
     : data.map(v => v.weight_percent);

    let max = Max(values);
    if (cityWide && cityWide > max) {
      max = cityWide;
    }

    const calculatedDomainY = Ceil(max / 10) * 10;
    return calculatedDomainY - max < 5 ? calculatedDomainY + 10 : calculatedDomainY;
  },

  getMaxDataValue(data, cityWide) {
    let max = 0;
    forEach(groupBy(util.unique(data, e => e.demo_group_name), 'demography'), (value, key) => {
      const dataValues = value.filter(v => Boolean(v.weight_percent));
      const maxValue = this.getMaxValue(dataValues, cityWide);
      if (maxValue > max) {
        max = maxValue;
      }
    });
    return max;
  },

  getValueType(data) {
    return data[0].value_type;
  },

  mapCharts(data, cityWide) {
    const charts = [];
    const maxDataValue = this.getMaxDataValue(data, cityWide);
    const valueType = this.getValueType(data);
    forEach(groupBy(data, 'demography'), (value, key) => {
      const newDataValues = value.filter(dv => dv.demo_group_name !== ALL_RACE_GROUP_NAME);
      if (newDataValues.length) {
        if (key === ECONOMIC_HARDSHIP) {
          const lowRowIndex = newDataValues.findIndex(v => v.demo_group_name === ECONOMIC_HARDSHIP_LOW);
          const lowRow = newDataValues.splice(lowRowIndex, 1);
          const mediumRowIndex = newDataValues.findIndex(v => v.demo_group_name === ECONOMIC_HARDSHIP_MEDIUM);
          const mediumRow = newDataValues.splice(mediumRowIndex, 1);
          const highRowIndex = newDataValues.findIndex(v => v.demo_group_name === ECONOMIC_HARDSHIP_HIGH);
          const highRow = newDataValues.splice(highRowIndex, 1);
          newDataValues.unshift(
            lowRow[0], mediumRow[0], highRow[0]
          );
        } else if (key === GRADE) {
          const kindergartenIndex = newDataValues.findIndex(v => v.demo_group_name === GRADE_KINDERGARTEN);
          const KindergartenRow = newDataValues.splice(kindergartenIndex, 1);
          newDataValues.unshift(KindergartenRow[0]);
        }
        charts.push(
          <DisparitiesBarChart
            data={newDataValues}
            maxValue={maxDataValue}
            valueType={valueType}
            title={key}
            key={key}
            cityWide={cityWide && cityWide.weight_percent}
          />
        );
      }
    });
    if (charts.length) {
      return charts.map(v => v);
    } else {
      return <div className="c-placeholder">{NO_DATA_AVAILABLE}</div>;
    }
  },

  render() {
    const cityWide = this.getCityWide(this.props.data);
    return (
      <div>
        <div className="u-mb--medium no-print">
          <label>Year</label>
          <Select
            className=""
            name="tab-year-select"
            options={this.props.topic.data && this.mapOptions(this.props.topic.data.years)}
            onChange={(v) => this.props.changeYear(v.value)}
            value={this.props.year}
            clearable={false}
            searchable={false}
            disabled={this.props.topic.data.years.length <= 1}
          />
        </div>
        <div className="c-disparities">
          {this.mapCharts(this.props.data, cityWide)}
        </div>
      </div>
    );
  }

});

const mapStateToProps = (store) => {
  return {
    year: store.viewTopicDetails.selectedYear,
    data: store.viewTopicDetails.city
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeYear: (year) => dispatch(ui.changeYear(year)),
    fetchCityData: (slug, year) => dispatch(fetch.topicCityData(slug, year)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicDisparities);
