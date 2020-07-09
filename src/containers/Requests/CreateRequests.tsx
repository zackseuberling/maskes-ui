import React from 'react';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const RequestTableList = ({ goTo }) => (
  <Jumbotron>
    <h1>Hello!</h1>
    <p>We are here to support you!</p>
    <p>
      <Button
        onClick={() => goTo('/my-requests/create-request')}
        variant="primary"
      >
        Submit a request
      </Button>
    </p>
  </Jumbotron>
);

const mapStateToProps = (state, props) => {
  return {
    goTo: props.history.push,
  };
};

export default withRouter(connect(mapStateToProps)(RequestTableList));
