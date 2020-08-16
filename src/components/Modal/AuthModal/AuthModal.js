import React from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import {LoginForm, RegisterForm} from '../../Form/AuthForms';
import Aux from '../../../hoc/Aux/Aux';

const AuthModal = (props) => {
    const { showModal, hideModal, isLogin, loading, error, onSubmit, hasLogin, switchMode, onChange } = props
    const loading_button = (
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
            show={showModal}
            onHide={hideModal}
            dialogClassName="modal-50w"
            animation={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            {hasLogin ? <Redirect to='/volunteer'/> : null}

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {isLogin ? <div>Log in with your Email</div> : <div>Register Today</div>}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {isLogin && error && <Alert variant="danger">{error.response.data.detail}<br/> Please try again!</Alert>}
                {!isLogin && error && <Alert variant="danger">{error.response.data.detail}<br/> Please try again!</Alert>}
                <Form onSubmit={onSubmit}>
                    {isLogin ? <LoginForm isLoading={loading} onChange={onChange}/> : <RegisterForm isLoading={loading} onChange={onChange} />}
                    {isLogin ?(loading?loading_button:<Button variant="primary" block type="submit">Login</Button>)
                                :(loading?loading_button:<Button variant="primary" block type="submit">Register</Button>)}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                {!loading && (
                    <Aux>
                        {isLogin
                            ?(<p className="text-right text-muted">Don't have an account? <a href="#login" onClick={switchMode}>Sign up</a></p>)
                            :(<p className="text-right text-muted">Already have an account? <a href="#signup"  onClick={switchMode}>Log in</a></p>)}
                            <p className="text-right text-muted mb-3">Forgot your password? <a href="/password-reset">Reset password</a></p>
                    </Aux>
                )}

            </Modal.Footer>
        </Modal>
    )
};
 
export default AuthModal;