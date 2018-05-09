import { connect } from 'react-redux';
import IndicatorsTable from '../ui/tables/IndicatorsTable';

import * as ui from '../../actions/uiActions';

const mapStateToProps = (store, ownProps) => {
  return {
    collapsed: store.uiTable.collapsed,
    datasetsExpanded: store.uiTable.datasetsExpanded,
    headings: store.data.indicatorsTable.headings,
    data: store.data.indicatorsTable.data
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleGroup: (id) => dispatch(ui.toggleTableGroup(id)),
    expandDataset: (id) => dispatch(ui.expandDataset(id))
  };
};

const IndicatorsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndicatorsTable);

export default IndicatorsTableContainer;
