import React from 'react';
import Form from 'react-bootstrap/Form';
import Aux from '../../hoc/Aux/Aux';
import Alert from 'react-bootstrap/Alert';
import "./AuthForm.css"

export const LoginForm = (props) => {

    const { isLoading, onChange, error } = props

    let email_error_messages = []

    let password_error_messages = []

    if (error) {
        if (error.response.data.email) {
            email_error_messages = [...email_error_messages, ...error.response.data.email]
        }
        if (error.response.data.password) {
            password_error_messages = [...password_error_messages, ...error.response.data.password]
        }
    }

    return (
        <Aux>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email<span className="required">*</span></Form.Label>
                {error && email_error_messages.map((msg, idx) => <Alert key={idx} variant="danger">{msg}</Alert>)}
                <Form.Control
                    disabled={isLoading}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password<span className="required">*</span></Form.Label>
                {error && password_error_messages.map((msg, idx) => <Alert key={idx} variant="danger">{msg}</Alert>)}
                <Form.Control
                    disabled={isLoading}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={onChange}
                />
            </Form.Group>
        </Aux>
    )
};

export const RegisterForm = (props) => {

    const { isLoading, onChange, error } = props

    let first_name_error_messages = []

    let last_name_error_messages = []

    if (error) {
        if (error.response.data.first_name) {
            first_name_error_messages = [...first_name_error_messages, error.response.data.first_name]
        }
        if (error.response.data.last_name) {
            last_name_error_messages = [...last_name_error_messages, error.response.data.last_name]
        }
    }

    return (
        <Aux>
            <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name<span className="required">*</span></Form.Label>
                {error && first_name_error_messages.map((msg, idx) => <Alert key={idx} variant="danger">{msg}</Alert>)}
                <Form.Control
                    disabled={isLoading}
                    type="input"
                    name="first_name"
                    placeholder="First Name"
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name<span className="required">*</span></Form.Label>
                {error && last_name_error_messages.map((msg, idx) => <Alert key={idx} variant="danger">{msg}</Alert>)}
                <Form.Control
                    disabled={isLoading}
                    type="input"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={onChange}
                />
            </Form.Group>
            <LoginForm isLoading={isLoading} onChange={onChange} error={error} />
            <Form.Group>
                <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before register."
                />
            </Form.Group>
        </Aux>
    )

};