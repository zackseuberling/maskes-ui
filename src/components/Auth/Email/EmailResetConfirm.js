import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './EmailReset.css';

const EmailResetConfirm = (props) => {
    const { handleSubmit, params } = props;
    const [formData, setFormData] = useState({
        uid: params.uid,
        token: params.token,
        new_email: "",
        re_new_email: "",
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Container className='email-reset-container'>
            <Form className='email-reset-form' onSubmit={(e) => handleSubmit(e, formData)}>
                <Form.Group controlId="formBasicResetEmail">
                    <Form.Label>New Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="new_email"
                        placeholder="Enter New Email"
                        onChange={onChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicRetypeEmail">
                    <Form.Label>Retype Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="re_new_email"
                        placeholder="Retype New Email"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
};

export default EmailResetConfirm;