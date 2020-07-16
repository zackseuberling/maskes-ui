import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Logout from './components/Auth/Logout';

import Home from './containers/Home/Home';
import GetHelp from './containers/GetHelp/GetHelp';
import Volunteer from './containers/Volunteer/Volunteer';

import CreateRequest from './components/Request/CreateRequest/CreateRequest';
import RequestDetail from './containers/Requests/RequestDetail/RequestDetail';
import RequestList from './containers/Requests/RequestList/RequestList';

import VolunteerList from './containers/Volunteer/VolunteerList/VolunteerList';
import VolunteerDetail from './containers/Volunteer/VolunteerDetail/VolunteerDetail';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { withRouter } from 'react-router';
import * as navManager from './components/Navbar/nav-manager';
import { authCheckLoginState } from './components/Auth/store/actions/actions';

const App = ({ component, authCheckLoginState, is_requester, is_volunteer }) => {
  useEffect(() => {
    authCheckLoginState()
  })
  const requester_routes = (
    <Switch>
      <ProtectedRoute exact path='/my-requests' component={RequestList} />
      <ProtectedRoute exact path='/my-requests/create-request' component={CreateRequest} />
      <ProtectedRoute exact path='/my-requests/:requestId' component={RequestDetail} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  );
  const volunteer_routes = (
    <Switch>
      <ProtectedRoute exact path='/my-volunteer' component={VolunteerList} />
      <ProtectedRoute exact path='/my-volunteer/:requestId' component={VolunteerDetail} />
      <ProtectedRoute exact path="/logout" component={Logout} />
    </Switch>
  )
  const public_routes = (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/get-help' component={GetHelp} />
      <Route exact path='/volunteer' component={Volunteer} />
    </Switch>
  );

  return (
    <Layout>
      {public_routes}
      {is_requester ? requester_routes : null}
      {is_volunteer ? volunteer_routes : null}
      {/* <Route path="/:navId?/:subNavId?" component={component} /> */}
    </Layout>
  )
};

const mapStateToProps = (state, props) => {
  const params = props.match.params;

  return {
    component: navManager.getDisplayComponentForNav(state, params),
    hasLogin: state.auth.access !== null,
    is_requester: state.auth.is_requester,
    is_volunteer: state.auth.is_volunteer,
  };
};

export default withRouter(connect(mapStateToProps, { authCheckLoginState })(App));
