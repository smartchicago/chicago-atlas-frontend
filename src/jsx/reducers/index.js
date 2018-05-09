import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// reducers for handling UI state
import uiDropdown from './ui.dropdown';
import uiHeader from './ui.header';
import uiSearch from './ui.search';
import uiSidebarNav from './ui.sidebarNav';
import uiTable from './ui.table';
import uiTabs from './ui.tabs';
import uiNavigationList from './ui.navigationList';

// reducer for handling all UI states depending on network responses
import uiNetwork from './ui.network';

// reducers for handling whole views (data + UI)
import viewAreaDetails from './view.area';
import viewHospitalsList from './view.hospitals';
import viewHospitalDetails from './view.hospital';
import viewResourcesList from './view.resources';
import viewTopicDetails from './view.topic';

// reducer for handling majority of data
import data from './data';

export default combineReducers({
  uiDropdown,
  uiHeader,
  uiTable,
  uiSearch,
  uiSidebarNav,
  uiTabs,
  uiNavigationList,
  uiNetwork,
  viewAreaDetails,
  viewHospitalsList,
  viewHospitalDetails,
  viewResourcesList,
  viewTopicDetails,
  data,
  routing: routerReducer
});
