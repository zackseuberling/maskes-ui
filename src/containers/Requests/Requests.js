import React from 'react';
import { useHistory } from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import { Button, Jumbotron } from 'react-bootstrap';

const Requests = (props) => {
  const history = useHistory();
  return (
    <Aux>
      <Jumbotron>
        <h1>Hello {props.name}!</h1>
        <p>We are here to support you!</p>
        <p>
          <Button
            onClick={() => history.push(`/my-requests/create-request`)}
            variant="primary"
          >
            Submit a request
      </Button>
        </p>
      </Jumbotron>
      {props.children}
    </Aux>);
};

export default Requests;
