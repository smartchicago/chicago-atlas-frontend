import React from 'react';
import { connect } from 'react-redux';

import * as fetch from '../../actions/fetchActions';
import * as ui from '../../actions/uiActions';

import util from '../../utils';

import HospitalMeta from '../ui/HospitalMeta';
import Loader from '../ui/Loader';
import HospitalDetailsTables from '../ui/tables/HospitalDetailsTables';

const HospitalDetails = React.createClass({
  displayName: 'HospitalDetails',

  componentDidMount() {
    this.props.fetchHospitalDetails(this.props.params.name);
  },

  render() {
    const hasData = this.props.meta.name && this.props.meta.name.length;
    return (
      <div>
        {
          this.props.error &&
          <div className="c-placeholder">No Hospital Details Available</div>
        }
        <Loader
          loading={this.props.loading}
          minHeight={'15em'}
        >
          {
            !this.props.loading && !this.props.error && hasData &&
            <HospitalMeta
              {...this.props.meta}
              total_admissions={this.props.total_admissions}
              total_revenue={this.props.total_revenue}
              admissions={this.props.data.admissions_by_race}
              revenue={this.props.data.revenue_inpatient}
              hospital={this.props.data.hospital}
            />
          }
        </Loader>

        {
          !this.props.loading && !this.props.error && hasData &&
          <HospitalDetailsTables {...this.props} />
        }

      </div>
    );
  }

});

const mapStateToProps = (store) => {
  return {
    meta: { ...store.viewHospitalDetails.data.hospital },
    total_revenue: store.viewHospitalDetails.data.total_revenue,
    total_admissions: store.viewHospitalDetails.data.total_admissions,
    openPanels: store.viewHospitalDetails.openPanels,
    data: store.viewHospitalDetails.data,
    collapsed: store.uiTable.collapsed,
    loading: store.uiNetwork.hospitalDetailsLoading,
    error: store.uiNetwork.hospitalDetailsError
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    togglePanel: (id) => dispatch(ui.togglePanel(id)),
    toggleGroup: (id) => dispatch(ui.toggleTableGroup(id)),
    fetchHospitalDetails: (name) => dispatch(fetch.hospitalDetails(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HospitalDetails);
