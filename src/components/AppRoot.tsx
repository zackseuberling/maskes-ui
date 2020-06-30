import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './home/Home';
import GetHelp from './get-help/GetHelp';
import Volunteer from './volunteer/Volunteer';

const AppRoot = () => (
  <div>
    <Navbar />
    <Switch>
      <Route path="/get-help" component={GetHelp}></Route>
      <Route path="/volunteer" component={Volunteer}></Route>
      <Route path="/" component={Home}></Route>
    </Switch>
  </div>
);

export default AppRoot;
