import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import InteractiveMap from '../ui/maps/InteractiveMap';
import NavigationTab from '../ui/NavigationTab';
import CommunityAreasList from '../ui/CommunityAreasList';

import * as fetch from '../../actions/fetchActions';

import navSections from '../../constants/tabNavigation';

const CommunityAreas = React.createClass({
  displayName: 'CommunityAreas',

  componentDidMount() {
    this.props.fetchAllPlaces(this.props.places);
  },

  render() {
    return (
      <div className="community-areas">
        <div>
          <NavigationTab sections={navSections.areas} />
        </div>
        <h1 className="t-subtitle">Community Areas in Chicago</h1>
        <div className="grid grid--gutters grid--from-medium">
          <div className="grid__col">
            <div className="u-font--serif">
              <p>The conditions that we live in have deep impacts on health - from access to resources like parks and transportation to our home and neighborhood environments. Chicago is made up of 77 neighborhoods or community areas, with significant differences in health related indicators across these communities.</p>
              <p>Select a community area from the map or the list below to view data for that area.</p>
            </div>
            { !isEmpty(this.props.places) && <CommunityAreasList places={this.props.places} type="CommunityAreas" /> }
          </div>
          <div className="grid__col">
            {
              !this.props.error && !this.props.loading &&
              <InteractiveMap nameClass="intereactive-map" places={this.props.places} type="CommunityAreas" />
            }
          </div>
        </div>
        {
          this.props.error &&
          <div className="c-placeholder">No Community Areas Available</div>
        }
      </div>
    );
  }

});

const mapStateToProps = (store) => {
  return {
    places: store.data.placesList,
    loading: store.uiNetwork.allPlacesLoading,
    error: store.uiNetwork.allPlacesError
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllPlaces: (placesList) => dispatch(fetch.allPlaces(placesList))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityAreas, InteractiveMap);
