import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import { connect } from 'react-redux';
import { fetchVolunteerList } from './store/actions/actions';
import { BsCheck, BsChevronRight } from 'react-icons/bs';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Volunteer from '../Volunteer';

import { Pagination } from 'semantic-ui-react';

import '../Volunteer.css';

const MyVolunteerList = (props) => {
    const { volunteer, loading, token,
        name, fetchVolunteerList } = props

    const history = useHistory();
    const { results, count } = volunteer
    const totalPages = Math.ceil(count / 21)

    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        fetchVolunteerList(activePage, token);
    }, [fetchVolunteerList, token, activePage]);

    let display = [];

    if (!loading && results && results.length > 0) {

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
                <h3>My Volunteer</h3>
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
        token: state.auth.access,
        name: state.auth.name,
        loading: state.myVolunteer.loading,
        volunteer: state.myVolunteer.volunteer,
        error: state.myVolunteer.error,
    }
}

export default connect(mapStateToProps, { fetchVolunteerList })(MyVolunteerList);