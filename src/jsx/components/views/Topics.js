import React from 'react';
import { connect } from 'react-redux';

import TopicsListContainer from '../containers/TopicsListContainer';
import SearchContainer from '../containers/SearchContainer';
import Loader from '../ui/Loader';

import * as fetch from '../../actions/fetchActions';

const Topics = React.createClass({
  displayName: 'TopicsList',

  componentDidMount() {
    this.props.fetchAllTopics(this.props.topics);
  },

  render() {
    return (
      <div>
        <h1 className="t-main-title">Indicators</h1>
        <div className="layout--narrow">
          <div className="grid grid--gutters">
            <div className="grid__col">
              <div className="u-font--serif">
                <p>Health is about more than physical well-being. Health is determined by social and economic factors, the environment we live in, our behaviors, as well as health care quality and access. You can use the Chicago Health Atlas to explore these topics by age, gender, race-ethnicity and economic hardship. You can also see trends over time and even map the data to see differences across communities.</p>
                <p>A complete list of available indicators is organized by topic and subcategory below. Quickly find a specific indicator by entering keywords in the search bar to the right.</p>
              </div>
            </div>
            <div className="grid__col">
              <div>
                <SearchContainer
                  id="topic-list-search"
                  placeholder="E.g: Vaccinations or Demographics"
                  label="Indicator search"
                  className="c-form-input--inset"
                  dropdown={false}
                />
              </div>
            </div>
          </div>
          {
            this.props.error &&
            <div className="c-placeholder">No Indicators Available</div>
          }
          <Loader
            loading={this.props.loading}
            minHeight={'10em'}
          >
            {
              !this.props.error && !this.props.loading &&
              <TopicsListContainer id="topic-list-search" />
            }
          </Loader>
        </div>
      </div>
    );
  }
});

const mapStateToProps = (store, ownProps) => {
  return {
    topics: store.data.topicsList,
    loading: store.uiNetwork.allTopicsLoading,
    error: store.uiNetwork.allTopicsError
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllTopics: (topicsList) => dispatch(fetch.allTopics(topicsList))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topics);
