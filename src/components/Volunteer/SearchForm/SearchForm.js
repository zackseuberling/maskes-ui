import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import * as searchData from '../../Form/FormData';

const SearchForm = (props) => {
    const { location, urgent, date, onChange } = props;
    return (
        <Form>
            <Row>
                <Col md>
                    <Form.Group as={Col} controlId="searchUrgent">
                        <Form.Label>ASAP/Urgent Needs</Form.Label>
                        <Form.Control as="select" name="urgent" value={urgent} onChange={onChange}>
                            <option value=''>All...</option>
                            {searchData.urgency.map((urgent) => (
                                <option key={urgent} value={urgent}>{urgent}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group as={Col} controlId="searchLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control as="select" name='location' value={location} onChange={onChange}>
                            <option value=''>All...</option>
                            {searchData.locations.map((location) => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col md>
                    <Form.Group as={Col} controlId="searchDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control as="select" name='date' value={date} onChange={onChange}>
                            <option value='latest'>Latest</option>
                            <option value='oldest'>Oldest</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
};

export default SearchForm;