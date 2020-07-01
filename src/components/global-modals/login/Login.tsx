import React, { Component } from 'react';

import './Login.css';

import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { hideLoginModal, onLogin } from './login-modal.actions';
import Alert from 'react-bootstrap/Alert';
import * as auth from '../../../apis/auth/auth.api';
import { withRouter } from 'react-router';

interface ILoginModalProps {
  show?: boolean;
  goTo?(): any;
  hideLoginModal?(): any;
  onLogin?(): any;
}

interface ILoginModalState {
  hasError?: boolean;
  isLoading?: boolean;
  password?: string;
  username?: string;
}

class LoginModal extends Component<ILoginModalProps, ILoginModalState> {
  componentDidMount() {
    this.setState({
      hasError: false,
      isLoading: false,
    });
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  login() {
    this.setState({
      hasError: false,
      isLoading: true,
    });

    auth
      .login({
        password: this.state.password,
        username: this.state.username,
      })
      .then(onSuccess.bind(this))
      .catch((error) => {
        this.setState({
          hasError: true,
          isLoading: false,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });

    function onSuccess(this: any) {
      this.props.hideLoginModal();
      this.props.onLogin();
      this.props.goTo('/my-requests');
    }
  }

  render() {
    if (this.props.show) {
      const { show, hideLoginModal } = this.props;
      return (
        <Modal
          show={show}
          onHide={hideLoginModal}
          dialogClassName="modal-50w"
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Log in with your Username
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.hasError && (
              <Alert variant="danger">Failed to login. Please retry!</Alert>
            )}
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  disabled={this.state.isLoading}
                  type="email"
                  placeholder="Enter username"
                  onChange={this.handleUsernameChange.bind(this)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  disabled={this.state.isLoading}
                  type="password"
                  placeholder="Password"
                  onChange={this.handlePasswordChange.bind(this)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {!this.state.isLoading && (
              <div>
                <Button variant="outline-secondary" onClick={hideLoginModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={this.login.bind(this)}>
                  Login
                </Button>
              </div>
            )}

            {this.state.isLoading && (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  return {
    show: state.globalModals.show,
    goTo: props.history.push,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    hideLoginModal,
    onLogin,
  })(LoginModal)
);
