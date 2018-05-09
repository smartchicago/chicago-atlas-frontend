import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import classNames from 'classnames';

import TopicTrendsChart from '../charts/TopicTrendsChart';

import util from '../../../utils';

import * as fetch from '../../../actions/fetchActions';
import * as ui from '../../../actions/uiActions';

const TopicTrends = React.createClass({

  componentDidMount() {
    this.props.fetchTopicDemo(this.props.params.name, this.props.demography.value);
  },

  componentDidUpdate(prevProps) {
    if (prevProps.params.name !== this.props.params.name ||
      prevProps.demography !== this.props.demography) {
      this.props.fetchTopicDemo(this.props.params.name, this.props.demography.value);
    }
  },

  render() {
    return (
      <div className="topic--trends">
        <Select
          className="u-mb--small"
          name="tab-year-select"
          options={this.mapOptions(this.props.allDemo)}
          onChange={(v) => this.props.toggleDemo(v)}
          value={this.props.demography}
          clearable={false}
          searchable={false}
          disabled={this.props.allDemo.length <= 1}
        />
        <TopicTrendsChart
          demography={this.props.demography}
          demo={this.props.demo}
          demoName={this.props.params.name}
          all={this.props}
        />
      </div>
    );
  },

  mapOptions(data) {
    return data.map(d => {
      return {
        label: d.demography,
        value: d.slug
      };
    });
  }

});

const mapStateToProps = (store) => {
  return {
    demography: store.viewTopicDetails.selectedDemography,
    allDemo: store.viewTopicDetails.data.demography,
    demo: store.viewTopicDetails.demo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTopicDemo: (indicator, demo) => dispatch(fetch.topicDemoData(indicator, demo)),
    toggleDemo: (value) => dispatch(ui.toggleDemo(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicTrends, TopicTrendsChart);
