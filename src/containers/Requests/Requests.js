import React from 'react';
import { useHistory } from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import { Button, Card, Container } from 'react-bootstrap';

const Requests = (props) => {
  const history = useHistory();
  return (
    <Aux>
      <Container className='mt-2'>
        <Container >
          <Card.Title>
            <h4>
              Hello {props.name}!
            </h4>
          </Card.Title>
          <Card.Text>
            We are here to support you!
          </Card.Text>
          <Button
            onClick={() => history.push(`/my-requests/create-request`)}
            variant="primary"
          >Create a request</Button>
        </Container>
        <hr />

        <Container className='mt-3'>
          {props.children}
        </Container>
      </Container>


    </Aux>);
};

export default Requests;
