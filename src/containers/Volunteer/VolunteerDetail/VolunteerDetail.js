import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
import { Spinner, Button, Container, Table } from 'react-bootstrap';
import Volunteer from '../Volunteer';
import Connect from '../../../containers/Connect/Connect';
import { connect } from 'react-redux';
import { fetchVolunteerRequestDetail, volunteering } from './store/actions/actions';
import { FaRegHandPaper } from 'react-icons/fa';
import "../Volunteer.css";

const VolunteerDetail = (props) => {

    const { request, loading, match,
        fetchVolunteerRequestDetail, volunteering, name, isMyVolunteer } = props;
    const history = useHistory();

    const [myVolunteer, setMyVolunteer] = useState(false)

    useEffect(() => {
        if (isMyVolunteer) {
            setMyVolunteer(isMyVolunteer)
        }
    }, [isMyVolunteer])

    useEffect(() => {
        fetchVolunteerRequestDetail(match.params.requestId)
    }, [fetchVolunteerRequestDetail, match.params.requestId])

    const onMyVolunteer = (event) => {
        setMyVolunteer(!myVolunteer);
        if (!myVolunteer) {
            history.push('/volunteer/my-support')
        }
    }

    const volunteerSignupHandler = requestId => {
        volunteering(requestId);
        history.push('/volunteer/my-support');
    }

    let display = []
    if (!loading && request) {
        display = (
            <Aux>
                <Table bordered striped hover size="sm" responsive='sm'>
                    <tbody >
                        <tr><td>Request #</td><td>{request.id}</td></tr>
                        <tr><td>Request Date</td><td>{new Date(request.created_date).toLocaleDateString()}</td></tr>
                        <tr><td>Location</td><td>{request.locations}</td></tr>
                        <tr><td>List of Items</td><td style={{ width: '80%' }}>{request.items_list}</td></tr>
                        <tr><td>Food Restrictions</td><td>{request.food_restrictions}</td></tr>
                        <tr><td>Household Size</td><td>{request.household_number}</td></tr>
                        <tr><td>Urgency</td><td>{request.urgency}</td></tr>
                        <tr><td>Volunteer Status</td><td>{request.volunteer_status}</td></tr>
                    </tbody>
                </Table>

                {request.volunteer_status === 'Available' ? <Button size='lg'
                    className='mt-1 mb-3 '
                    variant='outline-primary volunteer-button'
                    onClick={() => volunteerSignupHandler(request.id)}
                >Volunteer! <FaRegHandPaper className='mb-1' /></Button> : null
                }

                <Connect requestId={request.id} />
            </Aux >
        );
    }


    return (
        <Volunteer name={name} onMyVolunteer={onMyVolunteer} myVolunteer={myVolunteer}>
            <Container fluid>
                <h3>Request Detail</h3>
                {loading
                    ? <Spinner animation="border" style={{ marginLeft: '40%' }} />
                    : display

                }
            </Container>
        </Volunteer>
    );
};

const mapStateToProps = (state) => {
    return {
        name: state.auth.name,
        loading: state.volunteerDetail.loading,
        request: state.volunteerDetail.request,
        error: state.volunteerDetail.error,
    }
}

export default connect(mapStateToProps, { fetchVolunteerRequestDetail, volunteering })(VolunteerDetail);