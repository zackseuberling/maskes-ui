import React, { useEffect, useState } from 'react';
import './Auth.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Aux from '../../../hoc/Aux';
import * as auth_api from './store/auth';
import { hideAuthModal, onLogin, onRegister } from './store/actions/actions';

const Auth = (props) => {

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
    const { showAuthModal, hideAuthModal, onLogin, history } = props;

    useEffect(() => {

    }, [])

    const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

    const login = () => {
        setHasError(false);
        setIsLoading(true)

        const onSuccess = () => {
            hideAuthModal();
            onLogin();
            history.push('/my-requests');
        }

        auth_api
            .login({
                password: password,
                username: email,
            })
            .then(onSuccess)
            .catch((error) => {
                setHasError(true);
                setIsLoading(false)
            })
            .finally(() => setIsLoading(false));
    }

    const register = () => {
        setHasError(false);
        setIsLoading(true)
        
        const onSuccess = () => {
            hideAuthModal();
            onRegister();
            history.push('/my-requests');
        }

        auth_api
            .createAccount({
                first_name: first_name,
                last_name: last_name,
                username: email,
                password: password,
            })
            .then(onSuccess)
            .catch((error) => {
                setHasError(true);
                setIsLoading(false)
            })
            .finally(() => setIsLoading(false));
    }

    let login_form = (
        <Aux>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    disabled={isLoading}
                    type="email"
                    placeholder="Enter email"
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    disabled={isLoading}
                    type="password"
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
                    type="first_name"
                    placeholder="First Name"
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    disabled={isLoading}
                    type="last_name"
                    placeholder="Last Name"
                    onChange={onChange}
                />
            </Form.Group>
            {login_form}
        </Aux>
    );

    return (
        <Modal
            show={showAuthModal}
            onHide={hideAuthModal}
            dialogClassName="modal-50w"
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {hasAccount ? <div>Log in with your Email</div> : <div>Register Today</div>}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {hasAccount && hasError && <Alert variant="danger">Failed to login. Please retry!</Alert>}
                {!hasAccount && hasError && <Alert variant="danger">Failed to register. Please try again!</Alert>}
                {hasAccount ? login_form : register_form}
            </Modal.Body>

            <Modal.Footer>
                {!isLoading && (
                    <Aux>
                        {hasAccount
                            ?(<Button variant="outline-primary" block onClick={login}>Login</Button>)
                            :(<Button variant="outline-primary" block onClick={register}>Register</Button>)}
                        
                        {hasAccount
                            ?(<p className="text-right text-muted mb-3">Don't have an account? <a href="#login" onClick={switchAuthModeHandler}>Sign up</a></p>)
                            :(<p className="text-right text-muted mb-3">Already have an account? <a href="#signup"  onClick={switchAuthModeHandler}>Log in</a></p>)}
                    </Aux>
                )}

                {isLoading && (
                    <Button variant="primary" disabled block>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> Loading...
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        showAuthModal: state.auth.showAuthModal,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        hideAuthModal,
        onLogin,
        onRegister,
    })(Auth)
);