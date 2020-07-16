import React from 'react';
import { Container } from 'react-bootstrap';

const Volunteer = (props) => {
    return (
        <Container className='mt-2'>
            <Container >
                <h4>Hello {props.name}!</h4>
                <p>We need your help!</p>
            </Container>
            <hr />
            <Container className='mt-3'>
                {props.children}
            </Container>
        </Container>
    );
};

export default Volunteer;
