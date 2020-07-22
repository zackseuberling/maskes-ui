import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { fetchRequests } from './store/actions/actions';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Requests from '../Requests';
import { Pagination } from 'semantic-ui-react';

const RequestList = (props) => {
  const { requests, loading, token, error, fetchRequests, name, history, match } = props;
  const { results, count } = requests
  const totalPages = Math.ceil(count / 20)

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetchRequests(activePage, token)
  }, [fetchRequests, token, activePage])
  let requests_list = []
  //Todo: add pagination

  const onPageChange = (event, pageInfo) => {
    setActivePage(pageInfo.activePage);
  }

  const selectRequestHandler = (requestId) => {
    history.push(`${match.path}/${requestId}`)
  }

  if (!loading && results) {
    requests_list = results.map((request, index) => (
      <tr key={request.id} onClick={() => selectRequestHandler(request.id)}>
        <td>{index + 1}</td>
        <td>{request.status}</td>
        <td style={{ width: '80%' }}>{request.items_list}</td>
        <td>{new Date(request.created_date).toLocaleDateString()}</td>
      </tr>
    ))
  }

  const pagination = (totalPages > 1) ? <Pagination
    boundaryRange={0}
    activePage={activePage}
    totalPages={totalPages}
    onPageChange={onPageChange}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    className='mt-2 mb-3'
  /> : null

  return (
    <Requests name={name}>
      <Container fluid>
        <h3>Requests</h3>
        {pagination}
        {error && <Alert variant="danger">{error.message}</Alert>}
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
        {pagination}

      </Container>
    </Requests>
  );

};

const mapStateToProps = (state) => {
  return {
    hasLogin: state.auth.access !== null,
    token: state.auth.access,
    loading: state.requestList.loading,
    requests: state.requestList.requests,
    name: state.auth.name,
    error: state.requestList.error,

  }
}

export default connect(mapStateToProps, { fetchRequests })(RequestList);
