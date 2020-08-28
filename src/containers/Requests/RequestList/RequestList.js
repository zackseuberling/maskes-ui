import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchRequests } from './store/actions/actions';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { BsBoxArrowInRight } from 'react-icons/bs';
import Requests from '../Requests';
import { Pagination } from 'semantic-ui-react';
import './RequestList.css';

const RequestList = (props) => {
  const { requests, loading, token, fetchRequests, name, history, match } = props;
  const { results, count } = requests
  const totalPages = Math.ceil(count / 21)

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchRequests(activePage, token)
    }
    return () => mounted = false;
  }, [fetchRequests, token, activePage])
  let requests_list = []

  const onPageChange = (event, pageInfo) => {
    setActivePage(pageInfo.activePage);
  }

  const selectRequestHandler = (requestId) => {
    history.push(`${match.path}/${requestId}`)
  }

  const request_status_style = {
    'New': '#5bc0de',
    'Pending': '#fcdc04',
    'In Process': '#FF8C00',
    'Completed': '#5cb85c',
    'Transfered': '#342452',
  }

  if (!loading && results) {
    requests_list = results.map((request) => (
      <Card key={request.id} className='card_shadow'>
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <Row>
              <Col>Request #{request.id}</Col>
              <Col style={
                { color: request_status_style[request.status] }}>{request.status}</Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Card.Text>Created Date: {new Date(request.created_date).toLocaleDateString()}</Card.Text>
              <Card.Text>Request List: {request.items_list}</Card.Text>
              <Button block variant='link' onClick={() => selectRequestHandler(request.id)}>Detail <BsBoxArrowInRight style={{ width: '15px', height: '15px' }} /></Button>
            </Card.Body>
          </Accordion.Collapse>

        </Accordion>
      </Card>
    )
    );
  } else {
    requests_list = <p>You haven't made any request yet!</p>

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
        {loading
          ? <Spinner animation="grow" />
          : <CardColumns className='card_columns'>{requests_list}</CardColumns>}
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
