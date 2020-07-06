import React, { Component } from 'react';

import './Navbar.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { openAuthModal } from '../global-modals/auth/store/actions/actions';
import { BsFillPersonFill } from "react-icons/bs"
interface ILoginModalProps {
  hasLogin?: boolean;
  openAuthModal?(): any;
}

class AppNavbar extends Component<ILoginModalProps> {
  render() {
    const { hasLogin, openAuthModal } = this.props;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={NavLink} to="/">
          COVID-19 Mutual Aid
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {!hasLogin && (
              <React.Fragment>
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/get-help">
                  Get help
                </Nav.Link>
                <Nav.Link as={NavLink} to="/volunteer">
                  Get involved
                </Nav.Link>
              </React.Fragment>
            )}

            {hasLogin && (
              <Nav.Link as={NavLink} to="/my-requests">
                Manage requests
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Form inline>
          {!hasLogin && (
            <Button
              className="LoginButton"
              onClick={openAuthModal}
              variant="outline-dark"
            >
              <BsFillPersonFill onClick={openAuthModal} />
            </Button>
          )}
          <Button variant="info">Donate</Button>
          {hasLogin && <Button href="/logout" className="LoginButton" variant="outline-danger" >Logout</Button>}
        </Form>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasLogin: state.auth.access !== null,
  };
};

export default connect(mapStateToProps, {
  openAuthModal
})(AppNavbar);
