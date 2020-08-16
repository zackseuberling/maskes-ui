import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './PasswordReset.css';

const PasswordResetConfirm = (props) => {
    const { handleSubmit, params } = props;
    const [formData, setFormData] = useState({
        uid: params.uid,
        token: params.token,
        new_password: "",
        re_new_password: "",
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Container className='password-reset-container'>
            <Form className='password-reset-form' onSubmit={(e) => handleSubmit(e, formData)}>
                <Form.Group controlId="formBasicResetPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="new_password"
                        placeholder="Enter New Password"
                        onChange={onChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicRetypePassword">
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="re_new_password"
                        placeholder="Retype New Password"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
};

export default PasswordResetConfirm;