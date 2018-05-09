import { connect } from 'react-redux';
import TopicList from '../ui/TopicList';

import * as ui from '../../actions/uiActions';

import util from '../../utils';

const mapStateToProps = (store, ownProps) => {
  const data = util.filterTopicsList(store.data.topicsList, store.uiSearch.value[ownProps.id] || '');
  return {
    data: data || [],
    collapsed: store.uiNavigationList.collapsed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleGroup: (id) => dispatch(ui.toggleNavListGroup(id))
  };
};

const TopicsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicList);

export default TopicsListContainer;
