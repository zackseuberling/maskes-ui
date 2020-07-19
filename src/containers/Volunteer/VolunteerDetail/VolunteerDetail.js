import React, { useEffect } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import { Spinner, Button, Container, Table } from 'react-bootstrap';
import Volunteer from '../Volunteer';
import { connect } from 'react-redux';
import { fetchVolunteerRequestDetail } from './store/actions/actions';

const VolunteerDetail = (props) => {

    const { request, loading, token, fetchVolunteerRequestDetail, name } = props;

    useEffect(() => {
        fetchVolunteerRequestDetail(props.match.params.requestId, token)
    }, [fetchVolunteerRequestDetail, token, props.match.params.requestId])

    let display = []
    if (!loading && request) {
        display = (
            <Aux>
                <Table bordered striped hover size="sm" responsive='sm'>
                    <tbody >
                        <tr><td>Created Date</td><td>{new Date(request.created_date).toLocaleDateString()}</td></tr>
                        <tr><td>locations</td><td>{request.locations}</td></tr>
                        <tr><td>List of Items</td><td style={{ width: '80%' }}>{request.items_list}</td></tr>
                        <tr><td>Food Restrictions</td><td>{request.food_restrictions}</td></tr>
                        <tr><td>Household Size</td><td>{request.household_number}</td></tr>
                        <tr><td>Urgency</td><td>{request.urgency}</td></tr>
                    </tbody>
                </Table>

                <Button size='lg'
                    className='mt-1 mb-3'
                    onClick={() => alert('Thank you for signing up this request')}
                >Volunteer</Button>
            </Aux>
        );
    }


    return (
        <Volunteer name={name}>
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
        hasLogin: state.auth.access !== null,
        token: state.auth.access,
        name: state.auth.name,
        loading: state.volunteerDetail.loading,
        request: state.volunteerDetail.request,

    }
}

export default connect(mapStateToProps, { fetchVolunteerRequestDetail })(VolunteerDetail);