import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import * as fetch from '../../actions/fetchActions';
import * as ui from '../../actions/uiActions';

import NavigationTab from '../ui/NavigationTab';
import Loader from '../ui/Loader';
import HospitalsListBox from '../ui/HospitalsList';
import HospitalsTypes from '../ui/HospitalsTypes';
import ResourceFilter from '../ui/resources/ResourceFilter';
import HospitalsMap from '../ui/maps/HospitalsMap';

import resourcesData from '../../constants/hospitalCategories';
import navSections from '../../constants/tabNavigation';

const HospitalsList = React.createClass({
  displayName: 'HospitalsList',

  componentDidMount() {
    if (isEmpty(this.props.areaSelect)) {
      this.props.fetchHospitalsList(this.props.hospitals);
    }
    this.props.fetchAllPlaces(this.props.places);
  },

  componentDidUpdate() {
    if (isEmpty(this.props.areaSelect) &&
      isEmpty(this.props.hospitals) &&
      !this.props.loading &&
      !this.props.error) {
      this.props.fetchHospitalsList(this.props.hospitals);
    }
  },

  render() {
    let listResourse = [];
    if (!this.props.error && !this.props.loading && this.props.mapSize._sw) {
      const { _sw: sw, _ne: ne } = this.props.mapSize;
      listResourse = this.chooseHospitals(this.props).map((place, i) => {
        if (!place.latitude) {
          const [lat, long] = place.lat_long.split(',');
          place.latitude = lat;
          place.longitude = long;
          place.l_t = place.lat_long.split(',');
        }
        if ((place.latitude > sw.lat && place.longitude > sw.lng) &&
          (place.latitude < ne.lat && place.longitude < ne.lng)) {
          return { ...place, newIndex: i + 1 };
        }
      }).filter((place) => place);
    } else {
      listResourse = this.chooseHospitals(this.props);
    }
    return (
      <div>
        <NavigationTab sections={navSections.resources} />
        {
          this.props.error &&
          <div className="c-placeholder">No Hospitals Available</div>
        }
        <Loader
          loading={this.props.loading}
          minHeight={'15em'}
        >
          {
            !this.props.error && !this.props.loading &&
            <div className="grid grid--from-medium categories-filter">
              <div className="grid__col">
                <ResourceFilter
                  places={this.props.places}
                  areaSelect={this.props.areaSelect}
                  handleSelect={this.handleSelect}
                />
              </div>
              <div className="grid__col">
                <HospitalsTypes
                  toggleCategory={this.props.toggleCategory}
                  categories={this.props.categories}
                  updateSelectedCategories={this.updateSelectedCategories}
                />
              </div>
            </div>
          }
          {
            !this.props.error && !this.props.loading &&
            <div className="layout--narrow">
              <div className="grid grid--gutters">
                <div className="grid__col grid__col--6">
                  <HospitalsMap
                    places={this.props.places}
                    filter={this.props.categories}
                    areaSelect={this.props.areaSelect}
                    newHospitalsMap={this.props.newHospitalsMap}
                    filteredResources={this.props.filteredResources}
                    hospitals={this.chooseHospitals(this.props)}
                    trimmResorcesByZone={this.props.updateZoneOnMapZoom}
                    hospitalsPointClicked={this.props.hospitalsPointClicked}
                    updateMap={this.props.updateMap}
                    updateOnZoom
                  />
                </div>
                <div className="grid__col grid__col--6">
                  <HospitalsListBox
                    hospitals={listResourse}
                    hospitalsPointToFocus={this.props.hospitalsPointToFocus}
                    onSelectedHospital={this.props.hospitalClicked}
                    categories={resourcesData}
                    filter={this.props.categories}
                  />
                </div>
              </div>
            </div>
          }
        </Loader>
      </div>

    );
  },

  chooseHospitals(props) {
    if (isEmpty(props.areaSelect)) {
      return props.hospitals;
    } else {
      return props.filteredHospitals;
    }
  },

  updateSelectedCategories(selected) {
    this.props.updateSelectCats(selected.map(cat => cat.value));
  },

  handleSelect(obj, id) {
    if (!obj) {
      this.props.updateAreaSelect('', id);
      return;
    }
    const values = obj.value.split('-');
    const value = id === 'zip-search' && values.length > 1 ? values[1] : obj.value;
    this.props.updateAreaSelect(obj.value, id);
    this.props.fetchAreaResources(value);
  }

});

const mapStateToProps = (store) => {
  return {
    hospitals: store.data.hospitalsList,
    places: store.data.placesList,
    categories: store.viewHospitalsList.categories,
    areaSelect: store.viewHospitalsList.areaSelect,
    hospitalsPointToFocus: store.viewResourcesList.hospitalsPointToFocus,
    filteredHospitals: store.viewHospitalsList.filteredHospitals,
    loading: store.uiNetwork.allHospitalsLoading,
    error: store.uiNetwork.allHospitalsError,
    mapSize: store.viewResourcesList.mapSize,
    updateMap: store.viewResourcesList.updateMap
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchHospitalsList: (list) => dispatch(fetch.allHospitals(list)),
    updateSelectCats: (values) => dispatch(ui.updateHospitalsAreaSelect(values)),
    toggleCategory: (id, toggleAll) => dispatch(ui.toggleHospitalCategory(id, toggleAll)),
    fetchAllPlaces: (placesList) => dispatch(fetch.allPlaces(placesList)),
    updateAreaSelect: (value, id) => dispatch(ui.updateHospitalsAreaSelect(value, id)),
    fetchAreaResources: (value) => dispatch(fetch.areaHospitals(value)),
    updateZoneOnMapZoom: (values) => dispatch(ui.updateZoneOnMapZoom(values)),
    hospitalsPointClicked: (id) => dispatch(ui.hospitalsPointClicked(id)),
    newHospitalsMap: (map) => dispatch(ui.newHospitalsMap(map)),
    hospitalClicked: (lat, long) => dispatch(ui.hospitalClicked(lat, long))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HospitalsList, HospitalsMap);
