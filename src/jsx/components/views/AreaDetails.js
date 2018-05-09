import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import SidebarNavContainer from '../containers/SidebarNavContainer';
import Panel from '../ui/Panel';
import CommunityAreaTable from '../ui/tables/CommunityAreaTable';
import Loader from '../ui/Loader';
import AreaDetailsMeta from '../ui/AreaDetailsMeta';
import SaveWidget from '../ui/SaveWidget';
import AreaDetailsInfographics from '../ui/AreaDetailsInfographics';
import AreaDetailsMap from '../ui/maps/AreaDetailsMap';

import {
  MAP_KEY,
  CITY_NAME,
  YEAR_COLUMN,
  INDICATOR_COLUMN,
  NO_DATA_AVAILABLE,
  EMPTY_TABLE_COLUMN
} from '../../constants/specialNames';

import util from '../../utils';
import parser from '../../utils/parsers';

import * as fetch from '../../actions/fetchActions';
import * as ui from '../../actions/uiActions';

const AreaDetails = React.createClass({
  displayName: 'AreaDetails',

  componentDidMount() {

    if (this.props.error) {
      browserHistory.push('/404');
      return;
    }

    this.props.fetchDemography(this.props.params.name);

    // fetch mock data
    this.props.fetchRace(this.props.params.name);
    this.props.fetchEconomicHardship();
    this.props.fetchCOI();

    this.props.fetchAllTopics(this.props.topics);
    // When we have list of all topics and details on current page,
    // we can get initial position for sidebar nav
    Promise.all([
      this.props.fetchAllPlaces(this.props.places),
      this.props.fetchData(this.props.params.name)
    ])
    .then(() => {
      const name = this.props.area.data.geography.name;
      const placesMapped = util.mapAreas(this.props.places);
      this.props.initialPosition(util.mapCurrentCategory(util.filterAreasList(placesMapped, name), 'areas'));
    });

  },

  componentDidUpdate(prevProps) {

    if (this.props.error) {
      browserHistory.push('/404');
      return;
    }

    if (prevProps.params.name !== this.props.params.name) {
      Promise.all([
        this.props.fetchDemography(this.props.params.name),
        this.props.fetchData(this.props.params.name),
        this.props.fetchRace(this.props.params.name)
      ])
      .then(() => {
        const name = this.props.area.data.geography.name;
        const placesMapped = util.mapAreas(this.props.places);
        this.props.initialPosition(util.mapCurrentCategory(util.filterAreasList(placesMapped, name), 'areas'));
      });
    }
  },

  render() {
    const data = this.props.area.data;
    const isLoading = (this.props.dataLoading || this.props.demoLoading) && !this.props.error;
    const economicHardship = parser.getDataFromMock(this.props.economicHardship, this.props.params.name, 'value');
    const coi = parser.getDataFromMock(this.props.coi, this.props.params.name, 'value');
    const race = parser.getDataFromMock(this.props.race, this.props.params.name, 'races');

    return (
      <div className="main-layout__sidebar-wrapper">
        <SidebarNavContainer
          name={data && data.geography && data.geography.name}
        />
        <div className="main-layout__center main-layout__inner">
          <Loader
            loading={isLoading}
            minHeight={'10em'}
          >
            {
              !isLoading &&
              <div>
                <div id="area-details" className="c-area-meta print-section">

                  <div className="c-area-meta__header">
                    <AreaDetailsMap data={data} />
                    <AreaDetailsMeta
                      data={data}
                      goToAbout={this.goToAbout}
                      goToResources={this.goToResources}
                      goToHospitals={this.goToHospitals}
                    />
                  </div>

                  {
                    data.geography.geo_type !== 'Zip' &&
                    <AreaDetailsInfographics
                      coi={coi}
                      data={data}
                      race={race}
                      economicHardship={economicHardship}
                      demo={this.props.area.demo}
                    />
                  }

                </div>

                <div className="print-section u-mt--medium" id="area-tables">
                  {
                    data.geography.geo_type !== 'Zip'
                    ? <h2 className="t-subtitle">Community Area Data</h2>
                    : <h2 className="t-subtitle">Zip Code Data</h2>
                  }
                  {this.buildPanels(this.props)}
                </div>
              </div>
            }
          </Loader>
        </div>
      </div>
    );
  },

  goToAbout() {
    browserHistory.push('/about');
  },

  goToResources() {
    this.handleSelect(false);
    browserHistory.push('/resources');
  },

  goToHospitals() {
    this.handleSelect(true);
    browserHistory.push('/hospitals');
  },

  handleSelect(hospital) {
    let id;
    if (this.props.area.data.geography.geo_type === 'Zip') {
      id = 'zip-search';
    } else {
      id = 'area-search';
    }
    if (hospital) {
      this.props.updateAreaSelectForHospitals(this.props.params.name, id);
      this.props.fetchHospitalResources(this.props.params.name);
    } else {
      this.props.updateAreaSelectForResources(this.props.params.name, id);
      this.props.fetchAreaResources(this.props.params.name, id, this.props.places);
    }
  },

  buildPanels(props) {
    const data = props.area.data.categories;
    if (!data) {
      return null;
    }
    return data.map((panel, i) => {
      const tableData = this.props.tableData[panel.slug];
      const mappedTableData = tableData && this.mapTableData(tableData);
      return (
        <Panel
          key={i}
          id={panel.slug}
          title={panel.name}
          controls={true}
          openPanels={this.props.openPanels}
          togglePanel={(id) => this.handlePanelToggle(id)}
          handlePrint={this.handlePrint}
        >
          <Loader
            loading={!tableData}
            minHeight={'5em'}
            iconSize={'2em'}
          >
            { mappedTableData && mappedTableData.length
              ? <CommunityAreaTable
                className="u-mb--none"
                collapsed={this.props.collapsed}
                toggleGroup={this.props.toggleGroup}
                data={mappedTableData}
                headings={[INDICATOR_COLUMN, props.area.data.geography.name, CITY_NAME, YEAR_COLUMN]}
              /> : <div className="c-placeholder">{NO_DATA_AVAILABLE}</div>
            }
          </Loader>
        </Panel>
      );
    });
  },

  handlePrint(section) {
    const details = document.getElementById('area-details');
    const tables = document.getElementById('area-tables');
    details.classList.add('no-print');
    tables.classList.add('is-printable');

    this.handlePrintPanelToggle(section, () => {
      const sectionEl = document.getElementById(section);
      sectionEl.classList.add('is-printable');
      window.print();
      // reset after print
      details.classList.remove('no-print');
      tables.classList.remove('is-printable');
      sectionEl.classList.remove('is-printable');
    });
  },

  handlePrintPanelToggle(id, cb) {

    if (!this.props.openPanels.includes(id)) {
      this.props.togglePanel(id);

      this.props.fetchTableData(id, this.props.params.name)
        .then(() => { return cb(); });

    } else {
      cb();
    }

  },

  handlePanelToggle(id) {
    this.props.togglePanel(id);
    // panel is getting opened
    if (!this.props.openPanels.includes(id)) {
      this.props.fetchTableData(id, this.props.params.name);
    }
  },

  getValue(obj, key1, key2) {
    if (!obj[key1]) {
      return EMPTY_TABLE_COLUMN;
    } else if (!obj[key1][key2]) {
      return EMPTY_TABLE_COLUMN;
    }
    return obj[key1][key2].toLocaleString();
  },

  getRawValue(obj, key1, key2) {
    if (!obj[key1]) {
      return EMPTY_TABLE_COLUMN;
    } else if (!obj[key1][key2]) {
      return EMPTY_TABLE_COLUMN;
    }
    return obj[key1][key2];
  },

  mapRows(data) {
    data = data.filter((ind) => {
      return this.getValue(ind, 'area_value', MAP_KEY) !== EMPTY_TABLE_COLUMN;
    });

    return data.map((ind, i) => {
      const configObject = util.findConfigObject(ind.slug, 'map');
      const {symbol} = configObject;
      const areaValue = this.getValue(ind, 'area_value', MAP_KEY);
      const cityValue = this.getValue(ind, 'city_value', MAP_KEY);
      const yearFrom = this.getRawValue(ind, 'area_value', 'year_from');
      const yearTo = this.getRawValue(ind, 'area_value', 'year_to');
      return {
        slug: ind.slug,
        cells: [
          ind.name,
          areaValue === EMPTY_TABLE_COLUMN ? EMPTY_TABLE_COLUMN : `${areaValue} ${symbol}`,
          cityValue === EMPTY_TABLE_COLUMN ? EMPTY_TABLE_COLUMN : `${cityValue} ${symbol}`,
          yearFrom === yearTo ? yearFrom : `${yearFrom}-${yearTo}`,
        ]
      };
    });
  },

  mapTableData(data) {
    // @TODO: fix API to return only sub_categories array
    data = data[0].sub_categories.filter((group, i) => {
      return this.mapRows(group.indicators).length;
    });
    return data.map((group, i) => {
      return {
        name: group.name,
        id: group.id,
        rows: this.mapRows(group.indicators)
      };
    });
  }

});

