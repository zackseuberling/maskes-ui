import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { fetchRequests } from './store/actions/actions';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const RequestList = (props) => {

  const { requests, loading, token, fetchRequests } = props;
  const { results } = requests

  useEffect(() => {
    fetchRequests(1, token)
  }, [fetchRequests, token])
  let requests_list = []
  //Todo: add pagination

  const history = useHistory();
  const selectRequestHandler = (requestId) => {
    history.push('/my-requests/' + requestId)
  }

  if (!loading && results) {
    requests_list = results.map(request => (
      <tr key={request.id} onClick={() => selectRequestHandler(request.id)}>
        <td>{request.id}</td>
        <td>{request.status}</td>
        <td style={{ width: '80%' }}>{request.items_list}</td>
        <td>{new Date(request.created_date).toLocaleDateString()}</td>
      </tr>
    ))
  }

  return (

    <Container fluid>
      <h3>Requests</h3>
      {loading
        ? <Spinner animation="grow" />
        : <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>List of Items</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {requests_list}
          </tbody>
        </Table>
      }

    </Container>
  );

};

const mapStateToProps = (state) => {
  return {
    hasLogin: state.auth.access !== null,
    token: state.auth.access,
    loading: state.requestList.loading,
    requests: state.requestList.requests
  }
}

export default connect(mapStateToProps, { fetchRequests })(RequestList);
