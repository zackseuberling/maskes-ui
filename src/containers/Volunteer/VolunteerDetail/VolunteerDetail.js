import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import { Spinner, Button, Container, Table } from 'react-bootstrap';
import Volunteer from '../Volunteer';
import { connect } from 'react-redux';

const VolunteerDetail = (props) => {

    const data = [{
        id: 1,
        created_date: "2020-06-29T20:42:40.642816Z",
        location: "Des Moines",
        household_number: 3,
        food_restrictions: "None",
        items_list: "Eggs, bread, chicken drumsticks, pork, brown rice, whole wheat bread, cooking oil, brown sugar, toliet paper, paper towel, brocolli, sweet peas, eggplants, green beans, corn, watermelon, strawberries, cherries",
        urgency: "In the next 72 hours",
    }]

    let display = data.map((request, index) => (
        <Aux key={index}>

            <Table bordered striped hover size="sm" responsive='sm'>
                <tbody >
                    <tr><td>Created Date</td><td>{new Date(request.created_date).toLocaleDateString()}</td></tr>
                    <tr><td>locations</td><td>{request.location}</td></tr>
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
    ));

    return (
        <Volunteer name={props.name}>
            <Container fluid>
                <h3>Request Detail</h3>
                {false
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
        name: state.auth.name
        // loading: state.volunteerDetail.loading,
        // requests: state.volunteerDetail.requests,

    }
}

export default connect(mapStateToProps, null)(VolunteerDetail);