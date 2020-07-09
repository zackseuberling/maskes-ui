import React, { useEffect, useState } from 'react';
import './Auth.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Aux from '../../../hoc/Aux';
// import * as auth_api from './store/auth';
import { hideAuthModal, onAuth } from './store/actions/actions';

const Auth = (props) => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })

    const [hasAccount, setHasAccount] = useState(true)

    const switchAuthModeHandler = () => {
        setHasAccount(!hasAccount)
    }

    const { first_name, last_name, email, password } = formData
    const { showAuthModal, hideAuthModal, onAuth, isLoading, hasError, hasLogin } = props;

    useEffect(() => {

    }, [])

    const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });


    let login_form = (
        <Aux>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    disabled={isLoading}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    disabled={isLoading}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={onChange}
                />
            </Form.Group>
        </Aux>
    );

    let register_form = (
        <Aux>
            <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    disabled={isLoading}
                    type="input"
                    name="first_name"
                    placeholder="First Name"
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    disabled={isLoading}
                    type="input"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={onChange}
                />
            </Form.Group>
            {login_form}
            <Form.Group>
                <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before register."
                />
            </Form.Group>
        </Aux>
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        onAuth(first_name, last_name, email, password, hasAccount);
    }

    let loading_button = (
        <Button variant="primary" disabled block>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mr-2"
            /> Loading...
        </Button>)

    return (
        <Modal
            show={showAuthModal}
            onHide={hideAuthModal}
            dialogClassName="modal-50w"
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            {hasLogin ? <Redirect to='/my-requests'/> : null}

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {hasAccount ? <div>Log in with your Email</div> : <div>Register Today</div>}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {hasAccount && hasError && <Alert variant="danger">Failed to login. Please retry! {hasError.message}</Alert>}
                {!hasAccount && hasError && <Alert variant="danger">Failed to register. Please try again! {hasError.message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    {hasAccount ? login_form : register_form}
                    {hasAccount ?(isLoading?loading_button:<Button variant="primary" block type="submit">Login</Button>)
                                :(isLoading?loading_button:<Button variant="primary" block type="submit">Register</Button>)}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                {!isLoading && (
                    <Aux>
                        {hasAccount
                            ?(<p className="text-right text-muted">Don't have an account? <a href="#login" onClick={switchAuthModeHandler}>Sign up</a></p>)
                            :(<p className="text-right text-muted">Already have an account? <a href="#signup"  onClick={switchAuthModeHandler}>Log in</a></p>)}
                            <p className="text-right text-muted mb-3">Forgot your password? <a href="/">Reset password</a></p>
                    </Aux>
                )}

            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        showAuthModal: state.auth.showAuthModal,
        isLoading: state.auth.loading,
        hasError: state.auth.error,
        hasLogin: state.auth.access!==null,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        hideAuthModal,
        onAuth, 
    })(Auth)
);