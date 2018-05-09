import React from 'react';
import { connect } from 'react-redux';

import staticContent from '../../../data/healthy-chicago.md';

import IndicatorsTableContainer from '../containers/IndicatorsTableContainer';

import * as fetch from '../../actions/fetchActions';

const HealthyChicago = React.createClass({
  displayName: 'HealthyChicago',

  componentDidMount() {
    this.props.fetchData(this.props.data);
  },

  render() {
    return (
      <div>
        <div className="t-columns u-mb--xlarge layout--narrow u-font--serif"
          dangerouslySetInnerHTML={{ __html: staticContent }} />

        <h2 className="t-subtitle">Healthy Chicago 2.0 Indicators</h2>

        <div className="table--responsive-medium">
          <IndicatorsTableContainer
            className="u-mb--xlarge c-table--indicators"
          />
        </div>
      </div>
    );
  }

});

const mapStateToProps = (store) => {
  return {
    data: store.data.indicatorsTable
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: (cache) => dispatch(fetch.tableData(cache))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HealthyChicago);
