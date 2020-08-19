import React, { Component } from 'react';
import './Navbar.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { openAuthModal } from '../Auth/store/actions/actions';
import { BsFillPersonFill } from "react-icons/bs"
interface ILoginModalProps {
  hasLogin?: boolean;
  is_requester?: boolean;
  is_volunteer?: boolean;
  openAuthModal?(): any;
  history?: any;
}

class AppNavbar extends Component<ILoginModalProps> {
  render() {
    const { hasLogin, openAuthModal, is_requester, is_volunteer, history } = this.props;
    return (
      <Navbar className="px-4" bg="dark" variant="dark" expand="md">
        <Navbar.Brand as={NavLink} to="/">
          SKCE Mutual Aid
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
                  Get Help
                </Nav.Link>
                <Nav.Link as={NavLink} to="/get-involved">
                  Get Involved
                </Nav.Link>
              </React.Fragment>
            )}
            {hasLogin && is_requester && (
              <Nav.Link as={NavLink} to="/my-requests">
                Requests
              </Nav.Link>
            )}
            {hasLogin && is_volunteer && (
              <Nav.Link as={NavLink} to="/volunteer">
                Volunteer
              </Nav.Link>
            )}
          </Nav>

          <Nav className="mr-2">
            {!hasLogin && (
              <Button
                onClick={openAuthModal}
                variant="outline-light"
                className="m-2"
              >
                <BsFillPersonFill onClick={openAuthModal} />
              </Button>
            )}
            {is_volunteer ? <Button variant="outline-dark" className="m-2" onClick={() => history.push("/profile/me")}>Profile</Button> : null}
            {hasLogin && <Button href="/logout" variant="outline-danger" className="m-2">Logout</Button>}
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasLogin: state.auth.access !== null,
    is_requester: state.auth.is_requester,
    is_volunteer: state.auth.is_volunteer,
  };
};

export default connect(mapStateToProps, {
  openAuthModal
})(AppNavbar);
