import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchVolunteerRequests } from './store/actions/actions';
import { BsBoxArrowInRight } from 'react-icons/bs';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Volunteer from '../Volunteer';

const VolunteerList = (props) => {
    const { requests, loading, token, name, match, history, fetchVolunteerRequests } = props
    const { results } = requests

    const [requestsList, setRequestsList] = useState([]);

    useEffect(() => {
        fetchVolunteerRequests(1, token);
    }, [fetchVolunteerRequests, token])

    useEffect(() => {
        if (results) {
            setRequestsList(
                results.map((request) => ({
                    ...request,
                    is_chosen: false
                }))
            )
        }
    }, [results])

    const toggleChosen = (id) => setRequestsList(
        requestsList.map((request, index) => (index === id)
            ? { ...request, is_chosen: !request.is_chosen }
            : request
        )
    );

    let display = [];
    if (!loading && results) {
        display = requestsList.map((request, index) => (
            <tr key={index} style={request.is_chosen ? { backgroundColor: '#E1F6F1' } : null}>
                <td>{index + 1}</td>
                <td>{request.locations}</td>
                <td>{request.household_number}</td>
                <td>{request.urgency}</td>
                <td>{new Date(request.created_date).toLocaleDateString()}</td>
                <td>{request.volunteer_status}</td>
                <td style={{ width: '100px' }}>
                    <Button size='sm' block
                        disabled={request.is_chosen}
                        variant={request.is_chosen ? "disable" : "link"}
                        onClick={() => toggleChosen(index)}
                    >{request.is_chosen ? "Signed Up" : "Avaiable"}</Button>
                </td>
                <td style={{ textAlign: 'center' }}><Link onClick={() => history.push(`${match.url}/${request.id}`)}><BsBoxArrowInRight style={{ width: '20px', height: '20px' }} /></Link></td>
            </tr>
        ));
    }


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
                {loading
                    ? <Spinner animation="border" style={{ marginLeft: '40%' }} />
                    : <Table striped bordered hover size="sm" responsive='sm'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Location</th>
                                <th>Family Size</th>
                                <th>Urgent Needs</th>
                                <th>Date Created</th>
                                <th>Volunteer Status</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {display}
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
        name: state.auth.name,
        loading: state.volunteerList.loading,
        requests: state.volunteerList.requests,
    }
}

export default connect(mapStateToProps, { fetchVolunteerRequests })(VolunteerList);
