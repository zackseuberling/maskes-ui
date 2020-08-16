import React from 'react';
import Form from 'react-bootstrap/Form';
import Aux from '../../hoc/Aux/Aux';

export const LoginForm = (props) => {

    const { isLoading, onChange } = props

    return (
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
    )
};

export const RegisterForm = (props) => {

    const { isLoading, onChange } = props

    return (
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
            <LoginForm isLoading={isLoading} onChange={onChange} />
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