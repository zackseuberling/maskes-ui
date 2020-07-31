import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import { connect } from 'react-redux';
import { fetchVolunteerRequests } from './store/actions/actions';
import { BsBoxArrowInRight, BsCheck, BsChevronRight } from 'react-icons/bs';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Volunteer from '../Volunteer';
import SearchForm from '../../../components/Form/SearchForm';
import { Pagination } from 'semantic-ui-react';

import './VolunteerList.css';


const VolunteerList = (props) => {
    const { requests, loading, token,
        name, match, fetchVolunteerRequests, isMyVolunteer } = props
    const history = useHistory();
    const { results, count } = requests
    const totalPages = Math.ceil(count / 21)

    // const [requestsList, setRequestsList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [myVolunteer, setMyVolunteer] = useState(false)

    useEffect(() => {
        if (isMyVolunteer) {
            setMyVolunteer(isMyVolunteer)
        }
    }, [isMyVolunteer])

    const [searchValues, setSearchValues] = useState({ date: '', location: '', urgent: '', familySize: 1 })
    const { date, location, urgent, familySize } = searchValues;

    useEffect(() => {
        fetchVolunteerRequests(activePage, token, searchValues, myVolunteer);
    }, [fetchVolunteerRequests, token, searchValues, activePage, myVolunteer]);

    // useEffect(() => {
    //     if (results) {
    //         console.log(requestsList);
    //         console.log(results)
    //         setRequestsList({ ...requestsList, results })
    //     }
    // }, [results, myVolunteer, requestsList])

    let display = [];
    if (myVolunteer) {
        if (!loading && results.length !== 0) {
            //MY VOLUNTEER
            console.log(results)
            if (results[0].request_info) {
                display = results.map((volunteer, index) => (
                    <Card className='card_shadow' key={index} style={volunteer.status === 'Delivered' ? { backgroundColor: '#E1F6F1' } : null}>
                        <Card.Body>
                            <Card.Title className='mb-2'>Volunteer #{volunteer.id}</Card.Title>
                            <Accordion defaultActiveKey="0">
                                <Card className="request_shadow">
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Request #{volunteer.request_info.id}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <Card.Text>Location: {volunteer.request_info.locations}</Card.Text>
                                            <Card.Text>Family size: {volunteer.request_info.household_number}</Card.Text>
                                            <Card.Text>Urgent Needs: {volunteer.request_info.urgency}</Card.Text>
                                            <Card.Text>Request Date: {new Date(volunteer.request_info.created_date).toLocaleDateString()}</Card.Text>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            <Card.Text>Date: {new Date(volunteer.created_date).toLocaleDateString()}</Card.Text>
                            <Button size='sm' variant="link" block
                                style={
                                    volunteer.status === 'Delivered' ? { color: 'green' } :
                                        volunteer.status === 'Signed Up' ? { color: 'orange' } :
                                            volunteer.status === 'Ready' ? { color: '#0275d8' } : null}
                                onClick={() => history.push(`my-volunteer/${volunteer.id}`)}>
                                {volunteer.status === 'Signed Up' ? "Waiting for admin..." : volunteer.status + ' '}
                                {volunteer.status === 'Delivered'
                                    ? <BsCheck style={{ width: '20px', height: '20px' }} />
                                    : <BsChevronRight style={{ width: '10px', height: '10px' }} />}

                            </Button>
                        </Card.Body>
                    </Card>
                ));
            } else { display = <p>You haven't signed up for any volunteer yet!</p> }
        }

    } else {
        //ALL VOLUNTEER
        if (!loading && results) {
            display = results.map((request, index) => (
                <Accordion key={index}>
                    <Card className='card_shadow'>

                        <Accordion.Toggle as={Card.Header} eventKey="1" className="row request_accordion">
                            <Card.Title className="col">Request #{request.id}</Card.Title>
                            <small
                                className="col text-right"
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

                            {request.supporter !== null ? <Card.Text>Volunteer: {request.supporter}</Card.Text> : null}

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
                        <Card.Footer>Request on: {new Date(request.created_date).toLocaleDateString()}</Card.Footer>
                    </Card>
                </Accordion>)
            );
        }
    };



    const onChange = (event) => {
        setSearchValues({ ...searchValues, [event.target.name]: event.target.value });
        setActivePage(1);
    }

    const onPageChange = (event, pageInfo) => {
        setActivePage(pageInfo.activePage);
    }

    const onMyVolunteer = (event) => {
        setMyVolunteer(!myVolunteer);
        if (!myVolunteer) {
            history.push(`${match.path}/my-volunteer`)
        }
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
        <Volunteer name={name} onMyVolunteer={onMyVolunteer} myVolunteer={myVolunteer}>
            <Container fluid>
                <h3>{myVolunteer ? "My Volunteer" : "Open Requests"}</h3>
                {myVolunteer ? null : <SearchForm urgent={urgent} location={location} date={date} familySize={familySize} onChange={onChange} />}
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
        hasLogin: state.auth.access !== null,
        token: state.auth.access,
        name: state.auth.name,
        loading: state.volunteerList.loading,
        requests: state.volunteerList.requests,
        error: state.volunteerList.error,
    }
}

export default connect(mapStateToProps, { fetchVolunteerRequests })(VolunteerList);
