import React, { useEffect } from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../navbar/Navbar';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import GlobalModals from '../global-modals/GlobalModals';
import Logout from '../global-modals/auth/Logout';
import { withRouter } from 'react-router';
import * as navManager from '../navbar/nav-manager';
import { authCheckLoginState } from '../global-modals/auth/store/actions/actions';

const AppRoot = ({ component, authCheckLoginState }) => {
  useEffect(() => {
    authCheckLoginState()
  })
  return (
    <div>
      <GlobalModals />
      <Navbar />
      {/* TODO: hide breadcrumbs for protected route */}
      <Breadcrumbs />
      <Route path="/:navId?/:subNavId?" component={component}></Route>
      <Route exact path="/logout" component={Logout} />
    </div>
  )
};



const mapStateToProps = (state, props) => {
  const params = props.match.params;

  return {
    component: navManager.getDisplayComponentForNav(state, params),
  };
};

export default withRouter(connect(mapStateToProps, { authCheckLoginState })(AppRoot));
