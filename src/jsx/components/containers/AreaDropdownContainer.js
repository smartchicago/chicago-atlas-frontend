import AreaDropdown from '../ui/AreaDropdown';
import { connect } from 'react-redux';

import * as ui from '../../actions/uiActions';

const mapStateToProps = (store, ownProps) => {

  return {
    inFocus: store.uiSearch.inFocus === ownProps.id || store.uiDropdown.dropdownInFocus === ownProps.id,
    data: store.data.placesList,
    filter: store.uiSearch.value[ownProps.id] || '',
    searchInputEmpty: !store.uiSearch.value[ownProps.id] || !store.uiSearch.value[ownProps.id].length,
    expandedCategories: store.uiDropdown.expandedCategories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleCategory: (name) => dispatch(ui.toggleDropdownCategory(name, false)),
    onFocus: (id) => dispatch(ui.toggleDropdownFocus(id, false)),
    onBlur: (id) => dispatch(ui.toggleDropdownFocus(id, true))
  };
};

const DropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaDropdown);

export default DropdownContainer;
