import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
import { Spinner, Button, Container, Table } from 'react-bootstrap';
import ReimbursementForm from '../../../components/Volunteer/ReimbursementForm/ReimbursementForm';
import Volunteer from '../Volunteer';
import { connect } from 'react-redux';
import { fetchVolunteerDetail } from './store/actions/actions';

const MyVolunteerDetail = (props) => {

    const { volunteer, loading, token, match, fetchVolunteerDetail, name, isMyVolunteer } = props;
    const history = useHistory();

    const [myVolunteer, setMyVolunteer] = useState(false)

    useEffect(() => {
        if (isMyVolunteer) {
            setMyVolunteer(isMyVolunteer)
        }
    }, [isMyVolunteer])

    useEffect(() => {
        fetchVolunteerDetail(match.params.volunteerId, token)
    }, [fetchVolunteerDetail, token, match.params.volunteerId])


    const onMyVolunteer = (event) => {
        setMyVolunteer(!myVolunteer);
        if (!myVolunteer) {
            history.push('/volunteer/my-volunteer')
        }
    }

    const volunteerDeleteHandler = () => {
        alert('Opps! Thank you for your consideration')
    }

    const [delivered, setDelivered] = useState(false)

    let display = []
    if (!loading && volunteer.request_detail) {
        display = (
            <Aux>
                <Table bordered striped hover size="sm" responsive='sm'>
                    <tbody >
                        <tr><td>Request #</td><td>{volunteer.request_detail.id}</td></tr>
                        <tr><td>Created Date</td><td>{new Date(volunteer.request_detail.created_date).toLocaleDateString()}</td></tr>
                        <tr><td>locations</td><td>{volunteer.request_detail.locations}</td></tr>
                        <tr><td>List of Items</td><td style={{ width: '80%' }}>{volunteer.request_detail.items_list}</td></tr>
                        <tr><td>Food Restrictions</td><td>{volunteer.request_detail.food_restrictions}</td></tr>
                        <tr><td>Household Size</td><td>{volunteer.request_detail.household_number}</td></tr>
                        <tr><td>Urgency</td><td>{volunteer.request_detail.urgency}</td></tr>
                        <tr><td>Volunteer Status</td><td>{volunteer.request_detail.volunteer_status}</td></tr>
                    </tbody>
                </Table>

                {!delivered
                    // volunteer.status === 'Signed Up'
                    ? (<div>
                        <Button
                            className='mt-1 mb-3 mr-2'
                            onClick={() => setDelivered(!delivered)}
                        >Confirm Delivered</Button>
                        <Button
                            className='mt-1 mb-3'
                            variant='danger'
                            onClick={volunteerDeleteHandler}
                        >Delete</Button>
                    </div>)

                    : null}
                {delivered
                    // volunteer.status === 'Delivered'
                    ? <div>
                        <Button
                            className='mt-1 mb-3 mr-2'
                            disabled
                            variant='success'
                        >Delivered</Button>
                        <ReimbursementForm />
                    </div>
                    : null}

            </Aux>
        );
    }


    return (
        <Volunteer name={name} onMyVolunteer={onMyVolunteer} myVolunteer={myVolunteer}>
            <Container fluid>
                <h3>My Volunteer Detail</h3>
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
        hasLogin: state.auth.access !== null,
        token: state.auth.access,
        name: state.auth.name,
        loading: state.myVolunteer.loading,
        volunteer: state.myVolunteer.volunteer,

    }
}

export default connect(mapStateToProps, { fetchVolunteerDetail })(MyVolunteerDetail);