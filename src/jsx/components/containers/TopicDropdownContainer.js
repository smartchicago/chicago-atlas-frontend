import TopicDropdown from '../ui/TopicDropdown';
import { connect } from 'react-redux';

import * as ui from '../../actions/uiActions';

const mapStateToProps = (store, ownProps) => {
  return {
    inFocus: store.uiSearch.inFocus === ownProps.id || store.uiDropdown.dropdownInFocus === ownProps.id,
    topics: [ ...store.data.topicsList ],
    filter: store.uiSearch.value[ownProps.id] || '',
    expandedCategories: store.uiDropdown.expandedCategories,
    expandedSubCategories: store.uiDropdown.expandedSubCategories,
    searchInputEmpty: !store.uiSearch.value[ownProps.id] || !store.uiSearch.value[ownProps.id].length
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleCategory: (id) => dispatch(ui.toggleDropdownCategory(id, false)),
    toggleSubCategory: (id) => dispatch(ui.toggleDropdownCategory(id, true)),
    onFocus: (id) => dispatch(ui.toggleDropdownFocus(id, false)),
    onBlur: (id) => dispatch(ui.toggleDropdownFocus(id, true))
  };
};

const DropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicDropdown);

export default DropdownContainer;
