import SidebarNav from '../ui/SidebarNav';
import { connect } from 'react-redux';

import util from '../../utils';

import * as ui from '../../actions/uiActions';

const mapStateToProps = (store, ownProps) => {
  const places = util.mapAreas(store.data.placesList);
  return {
    topics: store.data.topicsList,
    places: places,
    navOpen: store.uiSidebarNav.isOpen,
    name: ownProps.name,
    filter: store.uiSearch.value['sidebar-search'] || '',
    openCategories: store.uiSidebarNav.openCategories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleNav: () => dispatch(ui.toggleSidebarNav()),
    toggleCategory: (name, key) => dispatch(ui.toggleSidebarCategory(name, key)),
    toggleTab: (index) => dispatch(ui.toggleTab(index))
  };
};

const SidebarNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarNav);

export default SidebarNavContainer;
