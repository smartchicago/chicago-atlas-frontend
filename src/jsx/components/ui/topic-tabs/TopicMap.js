import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Select from 'react-select';

import TopicInteractiveMap from '../../ui/maps/TopicInteractiveMap';

import * as fetch from '../../../actions/fetchActions';
import * as ui from '../../../actions/uiActions';

import { NO_DATA_AVAILABLE } from '../../../constants/specialNames';

const TopicTrends = React.createClass({
  componentDidMount() {
    const slug = this.props.params.name;

    this.props.fetchAreasData(slug, this.props.mapYear);
    this.props.changeMapYear(this.props.mapYear);
    this.props.changeMapSlug(slug);
  },

  componentDidUpdate(prevProps) {
    if (prevProps.params.name !== this.props.params.name ||
      prevProps.mapYear !== this.props.mapYear) {
      const slug = this.props.params.name;
      const year = this.props.mapYear;
      this.props.fetchAreasData(slug, year);
    }
  },

  render() {
    if (!this.props.topic.data.yearsForMap.length) {
      return <div className="c-placeholder">{NO_DATA_AVAILABLE}</div>;
    }

    return (
      <div className="v-topic">
        <div className="v-topic__sidebar">
          <div className="u-mb--medium">
            <label>Year</label>

            <Select
              name="tab-year-select"
              options={this.props.topic.data && this.mapOptions(this.props.topic.data.yearsForMap)}
              onChange={(v) => this.props.changeMapYear(v.value)}
              value={this.props.mapYear}
              clearable={false}
              searchable={false}
              disabled={this.props.topic.data.yearsForMap.length <= 1}
            />
          </div>
        </div>
        <div className="v-topic__content">
          {
            !this.props.error && !this.props.loading &&
            <TopicInteractiveMap
              nameClass="intereactive-map"
              places={this.props.places}
              area={this.props.area}
              topicSlug={this.props.topic.data.slug}
              year={this.props.mapYear}
              mapStops={this.getStopsForYear(this.props.topic.data.mapStops, this.props.mapYear)}
            />
          }
        </div>
      </div>
    );
  },

  getStopsForYear(mapStops, year) {

    let resultDefault;

    const filteredByYear = mapStops
      .filter(stop => stop.year === String(year));

    if (!filteredByYear.length) {
      resultDefault = mapStops
        .filter(stop => stop.year === 'default');
    }

    return resultDefault || filteredByYear;
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
    this.props.changeMapYear(v);
    const slug = this.props.params.name;
    this.props.fetchAreasData(slug, v);
  },

});

const mapStateToProps = (store) => {
  return {
    mapYear: store.viewTopicDetails.selectedMapYear,
    slug: store.viewTopicDetails.selectedMapSlug,
    area: store.viewTopicDetails.area
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeMapYear: (year) => dispatch(ui.changeMapYear(year)),
    changeMapSlug: (slug) => dispatch(ui.changeMapSlug(slug)),
    fetchAllPlaces: (placesList) => dispatch(fetch.allPlaces(placesList)),
    fetchAreasData: (slug, year) => dispatch(fetch.topicAreaData(slug, year))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicTrends);
