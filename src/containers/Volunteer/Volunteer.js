import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Volunteer = (props) => {
    return (
        <Container className='mt-2'>
            <Container >
                <h4 style={{ fontWeight: 'bold' }}>Hello {props.name}!</h4>
                <p>We need your help!</p>
                {!props.myVolunteer ? <Button variant='outline-dark' onClick={props.onMyVolunteer}>My Volunteer</Button> : null}
            </Container>
            <hr />
            <Container className='mt-3'>
                {props.children}
            </Container>
        </Container>
    );
};

export default Volunteer;
