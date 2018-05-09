import Search from '../ui/Search';
import { connect } from 'react-redux';

import * as ui from '../../actions/uiActions';

const mapStateToProps = (store, ownProps) => {
  return {
    text: store.uiSearch.value[ownProps.id] || '',
    inFocus: store.uiSearch.inFocus === ownProps.id || store.uiDropdown.dropdownInFocus === ownProps.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTextChange: (text, id) => dispatch(ui.updateSearchValue(text, id)),
    onFocus: (id) => dispatch(ui.toggleSearchFocus(id)),
    onBlur: (id) => dispatch(ui.toggleSearchFocus(id)),
    clearSearch: (id) => dispatch(ui.clearSearchValue(id))
  };
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;
