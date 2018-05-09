import Header from '../ui/Header';
import { connect } from 'react-redux';

import * as ui from '../../actions/uiActions';

const mapStateToProps = (store) => {
  return {
    collapsed: store.uiHeader.collapsed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleMenu: () => dispatch(ui.toggleMenu()),
    closeMenu: () => dispatch(ui.closeMenu())
  };
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
