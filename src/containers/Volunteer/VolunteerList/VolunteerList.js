import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { fetchRequests } from './store/actions/actions';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Volunteer from '../Volunteer';

const VolunteerList = (props) => {
    const { name } = props
    const [isSignedUp1, setIsSignedUp1] = useState(false);
    const [isSignedUp2, setIsSignedUp2] = useState(false);
    const [isSignedUp3, setIsSignedUp3] = useState(false);
    return (
        <Volunteer name={name}>
            <Container fluid>
                <h3>Open Requests</h3>
                <Form>
                    <Row>
                        <Col md>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>ASAP/Urgent Needs</Form.Label>
                                <Form.Control as="select" defaultValue="All...">
                                    <option>All...</option>
                                    <option>ASAP</option>
                                    <option>Over the next few days</option>
                                    <option>Useful if available</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Location</Form.Label>
                                <Form.Control as="select" defaultValue="All...">
                                    <option>All...</option>
                                    <option>Kent</option>
                                    <option>Renton</option>
                                    <option>Federal Way</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Date</Form.Label>
                                <Form.Control as="select" defaultValue="Latest">
                                    <option>Latest</option>
                                    <option>Oldest</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                {false
                    ? <Spinner animation="grow" />
                    : <Table striped bordered hover size="sm" responsive='sm'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Location</th>
                                <th>Family Size</th>
                                <th>Urgent Needs</th>
                                <th>Date Created</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={isSignedUp1 ? { backgroundColor: '#E1F6F1' } : null}>
                                <td>1</td>
                                <td>Kent</td>
                                <td>4</td>
                                <td>ASAP</td>
                                <td>{new Date().toLocaleDateString()}</td>
                                <td style={{ width: '100px' }}><Button size='sm' block
                                    variant={isSignedUp1 ? "success" : "primary"}
                                    onClick={() => setIsSignedUp1(!isSignedUp1)}>{isSignedUp1 ? "Signed Up" : "Sign Up"}</Button></td>
                            </tr>
                            <tr style={isSignedUp2 ? { backgroundColor: '#E1F6F1' } : null}>
                                <td>2</td>
                                <td>Renton</td>
                                <td>7</td>
                                <td>Over the next few days</td>
                                <td>{new Date().toLocaleDateString()}</td>
                                <td><Button size='sm' block
                                    variant={isSignedUp2 ? "success" : "primary"}
                                    onClick={() => setIsSignedUp2(!isSignedUp2)}>{isSignedUp2 ? "Signed Up" : "Sign Up"}</Button></td>
                            </tr>
                            <tr style={isSignedUp3 ? { backgroundColor: '#E1F6F1' } : null}>
                                <td>3</td>
                                <td>Federal Way</td>
                                <td>3</td>
                                <td>Useful if available</td>
                                <td>{new Date().toLocaleDateString()}</td>
                                <td><Button size='sm' block
                                    variant={isSignedUp3 ? "success" : "primary"}
                                    onClick={() => setIsSignedUp3(!isSignedUp3)}>{isSignedUp3 ? "Signed Up" : "Sign Up"}</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </Container>
        </Volunteer>
    );

};

const mapStateToProps = (state) => {
    return {
        hasLogin: state.auth.access !== null,
        token: state.auth.access,
        name: state.auth.name
        // loading: state.requestList.loading,
        // requests: state.requestList.requests,

    }
}

export default connect(mapStateToProps, null)(VolunteerList);
