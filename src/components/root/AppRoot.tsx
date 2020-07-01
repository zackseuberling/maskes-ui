import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../navbar/Navbar';
import GlobalModals from '../global-modals/GlobalModals';
import { withRouter } from 'react-router';
import * as navManager from '../navbar/nav-manager';

const AppRoot = ({ component, hasLogin }) => (
  <div>
    <GlobalModals />
    <Navbar />
    <Route path="/:navId?" component={component}></Route>
  </div>
);

const mapStateToProps = (state, props) => {
  const navId = props.match.params.navId;

  return {
    component: navManager.getDisplayComponentForNav(state, navId),
  };
};

export default withRouter(connect(mapStateToProps)(AppRoot));
