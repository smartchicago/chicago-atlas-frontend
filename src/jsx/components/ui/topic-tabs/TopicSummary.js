import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Select from 'react-select';
import SimpleTable from '../tables/SimpleTable';

import ButtonToggle from '../ButtonToggle';

import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';
import orderBy from 'lodash/orderBy';
import reverse from 'lodash/reverse';

import * as fetch from '../../../actions/fetchActions';
import * as ui from '../../../actions/uiActions';

import util from '../../../utils';

import {
  CITY_NAME,
  RATE_COLUMN,
  YEAR_COLUMN,
  NUMBER_COLUMN,
  NO_DATA_AVAILABLE,
  ALL_RACE_GROUP_NAME,
  ZIP_CODES_GROUP_NAME,
  COMMUNITY_AREAS_GROUP_NAME,
  RACE_ETHNICITY_SLUG,
  ECONOMIC_HARDSHIP_SLUG,
  MATERNAL_RACE_ETHNICITY_SLUG,
  ECONOMIC_HARDSHIP_LOW,
  ECONOMIC_HARDSHIP_MEDIUM,
  ECONOMIC_HARDSHIP_HIGH,
  GRADE_KINDERGARTEN,
  GRADE_SLUG
} from '../../../constants/specialNames';

const TopicSummary = React.createClass({

  getInitialState() {
    return {
      collapsedMeasures: []
    };
  },

  componentDidMount() {
    this.props.fetchMeasures(this.props.measure);
    const slug = this.props.params.name;
    const year = this.props.year || this.props.topic.data.years[0];
    this.props.fetchCityData(slug, year);
    this.props.fetchAreasData(slug, year);
  },

  componentDidUpdate(prevProps) {
    if (prevProps.params.name !== this.props.params.name ||
      prevProps.year !== this.props.year) {
      const slug = this.props.params.name;
      const year = this.props.year;
      this.props.fetchCityData(slug, year);
      this.props.fetchAreasData(slug, year);
      this.props.fetchMeasures(this.props.measure);
    };
  },

  render() {
    const tableSelected = !isEmpty(this.props.topic.city) ? this.props.tableSelected : 1;
    return (
      <div className="v-topic">
        <div className="v-topic__sidebar">
          <div className="u-mb--medium no-print">
            <label>Year</label>
            <Select
              name="tab-year-select"
              options={this.props.topic.data && this.mapOptions(this.props.topic.data.yearsForSummary)}
              onChange={(v) => this.toggleYear(v.value)}
              value={this.props.year}
              clearable={false}
              searchable={false}
              disabled={this.props.topic.data.years.length <= 1}
            />
          </div>
          {
            (!isEmpty(this.props.topic.city) && !isEmpty(this.props.topic.area))
            ? <div className="u-mb--medium no-print">
              <label>Location</label>
              <ButtonToggle
                labelLeft="City Wide"
                labelRight={this.props.topic.area[0].geo_group_part ? COMMUNITY_AREAS_GROUP_NAME : ZIP_CODES_GROUP_NAME}
                selected={tableSelected}
                title="button"
                toggle={this.props.toggleTable}
              />
            </div> : null
          }
          {
            this.props.measure.length && this.filterMeasures(this.props.params.name, this.props.measure).length
            ? <div>
              { (isEmpty(this.props.topic.city) || isEmpty(this.props.topic.area))
                ? <div className="u-mb--medium no-print">
                  <label>Location</label>
                  <div className={'c-form-toggle'}>
                    <label className={classNames('c-form-toggle__label', { active: true })}>
                      { (tableSelected === 0)
                      ? 'City Wide' : this.props.topic.area[0] && this.props.topic.area[0].geo_group_part ? COMMUNITY_AREAS_GROUP_NAME : ZIP_CODES_GROUP_NAME
                      }
                    </label>
                  </div>
                </div> : null
              }
              <hr className="t-separator" />
              <h3 className="u-txt--uppercase t-minor-title">Understanding the measure</h3>
              {this.renderMeasures(this.filterMeasures(this.props.params.name, this.props.measure))}
            </div> : null
          }
        </div>
        <div className="v-topic__content">
          {
            tableSelected === 0
            ? isEmpty(this.mapCityTableData(this.props.city))
              ? <div className="c-placeholder">{NO_DATA_AVAILABLE}</div>
              : <SimpleTable
                data={this.mapCityTableData(this.props.city)}
                headings={[`${YEAR_COLUMN} ` + this.props.year, NUMBER_COLUMN, RATE_COLUMN]}
                toggleGroup={this.props.toggleGroup}
                collapsed={this.props.collapsed}
                demography_order={this.props.topic.data && this.props.topic.data.demography_order}
              />
            : null
          }
          {
            tableSelected === 1
            ? isEmpty(this.mapAreaTableData(this.props.area))
              ? <div className="c-placeholder">{NO_DATA_AVAILABLE}</div>
              : <SimpleTable
                data={this.mapAreaTableData(this.props.area)}
                headings={[`${YEAR_COLUMN} ` + this.props.year, NUMBER_COLUMN, RATE_COLUMN]}
                toggleGroup={this.props.toggleGroup}
                collapsed={this.props.collapsed}
              />
            : null
          }
        </div>
      </div>
    );
  },

  mapCityTableData(data) {
    if (!data) {
      return [];
    }
    const mappedData = [];
    forEach(groupBy(data, 'demography'), (val, key) => {
      const slug = util.slugify(key);
      if (slug === RACE_ETHNICITY_SLUG || slug === MATERNAL_RACE_ETHNICITY_SLUG) {
        const cityRowIndex = val.findIndex(v => v.demo_group_name === ALL_RACE_GROUP_NAME);
        const cityRow = val.splice(cityRowIndex, 1);
        val.unshift(cityRow[0]);
      } else if (slug === ECONOMIC_HARDSHIP_SLUG) {
        const lowRowIndex = val.findIndex(v => v.demo_group_name === ECONOMIC_HARDSHIP_LOW);
        const lowRow = val.splice(lowRowIndex, 1);
        const mediumRowIndex = val.findIndex(v => v.demo_group_name === ECONOMIC_HARDSHIP_MEDIUM);
        const mediumRow = val.splice(mediumRowIndex, 1);
        const highRowIndex = val.findIndex(v => v.demo_group_name === ECONOMIC_HARDSHIP_HIGH);
        const highRow = val.splice(highRowIndex, 1);
        val.unshift(
          lowRow[0], mediumRow[0], highRow[0] 
        );
      } else if (slug === GRADE_SLUG) {
        const kindergartenIndex = val.findIndex(v => v.demo_group_name === GRADE_KINDERGARTEN);
        const KindergartenRow = val.splice(kindergartenIndex, 1);
        val.unshift(KindergartenRow[0]);
      }
      mappedData.push({
        name: key,
        id: slug,
        rows: val.map(v => {
          return {
            data: [
              v.demo_group_name === ALL_RACE_GROUP_NAME ? CITY_NAME : v.demo_group_name,
              v.weight_number ? v.weight_number.toLocaleString() : '—',
              !v.hide_rate_column_summary && (v.weight_percent || v.weight_percent === 0) ? `${v.weight_percent.toFixed(1)}` : '—'
            ],
            flag: v.flag
          };
        })
      });
    });

    const indicator = data[0] && data[0].indicator ? data[0].indicator.slug : null;
    return mappedData;
  },

  mapAreaTableData(data) {
    const mappedData = [];
    forEach(groupBy(data, 'geo_group_part'), (val, key) => {
      // zip codes don't have geo_group_part value
      if (key === 'null' || key === 'undefined') {
        mappedData.push({
          name: 'Zip codes',
          id: 'zip-codes',
          rows: val.map(v => {
            return {
              data: [
                v.geo_group_name.trim(),
                v.weight_number ? v.weight_number.toLocaleString() : '—',
                (v.weight_percent || v.weight_percent === 0) ? `${v.weight_percent.toFixed(1)}` : '—'
              ]
            };
          })
        });
      } else {
        mappedData.push({
          name: key,
          id: util.slugify(key),
          rows: val.map(v => {
            return {
              data: [
                v.geo_group_name.replace(/[0-9]|-/g, ' ').trim(),
                v.weight_number ? v.weight_number.toLocaleString() : '—',
                v.weight_percent ? `${v.weight_percent.toFixed(1)}` : '—'
              ],
              flag: v.flag
            };
          })
        });
      }
    });
    return mappedData.sort((a, b) => { return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0); });
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

  toggleYear(v) {
    this.props.changeYear(v);
    // const slug = this.props.params.name;
    // this.props.fetchCityData(slug, v);
    // this.props.fetchAreasData(slug, v);
  },

  filterMeasures(slug, measures) {
    const filtered = measures.filter((m) => m.indicator_slug === slug);
    if (filtered.length) {
      return filtered[0].measures;
    }
    return [];
  },

  renderMeasures(data) {
    if (!data.length) {
      return null;
    }
    return data.map((d, i) => {
      const isCollapsed = this.state.collapsedMeasures.includes(i);
      return (
        <div key={i} className="c-measure">
          <h4 className="c-measure__title">{d.title}</h4>
          <div className={classNames({ 'u-hidden': isCollapsed })}>
            <p className="c-measure__desc">{d.description}</p>
            <div>
              <span className="u-fw--bold">Source: </span>
              {
                d.url
                ? <a className="c-measure__source" href={d.url}>{d.source}</a>
                : <span className="c-measure__source">{d.source}</span>
              }
            </div>
          </div>
          <button
            className="no-print c-measure__button"
            onClick={(e) => this.setState({ collapsedMeasures: util.updateArray(this.state.collapsedMeasures, i) })}
          >
            { isCollapsed ? 'show more' : 'show less'}
          </button>
        </div>
      );
    });
  }

});

const mapStateToProps = (store) => {
  return {
    measure: store.data.measure,
    year: store.viewTopicDetails.selectedYear,
    tableSelected: store.viewTopicDetails.activeTable,
    city: store.viewTopicDetails.city,
    area: store.viewTopicDetails.area,
    collapsed: store.uiTable.collapsed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMeasures: (cache) => dispatch(fetch.measures(cache)),
    fetchCityData: (slug, year) => dispatch(fetch.topicCityData(slug, year)),
    fetchAreasData: (slug, year) => dispatch(fetch.topicAreaData(slug, year)),
    changeYear: (year) => dispatch(ui.changeYear(year)),
    toggleTable: (label) => dispatch(ui.toggleTable(label)),
    toggleGroup: (id) => dispatch(ui.toggleTableGroup(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicSummary);
