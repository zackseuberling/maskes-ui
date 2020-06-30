import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Navbar from './Navbar';

const AppRoot = () => (
  <div>
    <Navbar />
    {/* <div>hello world</div> */}
  </div>
);

export default AppRoot;