const mapStateToProps = (store, ownProps) => {
  return {
    dataLoading: store.viewAreaDetails.dataLoading,
    demoLoading: store.viewAreaDetails.demoLoading,
    topics: store.data.topicsList,
    places: store.data.placesList,
    race: store.viewAreaDetails.race,
    economicHardship: store.viewAreaDetails.economicHardship,
    coi: store.viewAreaDetails.coi,
    area: store.viewAreaDetails,
    openPanels: store.viewHospitalDetails.openPanels,
    tableData: store.viewAreaDetails.tables,
    collapsed: store.uiTable.collapsed,
    error: store.viewAreaDetails.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: (name) => dispatch(fetch.areaDetails(name)),
    fetchDemography: (name) => dispatch(fetch.areaDemography(name)),
    fetchAllPlaces: (placesList) => dispatch(fetch.allPlaces(placesList)),
    fetchAllTopics: (topicsList) => dispatch(fetch.allTopics(topicsList)),
    initialPosition: (openCategories) => dispatch(ui.initialSidebarPosition(openCategories)),
    updateAreaSelectForResources: (value, id) => dispatch(ui.updateResourcesAreaSelect(value, id)),
    updateAreaSelectForHospitals: (value, id) => dispatch(ui.updateHospitalsAreaSelect(value, id)),
    fetchAreaResources: (value, id, places) => dispatch(fetch.areaResources(value, id, places)),
    fetchHospitalResources: (value) => dispatch(fetch.areaHospitals(value)),
    togglePanel: (id) => dispatch(ui.togglePanel(id)),
    fetchTableData: (categoryId, areaSlug) => dispatch(fetch.areaTableData(categoryId, areaSlug)),
    toggleGroup: (id) => dispatch(ui.toggleTableGroup(id)),
    fetchRace: (areaSlug) => dispatch(fetch.areaRace(areaSlug)),
    fetchEconomicHardship: () => dispatch(fetch.areaEconomicHardship()),
    fetchCOI: () => dispatch(fetch.areaCOI())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaDetails);
