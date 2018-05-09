import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import InteractiveMap from '../ui/maps/InteractiveMap';
import NavigationTab from '../ui/NavigationTab';
import CommunityAreasList from '../ui/CommunityAreasList';

import * as fetch from '../../actions/fetchActions';

import navSections from '../../constants/tabNavigation';

const ZipCodes = React.createClass({
  displayName: 'ZipCodes',

  componentDidMount() {
    this.props.fetchAllPlaces(this.props.places);
  },

  render() {
    return (
      <div className="community-areas">
        <div>
          <NavigationTab sections={navSections.areas} />
        </div>
        <h1 className="t-subtitle">Zip Codes</h1>
        <div className="grid grid--gutters grid--from-medium">
          <div className="grid__col">
            <div className="u-font--serif">
              <p>For most of the Chicago Health Atlas indicators, data is available citywide or for community areas. For data related to hospitalizations and emergency department (ED) visits, we only have information at the zip code level.</p>
              <p>Select a zip code from the map or the list below to view data for that area. If you don&#39;t see the data that you are looking for here, try searching by Topic or Community Area.</p>
            </div>
            { !isEmpty(this.props.places) && <CommunityAreasList places={this.props.places} type="ZipCodes" /> }
          </div>
          <div className="grid__col">
            {
              !this.props.error && !this.props.loading &&
              <InteractiveMap nameClass="intereactive-map" places={this.props.places} type="ZipCodes" />
            }
          </div>
        </div>
        {
          this.props.error &&
          <div className="c-placeholder">No Zip Codes Available</div>
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
)(ZipCodes, InteractiveMap);
