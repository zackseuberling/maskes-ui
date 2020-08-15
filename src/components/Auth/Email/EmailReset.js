import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './EmailReset.css';

const EmailReset = (props) => {
    const { handleSubmit } = props;

    const [userEmail, setUserEmail] = useState("")

    const onChange = (e) => {
        setUserEmail(e.target.value);
    }

    return (
        <Container className='email-reset-container'>
            <Form className='email-reset-form' onSubmit={(e) => handleSubmit(e, userEmail)}>
                <Form.Group controlId="EmailResetEmail">
                    <Form.Label>Send Email Reset Link</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={userEmail}
                        placeholder="Enter Email"
                        onChange={onChange}
                        required
                    />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>)
}


export default EmailReset;