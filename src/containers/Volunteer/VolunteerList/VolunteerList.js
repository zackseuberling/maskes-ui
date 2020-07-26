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
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Volunteer from '../Volunteer';
import SearchForm from '../../../components/Volunteer/SearchForm/SearchForm';
import { Pagination } from 'semantic-ui-react';
import './VolunteerList.css';


const VolunteerList = (props) => {
    const { requests, loading, token, error, name, match, fetchVolunteerRequests, isMyVolunteer } = props
    const history = useHistory();
    const { results, count } = requests
    const totalPages = Math.ceil(count / 21)

    const [requestsList, setRequestsList] = useState([]);
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

    useEffect(() => {
        if (results) {
            setRequestsList(results)
        }
    }, [results, myVolunteer])

    let display = [];
    if (!loading && results) {
        if (myVolunteer && results[0].request_info) {
            display = results.map((volunteer, index) => (
                <Card key={index} style={volunteer.status === 'Delivered' ? { backgroundColor: '#E1F6F1' } : null}>
                    <Card.Body>
                        <Card.Title>Volunteer #{volunteer.id}</Card.Title>

                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    Request #{volunteer.request_info.id}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <Card.Text>Location: {volunteer.request_info.locations}</Card.Text>
                                        <Card.Text>Family of: {volunteer.request_info.household_number}</Card.Text>
                                        <Card.Text>Urgent Needs: {volunteer.request_info.urgency}</Card.Text>
                                        <Card.Text>Request Date: {new Date(volunteer.request_info.created_date).toLocaleDateString()}</Card.Text>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <Card.Text>Date: {new Date(volunteer.created_date).toLocaleDateString()}</Card.Text>
                        <Button size='sm' block
                            style={volunteer.status === 'Delivered' ? { color: 'green' } : null}
                            variant="link"
                            onClick={() => history.push(`my-volunteer/${volunteer.id}`)}>
                            {volunteer.status + ' '}
                            {volunteer.status === 'Delivered'
                                ? <BsCheck style={{ width: '20px', height: '20px' }} />
                                : <BsChevronRight style={{ width: '10px', height: '10px' }} />}

                        </Button>
                    </Card.Body>
                </Card>
            ));
        } else {
            display = requestsList.map((request, index) => (
                <Card key={index}>
                    <Card.Body>
                        <Card.Title>Request #{request.id}</Card.Title>
                        <Card.Text>Location: {request.locations}</Card.Text>
                        <Card.Text>Family Size: {request.household_number}</Card.Text>
                        <Card.Text>Urgent Needs: {request.urgency}</Card.Text>
                        {(request.volunteer_status === "Available")
                            ? <Button size='sm' variant='outline-info'
                                onClick={() => history.push(`${match.url}/${request.id}`)}>
                                {request.volunteer_status + ' '}
                                <BsBoxArrowInRight style={{ width: '15px', height: '15px' }} /></Button>
                            : <Button size='sm'
                                variant="disable"
                                onClick={() => history.push(`${match.url}/${request.id}`)}>{request.volunteer_status}</Button>
                        }
                    </Card.Body>
                    <Card.Footer>Date Created: {new Date(request.created_date).toLocaleDateString()}</Card.Footer>
                </Card>
            ));
        };
    }


    const onChange = (event) => setSearchValues({ ...searchValues, [event.target.name]: event.target.value });

    const onPageChange = (event, pageInfo) => {
        setActivePage(pageInfo.activePage);
    }

    const onMyVolunteer = (event) => {
        setMyVolunteer(!myVolunteer);
        if (!myVolunteer) {
            history.push(`${match.path}/my-volunteer`)
        }
    }

    const pagination = (totalPages > 1) ? <Pagination
        boundaryRange={0}
        activePage={activePage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        className='mt-2 mb-3'
    /> : null

    return (
        <Volunteer name={name} onMyVolunteer={onMyVolunteer} myVolunteer={myVolunteer}>
            <Container fluid>
                <h3>{myVolunteer ? "My Volunteer" : "Open Requests"}</h3>
                {myVolunteer ? null : <SearchForm urgent={urgent} location={location} date={date} familySize={familySize} onChange={onChange} />}
                {pagination}
                {error ? <Alert variant="danger">{error.message}</Alert> : null}
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
