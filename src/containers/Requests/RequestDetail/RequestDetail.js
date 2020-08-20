import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { fetchRequestDetail } from './store/actions/actions';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Requests from '../Requests';

const RequestDetail = (props) => {
  const { request, loading, token, fetchRequestDetail, name } = props;

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchRequestDetail(props.match.params.requestId, token)
    };
    return () => mounted = false;
  }, [fetchRequestDetail, token, props.match.params.requestId])

  let request_detail = {}
  if (!loading && request) {
    console.log(request);
    request_detail = (
      <tbody>
        <tr><td>Request #</td><td>{request.id}</td></tr>
        <tr><td>Request Status</td><td>{request.status}</td></tr>
        <tr><td>Created Date</td><td>{new Date(request.created_date).toLocaleDateString()}</td></tr>
        <tr><td>Phone</td><td>{request.phone}</td></tr>
        <tr><td>Address</td><td>{`${request.address1} ${request.address2}, ${request.city}, WA ${request.zip_code}`}</td></tr>
        <tr><td>Locations</td><td>{request.locations}</td></tr>
        <tr><td>Contact Preference</td><td>{request.contact_preference}</td></tr>
        <tr><td>Prefered Foods</td><td>{request.prefered_food}</td></tr>
        <tr><td>List of Items</td><td style={{ width: '80%' }}>{request.items_list}</td></tr>
        <tr><td>Food Restrictions</td><td>{request.food_restrictions}</td></tr>
        <tr><td>Urgency</td><td>{request.urgency}</td></tr>
        <tr><td>Household Size</td><td>{request.household_number}</td></tr>
        <tr><td>Financial Support</td><td>{request.financial_support}</td></tr>
        <tr><td>Special Info</td><td>{request.special_info}</td></tr>
        <tr><td>Share Info with Volunteer</td><td>{request.share_info ? "Yes" : "No"}</td></tr>
        <tr><td>Checkin</td><td>{request.need_checkin}</td></tr>
        <tr><td>Extra Info</td><td>{request.extra_info}</td></tr>
        <tr><td>Mutual Aid Pod</td><td>{request.ma_pod_setup ? "Yes" : "No"}</td></tr>
        <tr><td>Resources Offer</td><td>{request.offer_resources}</td></tr>
      </tbody>
    )
  }

  return (
    <Requests name={name}>
      <Container fluid>
        <h3>My Request Detail</h3>
        {loading
          ? <Spinner animation="grow" />
          : <Table striped bordered hover size="sm">

            {request_detail}

          </Table>
        }
      </Container>
    </Requests>
  );
};

const mapStateToProps = (state) => {
  return {
    hasLogin: state.auth.access !== null,
    token: state.auth.access,
    loading: state.requestDetail.loading,
    request: state.requestDetail.request,
    name: state.auth.name,
    error: state.requestDetail.error,
  }
}

export default connect(mapStateToProps, { fetchRequestDetail })(RequestDetail);