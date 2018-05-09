import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import * as fetch from '../../actions/fetchActions';
import * as ui from '../../actions/uiActions';

import NavigationTab from '../ui/NavigationTab';
import Loader from '../ui/Loader';
import ResourcesListBox from '../ui/resources/ResourcesList';
import ResourceCategories from '../ui/resources/ResourceCategories';
import ResourceFilter from '../ui/resources/ResourceFilter';
import ResourcesMap from '../ui/maps/ResourcesMap';

import resourcesData from '../../constants/resourceCategories';
import navSections from '../../constants/tabNavigation';
import { DEFAULT_COMMUNITY_AREA_RESOURCES_SLUG } from '../../constants/specialNames';

const ResourcesList = React.createClass({
  displayName: 'ResourcesList',

  componentDidMount() {
    if (isEmpty(this.props.areaSelect)) {
      this.props.updateAreaSelect(DEFAULT_COMMUNITY_AREA_RESOURCES_SLUG, 'area-search');
      this.props.fetchAreaResources(DEFAULT_COMMUNITY_AREA_RESOURCES_SLUG, 'area-search', this.props.places);
    }
    this.props.fetchAllPlaces(this.props.places);
  },

  componentDidUpdate() {
    if (isEmpty(this.props.areaSelect) &&
      isEmpty(this.props.resources) &&
      !this.props.loading &&
      !this.props.error) {
      this.props.fetchResources(this.props.resources);
    }
  },

  render() {
    let listResourse = [];
    if (!this.props.error && !this.props.loading && this.props.mapSize._sw) {
      const { _sw: sw, _ne: ne } = this.props.mapSize;
      listResourse = this.chooseResources(this.props).map((place) => {
        if ((place.latitude > sw.lat && place.longitude > sw.lng) &&
          (place.latitude < ne.lat && place.longitude < ne.lng)) {
          return place;
        }
      }).filter((place) => place);
    } else {
      listResourse = this.chooseResources(this.props);
    }
    return (
      <div>
        <NavigationTab sections={navSections.resources} />
        {
          this.props.error &&
          <div className="c-placeholder">No Resources Available</div>
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
                <ResourceCategories
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
                  <ResourcesMap
                    places={this.props.places}
                    resources={this.chooseResources(this.props)}
                    filter={this.props.categories}
                    areaSelect={this.props.areaSelect}
                    newResourcesMap={this.props.newResourcesMap}
                    filteredResources={this.props.filteredResources}
                    fetchAreaResources={this.props.fetchAreaResources}
                    trimmResorcesByZone={this.props.updateZoneOnMapZoom}
                    resourcesPointClicked={this.props.resourcesPointClicked}
                    updateMap={this.props.updateMap}
                    updateOnZoom={this.props.suscribeToZoom}
                  />
                </div>
                <div className="grid__col grid__col--6">
                  <ResourcesListBox
                    resources={listResourse}
                    resourcesPointToFocus={this.props.resourcesPointToFocus}
                    onSelectedResource={this.props.resourceClicked}
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

  chooseResources(props) {
    if (isEmpty(props.areaSelect)) {
      return props.resources;
    } else {
      return props.filteredResources;
    }
  },

  handleSelect(obj, id, places) {
    if (!obj) {
      this.props.updateAreaSelect('', id);
      return;
    }
    const values = obj.value.split('-');
    const value = id === 'zip-search' && values.length > 1 ? values[1] : obj.value;
    this.props.updateAreaSelect(obj.value, id);
    this.props.fetchAreaResources(value, id, places);
  },

  updateSelectedCategories(selected) {
    this.props.updateSelectCats(selected.map(cat => cat.value));
  }

});

const mapStateToProps = (store, ownProps) => {
  return {
    resources: store.data.resourcesList,
    places: store.data.placesList,
    categories: store.viewResourcesList.categories,
    areaSelect: store.viewResourcesList.areaSelect,
    resourcesPointToFocus: store.viewResourcesList.resourcesPointToFocus,
    filteredResources: store.viewResourcesList.filteredResources,
    loading: store.uiNetwork.allResourcesLoading || store.viewResourcesList.resourcesLoading,
    error: store.uiNetwork.allResourcesError,
    mapSize: store.viewResourcesList.mapSize,
    suscribeToZoom: store.viewResourcesList.suscribeToZoom,
    updateMap: store.viewResourcesList.updateMap
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchResources: (list) => dispatch(fetch.allResources(list)),
    toggleCategory: (id, toggleAll) => dispatch(ui.toggleResourcesCategory(id, toggleAll)),
    fetchAllPlaces: (placesList) => dispatch(fetch.allPlaces(placesList)),
    updateAreaSelect: (value, id) => dispatch(ui.updateResourcesAreaSelect(value, id)),
    fetchAreaResources: (value, id, places) => dispatch(fetch.areaResources(value, id, places)),
    updateSelectCats: (values) => dispatch(ui.updateSelectedResourceCats(values)),
    updateZoneOnMapZoom: (values) => dispatch(ui.updateZoneOnMapZoom(values)),
    resourcesPointClicked: (id) => dispatch(ui.resourcesPointClicked(id)),
    newResourcesMap: (map) => dispatch(ui.newResourcesMap(map)),
    resourceClicked: (lat, long) => dispatch(ui.resourceClicked(lat, long))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcesList, ResourcesMap);
