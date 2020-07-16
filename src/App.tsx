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


import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { withRouter } from 'react-router';
import * as navManager from './components/Navbar/nav-manager';
import { authCheckLoginState } from './components/Auth/store/actions/actions';

const App = ({ component, authCheckLoginState, hasLogin }) => {
  useEffect(() => {
    authCheckLoginState()
  })
  const protected_routes = (
    <Switch>
      <ProtectedRoute exact path='/my-requests' component={RequestList} />
      <ProtectedRoute exact path='/my-requests/create-request' component={CreateRequest} />
      <ProtectedRoute exact path='/my-requests/:requestId' component={RequestDetail} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  );
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
      {protected_routes}
      {/* <Route path="/:navId?/:subNavId?" component={component} /> */}
    </Layout>
  )
};

const mapStateToProps = (state, props) => {
  const params = props.match.params;

  return {
    component: navManager.getDisplayComponentForNav(state, params),
    hasLogin: state.auth.access !== null
  };
};

export default withRouter(connect(mapStateToProps, { authCheckLoginState })(App));
