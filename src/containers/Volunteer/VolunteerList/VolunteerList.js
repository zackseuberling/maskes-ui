import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import { connect } from 'react-redux';
import { fetchVolunteerRequests } from './store/actions/actions';
import { BsBoxArrowInRight } from 'react-icons/bs';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Volunteer from '../Volunteer';
import SearchForm from '../../../components/Form/SearchForm';
import { Pagination } from 'semantic-ui-react';
import moment from 'moment';

import './VolunteerList.css';

const VolunteerList = (props) => {
    const { requests, loading,
        name, match, fetchVolunteerRequests } = props
    const history = useHistory();
    const { results, count } = requests
    const totalPages = Math.ceil(count / 21)

    const [activePage, setActivePage] = useState(1);

    const [searchValues, setSearchValues] = useState({ date: '', location: '', urgent: '', familySize: 0, requestId: '' })
    const { date, location, urgent, familySize } = searchValues;

    useEffect(() => {
        fetchVolunteerRequests(activePage, searchValues);
    }, [fetchVolunteerRequests, searchValues, activePage]);

    let display = [];
    //ALL VOLUNTEER
    if (!loading && results) {
        display = results.map((request, index) => (

            <Card key={index} className='card_shadow'>
                <Accordion >
                    <Accordion.Toggle as={Card.Header} eventKey="1" className="request_accordion">
                        <Card.Title >Request #{request.id}</Card.Title>
                        <small

                            style={{
                                color: request.urgency === "In the next 72 hours" ? '#d9534f' : "#0275d8",
                                fontSize: '13px'
                            }}>{request.urgency === "In the next 72 hours" ? "ASAP" : request.urgency}
                        </small>
                    </Accordion.Toggle>
                    <Card.Body>

                        <Card.Text>Location: {request.locations}</Card.Text>
                        <Card.Text>Family size: {request.household_number}</Card.Text>
                        {(request.volunteer_status === "Available")
                            ? <Button size='sm' variant='outline-info'
                                onClick={() => history.push(`${match.url}/${request.id}`)}>
                                {request.volunteer_status + ' '}
                                <BsBoxArrowInRight style={{ width: '15px', height: '15px' }} /></Button>
                            : <Button size='sm'
                                variant="light"

                                className='mb-3'
                                onClick={() => history.push(`${match.url}/${request.id}`)}>{request.volunteer_status}</Button>
                        }

                        {request.supporter !== null ?
                            <Card.Text className='my-auto'>
                                Volunteer: <Button
                                    className='my-btn-link'
                                    variant='link'
                                    onClick={() => history.push(`/profile/${request.supporter.id}`)}>
                                    {request.supporter.display_name}
                                </Button>
                            </Card.Text> : null}

                    </Card.Body>

                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <div style={{ marginBottom: '5px', marginTop: '-20px' }}>Items List:</div>
                            <ul>
                                {request.items_list ? request.items_list.split(',').map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                )) : null}
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Card.Footer className="text-secondary">{moment(request.created_date).fromNow()}</Card.Footer>
                </Accordion>
            </Card>
        )
        );
    }

    const onChange = (event) => {
        setSearchValues({ ...searchValues, [event.target.name]: event.target.value });
        setActivePage(1);
    }

    const [searchRequestId, setSearchRequestId] = useState('')

    const onSubmit = (event) => {
        event.preventDefault();
        setSearchValues({ date: '', location: '', urgent: '', familySize: 1, requestId: searchRequestId });
        setActivePage(1);
    }

    const onPageChange = (event, pageInfo) => {
        setActivePage(pageInfo.activePage);
    }

    const pagination = (totalPages > 1)
        ? <Pagination
            boundaryRange={0}
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            className='mt-2 mb-3'
        />
        : null

    return (
        <Volunteer name={name}>
            <Container fluid>
                <h3>Open Requests</h3>
                <SearchForm
                    urgent={urgent}
                    location={location}
                    date={date}
                    familySize={familySize}
                    searchRequestId={searchRequestId}
                    setSearchRequestId={setSearchRequestId}
                    onChange={onChange}
                    onSubmit={onSubmit} />
                {pagination}
                {loading
                    ? <Spinner animation="border" style={{ marginLeft: '40%' }} />
                    : <CardColumns className='card_columns'>{display}</CardColumns>}
                {pagination}
            </Container>
        </Volunteer>
    );
};

const mapStateToProps = (state) => {
    return {
        name: state.auth.name,
        loading: state.volunteerList.loading,
        requests: state.volunteerList.requests,
        error: state.volunteerList.error,
    }
}

export default connect(mapStateToProps, { fetchVolunteerRequests })(VolunteerList);
