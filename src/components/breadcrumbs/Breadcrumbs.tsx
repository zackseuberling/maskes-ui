import React from 'react';

import './Breadcrumbs.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink } from 'react-router-dom';

const AppBreadcrumb = () => (
  <Breadcrumb className="my-breadcrumb">
    <Breadcrumb.Item>
      <NavLink
        to="/hello"
        activeStyle={{
          textDecoration: 'none',
          color: 'black',
        }}
      >
        Overview
      </NavLink>
    </Breadcrumb.Item>
    <Breadcrumb.Item active>Details</Breadcrumb.Item>
  </Breadcrumb>
);

export default AppBreadcrumb;
