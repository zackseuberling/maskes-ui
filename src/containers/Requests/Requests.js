import React from 'react';
import { useHistory } from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import { Button, Container } from 'react-bootstrap';
import './Requests.css';
const Requests = (props) => {
  const history = useHistory();
  return (
    <Aux>
      <Container className='mt-4'>
        <Container >

          <h4 style={{ fontWeight: 'bold' }}>
            Hello {props.name}!
            </h4>

          <p>We are here to support you!</p>
          <Button
            className="create-request-button"
            onClick={() => history.push(`/my-requests/create-request`)}
            variant="primary"
          >New Request</Button>
        </Container>
        <hr />

        <Container className='mt-3'>
          {props.children}
        </Container>
      </Container>


    </Aux>);
};

export default Requests;
