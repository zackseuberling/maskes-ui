import React, { useEffect } from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../navbar/Navbar';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import GlobalModals from '../global-modals/GlobalModals';
import Logout from '../global-modals/auth/Logout';

import Home from '../home/Home';
import GetHelp from '../get-help/GetHelp';
import Volunteer from '../volunteer/Volunteer';

import ManageRequests from '../manage-requests/manage-request-page/ManageRequests';
import CreateRequestPage from '../manage-requests/create-request-page/CreateRequestPage';
import ViewRequestDetail from '../manage-requests/manage-request-page/view-request-detail/ViewRequestDetail';


import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { withRouter } from 'react-router';
import * as navManager from '../navbar/nav-manager';
import { authCheckLoginState } from '../global-modals/auth/store/actions/actions';

const AppRoot = ({ component, authCheckLoginState, hasLogin }) => {
  useEffect(() => {
    authCheckLoginState()
  })
  return (
    <div>
      <GlobalModals />
      <Navbar />
      {hasLogin ? <Breadcrumbs /> : null}
      <Route exact path='/' component={Home} />
      <Route exact path='/get-help' component={GetHelp} />
      <Route exact path='/volunteer' component={Volunteer} />
      <ProtectedRoute exact path='/my-requests' component={ManageRequests} />
      <ProtectedRoute exact path='/my-requests/create-request' component={CreateRequestPage} />
      <ProtectedRoute exact path='/my-requests/:requestId' component={ViewRequestDetail} />

      {/* <Route path="/:navId?/:subNavId?" component={component} /> */}

      <Route exact path="/logout" component={Logout} />
    </div>
  )
};



const mapStateToProps = (state, props) => {
  const params = props.match.params;

  return {
    component: navManager.getDisplayComponentForNav(state, params),
    hasLogin: state.auth.access !== null
  };
};

export default withRouter(connect(mapStateToProps, { authCheckLoginState })(AppRoot));
