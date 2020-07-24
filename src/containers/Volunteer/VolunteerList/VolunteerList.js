import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { fetchVolunteerRequests } from './store/actions/actions';
import { BsBoxArrowInRight, BsCheck } from 'react-icons/bs';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Volunteer from '../Volunteer';
import SearchForm from '../../../components/Volunteer/SearchForm/SearchForm';
import { Pagination } from 'semantic-ui-react'

const VolunteerList = (props) => {
    const { requests, loading, token, error, name, match, fetchVolunteerRequests, isMyVolunteer } = props
    const history = useHistory();
    const { results, count } = requests
    const totalPages = Math.ceil(count / 20)

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
                <tr key={index} style={volunteer.status === 'Delivered' ? { backgroundColor: '#E1F6F1' } : null}>
                    <td>{volunteer.id}</td>
                    <td>{volunteer.request_info.locations}</td>
                    <td>{volunteer.request_info.household_number}</td>
                    <td>{volunteer.request_info.urgency}</td>
                    <td>{new Date(volunteer.request_info.created_date).toLocaleDateString()}</td>
                    <td style={{ width: '130px' }}>
                        <Button size='sm' block
                            variant="link"
                            onClick={() => history.push(`my-volunteer/${volunteer.id}`)}>
                            {volunteer.status + ' '}<BsCheck style={{ width: '20px', height: '20px' }} /></Button>
                    </td>
                </tr>
            ));
        } else {
            display = requestsList.map((request, index) => (
                <tr key={index} style={request.volunteer_status === 'Unavailable' ? { backgroundColor: '#808080' } : null}>
                    <td>{request.id}</td>
                    <td>{request.locations}</td>
                    <td>{request.household_number}</td>
                    <td>{request.urgency}</td>
                    <td>{new Date(request.created_date).toLocaleDateString()}</td>
                    <td style={{ width: '130px' }}>
                        {(request.volunteer_status === "Available")
                            ? <Button size='sm' block
                                variant="link"
                                onClick={() => history.push(`${match.url}/${request.id}`)}>
                                {request.volunteer_status + ' '}<BsBoxArrowInRight style={{ width: '20px', height: '20px' }} /></Button>
                            : <Button size='sm' block
                                variant="disable"
                                onClick={() => alert('This request is unavailable, please choose another one.')}>{request.volunteer_status}</Button>
                        }
                    </td>
                </tr>
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
                            {display}
                        </tbody>
                    </Table>
                }
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
