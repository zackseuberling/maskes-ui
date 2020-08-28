import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import {LoginForm, RegisterForm} from '../../Form/AuthForms';
import Aux from '../../../hoc/Aux/Aux';
import './AuthModal.css';

const AuthModal = (props) => {
    const { showModal, hideModal, isLogin, loading, error, onSubmit, hasLogin, switchMode, onChange, is_volunteer, is_requester } = props
    const loading_button = (
        <Button className="auth-button" variant="primary" disabled block>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mr-2"
            /> Loading...
        </Button>)
    const history = useHistory();
    
    let alert_messages = []

    if (error) {
        if (error.response.data.detail) {
            alert_messages = [...alert_messages, error.response.data.detail]
        }
    }

    return (
        <Modal
            show={showModal}
            onHide={hideModal}
            dialogClassName="modal-50w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="auth-modal"
            animation={false}
        >
            {/* REDIRECT AFTER LOGIN */}

            {hasLogin ? 
                (is_volunteer ? <Redirect to='/volunteer'/> :
                is_requester? <Redirect to='/my-requests'/>: <Redirect to='/' />)
            : null}

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {isLogin ? <div>Log in with your Email</div> : <div>Register Today</div>}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {isLogin && error && alert_messages.map((msg,idx)=><Alert key={idx} variant="danger">{msg}</Alert>)}
                {!isLogin && error && alert_messages.map((msg,idx)=><Alert key={idx} variant="danger">{msg}</Alert>)}
                    
                <Form onSubmit={onSubmit}>
                    {isLogin ? <LoginForm error={error} isLoading={loading} onChange={onChange}/> : <RegisterForm error={error} isLoading={loading} onChange={onChange} />}
                    {isLogin ?(loading?loading_button:<Button className="auth-button" variant="primary" block type="submit">Login</Button>)
                                :(loading?loading_button:<Button className="auth-button" variant="primary" block type="submit">Register</Button>)}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                {!loading && (
                    <Aux>
                        {isLogin
                            ?(<p className="text-right">Don't have an account? <button className="auth-btn-link" onClick={switchMode}>Sign up</button></p>)
                            :(<p className="text-right text-muted">Already have an account? <button className="auth-btn-link"  onClick={switchMode}>Log in</button></p>)}
                            <p className="text-right text-muted mb-3">Forgot your password? <button className="auth-btn-link" 
                            onClick={()=> {
                                history.push("/password-reset");
                                hideModal();
                                }}>Reset password</button></p>
                    </Aux>
                )}

            </Modal.Footer>
        </Modal>
    )
};
 
export default AuthModal;