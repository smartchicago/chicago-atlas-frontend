import React from 'react';
import { connect } from 'react-redux';

import * as fetch from '../../actions/fetchActions';
import * as ui from '../../actions/uiActions';

import SidebarNavContainer from '../containers/SidebarNavContainer';

import Tabs from '../ui/Tabs';
import SaveWidget from '../ui/SaveWidget';

import util from '../../utils';

import TopicSummary from '../ui/topic-tabs/TopicSummary';
import TopicDisparities from '../ui/topic-tabs/TopicDisparities';
import TopicTrends from '../ui/topic-tabs/TopicTrends';
import TopicMap from '../ui/topic-tabs/TopicMap';
import TopicDetailsMeta from '../ui/TopicDetailsMeta';

import { browserHistory } from 'react-router';

const TopicDetails = React.createClass({
  displayName: 'TopicDetails',

  componentDidMount() {

    if (this.props.error) {
      browserHistory.push('/404');
      return;
    }

    this.props.fetchAllPlaces(this.props.places);
    this.props.fetchIndicatorData();
    // When we have list of all topics and details on current page,
    // we can get initial position for sidebar nav
    Promise.all([
      this.props.fetchTopicDetails(this.props.params.name),
      this.props.fetchAllTopics(this.props.topics)
    ])
    .then(() => {
      const name = this.props.topic.data.name;
      this.props.initialPosition(util.mapCurrentCategory(util.filterTopicsList(this.props.topics, name), 'topic'));
    });
  },

  componentDidUpdate(prevProps) {
    if (this.props.error) {
      browserHistory.push('/404');
      return;
    }

    if (prevProps.params.name !== this.props.params.name) {
      Promise.all([
        this.props.fetchTopicDetails(this.props.params.name)
      ])
      .then(() => {
        const name = this.props.topic.data.name;
        this.props.initialPosition(util.mapCurrentCategory(util.filterTopicsList(this.props.topics, name), 'topic'));
      });
    }
  },

  render() {
    const indicatorData = this.isHealthyChicagoIndicator(this.props.params.name);

    return (
      <div className="main-layout__sidebar-wrapper">

        <SidebarNavContainer
          name={this.props.topic.length ? this.props.topic.data.name : null}
        />

        <div className="main-layout__center main-layout__inner print-section" id="topic-details">
          <TopicDetailsMeta
            indicatorData={indicatorData}
            city={this.props.city}
            topic={this.props.topic}
          />
          {
            this.props.topic.data &&
            <Tabs
              toggleTab={this.props.toggleTab}
              activeTab={this.props.activeTabIndex}
              data={[
                {
                  label: 'Summary',
                  component: TopicSummary,
                  props: this.props
                },
                {
                  label: 'Disparities',
                  component: TopicDisparities,
                  props: this.props,
                  disabled: !this.props.city || !this.props.city.length
                },
                {
                  label: 'Trends over time',
                  component: TopicTrends,
                  props: this.props,
                  disabled: !this.props.topic.data.demography || !this.props.topic.data.demography.length
                },
                {
                  label: 'Map',
                  component: TopicMap,
                  props: this.props,
                  // disabled: !this.props.area || !this.props.area.length || !this.props.city || !this.props.city.length
                }
              ]}
            />
          }
        </div>
      </div>
    );
  },

  isHealthyChicagoIndicator(slug) {
    if (!this.props.indicatorsData) {
      return null;
    }
    const indicators = this.props.indicatorsData.reduce((accumulated, value) => {
      return accumulated.concat(value.rows);
    }, []);
    return indicators.find((obj) => obj.indicator_slug === slug);
  },

});

const mapStateToProps = (store) => {
  return {
    topics: store.data.topicsList,
    places: store.data.placesList,
    topic: store.viewTopicDetails,
    activeTabIndex: store.uiTabs.active,
    indicatorsData: store.data.indicatorsTable.data,
    area: store.viewTopicDetails.area,
    city: store.viewTopicDetails.city,
    error: store.viewTopicDetails.error,
    loading: store.viewTopicDetails.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTopicDetails: (id) => dispatch(fetch.topicDetails(id)),
    fetchAllPlaces: (placesList) => dispatch(fetch.allPlaces(placesList)),
    fetchAllTopics: (topicsList) => dispatch(fetch.allTopics(topicsList)),
    initialPosition: (openCategories) => dispatch(ui.initialSidebarPosition(openCategories)),
    toggleTab: (index) => dispatch(ui.toggleTab(index)),
    fetchIndicatorData: () => dispatch(fetch.tableData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicDetails);
