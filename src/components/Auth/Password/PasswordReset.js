import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './PasswordReset.css';

const PasswordReset = (props) => {
    const { handleSubmit } = props;

    const [userEmail, setUserEmail] = useState("")

    const onChange = (e) => {
        setUserEmail(e.target.value);
    }

    return (
        <Container className='password-reset-container'>
            <Form className='password-reset-form' onSubmit={(e) => handleSubmit(e, userEmail)}>
                <Form.Group controlId="PasswordResetEmail">
                    <Form.Label>Send Password Reset Link</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={userEmail}
                        placeholder="Enter email"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>)
}


export default PasswordReset;