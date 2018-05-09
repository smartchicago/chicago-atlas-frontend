import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Main app layout
import Layout from './components/Layout';

// views
import Home from './components/views/Home';
import HealthyChicago from './components/views/HealthyChicago';
import About from './components/views/About';
import CommunityAreas from './components/views/CommunityAreas';
import ZipCodes from './components/views/ZipCodes';
import AreaDetails from './components/views/AreaDetails';
import Topics from './components/views/Topics';
import TopicDetails from './components/views/TopicDetails';
import Resources from './components/views/Resources';
import Hospitals from './components/views/Hospitals';
import HospitalDetails from './components/views/HospitalDetails';

import View404 from './components/views/View404';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />

    <Route path="healthy-chicago" component={HealthyChicago} />

    <Route path="about" component={About} />

    <Route path="community-areas">
      <IndexRoute component={CommunityAreas} />
      <Route path=":name" component={AreaDetails} />
    </Route>

    <Route path="zip-codes">
      <IndexRoute component={ZipCodes} />
      <Route path=":name" component={AreaDetails} />
    </Route>

    <Route path="indicators">
      <IndexRoute component={Topics} />
      <Route path=":name" component={TopicDetails} />
    </Route>

    <Route path="resources" component={Resources} />

    <Route path="hospitals">
      <IndexRoute component={Hospitals} />
      <Route path=":name" component={HospitalDetails} />
    </Route>

    <Route path="*" component={View404} />

  </Route>
);
