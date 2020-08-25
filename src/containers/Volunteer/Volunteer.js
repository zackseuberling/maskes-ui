import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Volunteer = (props) => {
    const history = useHistory()
    return (
        <Container className='mt-4'>
            <Container >
                <h4 style={{ fontWeight: 'bold' }}>
                    Hello {props.name}!</h4>
                <p>We need your help!</p>
                <Button className="my-volunteer-button"
                    onClick={() => history.push(`/volunteer/my-volunteer`)}
                    variant='outline-dark'
                >My Volunteer</Button>
            </Container>
            <hr />
            <Container className='mt-3'>
                {props.children}
            </Container>
        </Container>
    );
};

export default Volunteer;
