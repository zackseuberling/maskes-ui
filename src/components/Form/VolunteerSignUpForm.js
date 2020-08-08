import React from 'react';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import './VolunteerSignUpForm.css'

const VolunteerSignUpForm = (props) => {
    const { isLoading, onChange } = props
    return (
        <Container className='signup-container'>
            <Form className='signup-form'>
                <Row>
                    <Col>
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
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
                <Form.Group controlId="formBasicDisplayName">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control
                        disabled={isLoading}
                        type="diplay_name"
                        name="display_name"
                        placeholder="Display Name"
                        onChange={onChange}
                    />
                </Form.Group>

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
                <Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before register."
                    />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )


};

export default VolunteerSignUpForm;