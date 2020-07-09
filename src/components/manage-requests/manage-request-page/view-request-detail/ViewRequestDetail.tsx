import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { fetchRequestDetail } from './store/actions/actions';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { withRouter } from 'react-router';

const ViewRequestDetail = (props) => {
  const { request, loading, token, fetchRequestDetail } = props;

  useEffect(() => {
    fetchRequestDetail(props.match.params.requestId, token)
  }, [fetchRequestDetail, token, props.match.params.requestId])
  let request_detail = {}
  if (!loading && request) {
    request_detail = (
      <tbody>
        <tr><td>Request id</td><td>{request.id}</td></tr>
        <tr><td>Request Status</td><td>{request.status}</td></tr>
        <tr><td>List of Items</td><td style={{ width: '80%' }}>{request.items_list}</td></tr>
        <tr><td>Created Date</td><td>{new Date(request.created_date).toLocaleDateString()}</td></tr>
      </tbody>
    )
  }

  return (
    <Container fluid>
      <h3>Request Detail</h3>
      {loading
        ? <Spinner animation="grow" />
        : <Table striped bordered hover size="sm">

          {request_detail}

        </Table>
      }
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    hasLogin: state.auth.access !== null,
    token: state.auth.access,
    loading: state.requestDetail.loading,
    request: state.requestDetail.request
  }
}

export default withRouter(connect(mapStateToProps, { fetchRequestDetail })(ViewRequestDetail));