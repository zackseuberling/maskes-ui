import React from 'react';

import './Navbar.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { openLoginModal } from '../global-modals/login/login-modal.actions';

const AppNavbar = ({ openLoginModal }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand as={NavLink} to="/">
      COVID-19 Mutual Aid
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/get-help">
          Get Help
        </Nav.Link>
        <Nav.Link as={NavLink} to="/volunteer">
          Get Involved
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    <Form inline>
      <Button
        className="LoginButton"
        onClick={openLoginModal}
        variant="outline-secondary"
      >
        Login
      </Button>{' '}
      <Button variant="info">Donate</Button>
    </Form>
  </Navbar>
);

export default connect(null, {
  openLoginModal,
})(AppNavbar);
