import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

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
                            <option value='In the next 72 hours'>ASAP</option>
                            <option value='Over the next few days'>Over the next few days</option>
                            <option value='Useful if available'>Useful if available</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group as={Col} controlId="searchLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control as="select" name='location' value={location} onChange={onChange}>
                            <option value=''>All...</option>
                            <option value='Kent'>Kent</option>
                            <option value='Renton'>Renton</option>
                            <option value='Federal Way'>Federal Way</option>
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