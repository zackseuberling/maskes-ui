import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
import { Spinner, Button, Container, Table } from 'react-bootstrap';
import Reimbursement from '../../Reimbursement/Reimbursement';
import Volunteer from '../Volunteer';
import { connect } from 'react-redux';
import { fetchVolunteerDetail, deleteVolunteer, updateVolunteer } from './store/actions/actions';
import DeleteModal from '../../../components/Modal/DeleteModal/DeleteModal';
import UpdateModal from '../../../components/Modal/UpdateModal/UpdateModal';
import './MyVolunteer.css';

const MyVolunteerDetail = (props) => {

    const { volunteer, loading, token, match, name, isMyVolunteer,
        fetchVolunteerDetail, deleteVolunteer, updateVolunteer } = props;

    const history = useHistory();

    const [myVolunteer, setMyVolunteer] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [updateId, setUpdateId] = useState(null)

    const [reimbursementId, setReimbursementId] = useState()

    useEffect(() => {
        if (isMyVolunteer) {
            setMyVolunteer(isMyVolunteer)
        }
    }, [isMyVolunteer])

    useEffect(() => {
        fetchVolunteerDetail(match.params.volunteerId, token)
    }, [fetchVolunteerDetail, token, match.params.volunteerId])

    useEffect(() => {
        if (volunteer.reimbursement_detail) {
            setReimbursementId(volunteer.reimbursement_detail.id)
        }
    }, [volunteer.reimbursement_detail, setReimbursementId])

    const onMyVolunteer = (event) => {
        setMyVolunteer(!myVolunteer);
        if (!myVolunteer) {
            history.push('/volunteer/my-support')
        }
    }

    const closeDeleteModalHandler = () => setShowDeleteModal(false);
    const closeUpdateModalHandler = () => setShowUpdateModal(false);
    const showDeleteModalHandler = (volunteerId) => {
        setShowDeleteModal(true);
        setDeleteId(volunteerId);
    };
    const showUpdateModalHandler = (volunteerId, requestId) => {
        setShowUpdateModal(true);
        setUpdateId({ ...updateId, volunteerId: volunteerId, requestId: requestId })
    }

    const volunteerDeleteHandler = () => {
        deleteVolunteer(deleteId, token);
        history.push('/volunteer/my-support')
    }

    const confirmDeliveredHandler = () => {
        updateVolunteer(updateId, token);
        setShowUpdateModal(false);
    }

    let display = []
    if (!loading && volunteer.request_detail) {
        display = (
            <Aux>
                <Table bordered striped hover size="sm" responsive='sm'>
                    <tbody >
                        <tr><td>Support #</td><td>{volunteer.id}</td></tr>
                        <tr><td>Request #</td><td className='link-button' onClick={() => history.push(`/volunteer/${volunteer.request_detail.id}`)}>{volunteer.request_detail.id}</td></tr>
                        <tr><td>Request Date</td><td>{new Date(volunteer.request_detail.created_date).toLocaleDateString()}</td></tr>
                        <tr><td>Location</td><td>{volunteer.request_detail.locations}</td></tr>
                        <tr><td>List of Items</td><td style={{ width: '80%' }}>{volunteer.request_detail.items_list}</td></tr>
                        <tr><td>Food Restrictions</td><td>{volunteer.request_detail.food_restrictions}</td></tr>
                        <tr><td>Household Size</td><td>{volunteer.request_detail.household_number}</td></tr>
                        <tr><td>Urgency</td><td>{volunteer.request_detail.urgency}</td></tr>
                        <tr><td>Volunteer Status</td>
                            <td
                                style={volunteer.status === 'Delivered' ? { color: 'green' } :
                                    volunteer.status === 'Signed Up' ? { color: 'orange' } :
                                        volunteer.status === 'Ready' ? { color: '#0275d8' } : null}
                            >
                                {volunteer.status === 'Signed Up' ? "Pending review..." : volunteer.status}
                            </td>
                        </tr>
                    </tbody>
                </Table>

                {
                    (volunteer.status === 'Signed Up'
                        && <div>
                            <Button
                                disabled
                                className='mt-1 mb-3 mr-2'
                                variant='warning'>Waiting for admin...</Button>
                            <Button
                                className='mt-1 mb-3'
                                variant='danger'
                                onClick={() => showDeleteModalHandler(volunteer.id)}
                            >Cancel</Button>
                        </div>)

                    || (volunteer.status === 'Ready'
                        && <Aux>
                            <h5 style={{ fontWeight: 'bold' }}>Delivery Infomation</h5>
                            <Table size="sm" responsive='sm'>
                                <tbody>
                                    <tr><td>Name</td><td>{volunteer.request_detail.requester}</td></tr>
                                    <tr><td>Contact Phone</td><td>{volunteer.request_detail.phone}</td></tr>
                                    <tr><td>Delivery Address</td><td>{`${volunteer.request_detail.address1} ${volunteer.request_detail.address2}, ${volunteer.request_detail.city}, WA ${volunteer.request_detail.zip_code}`}</td></tr>
                                    <tr><td>Budget</td><td style={{ fontWeight: "bold", color: "green" }}>${75 + 25 * (parseInt(volunteer.request_detail.household_number) - 1)}</td></tr>
                                </tbody>
                            </Table>
                            <div>
                                <Button
                                    className='mt-1 mb-3 mr-2 confirm-button'
                                    onClick={() => showUpdateModalHandler(volunteer.id, volunteer.request_detail.id)}
                                >Confirm Delivered</Button>
                                <Button
                                    className='mt-1 mb-3'
                                    variant='outline-danger'
                                    onClick={() => showDeleteModalHandler(volunteer.id)}
                                >Cancel</Button>
                            </div>
                        </Aux>)

                    || (volunteer.status === 'Delivered'
                        && <Reimbursement
                            volunteerId={volunteer.id}
                            reimbursement_detail={volunteer.reimbursement_detail}
                            reimbursementId={reimbursementId}
                        />)
                }

            </Aux >
        );
    }

    return (
        <Volunteer name={name} onMyVolunteer={onMyVolunteer} myVolunteer={myVolunteer}>
            <DeleteModal showDeleteModal={showDeleteModal} closeModalHandler={closeDeleteModalHandler} deleteHandler={volunteerDeleteHandler} label="Volunteer" />
            <UpdateModal showUpdateModal={showUpdateModal} closeModalHandler={closeUpdateModalHandler} updateHanlder={confirmDeliveredHandler} />
            <Container fluid>
                <h3>My Volunteer Detail</h3>
                {loading
                    ? <Spinner animation="border" style={{ marginLeft: '40%' }} />
                    : display

                }
            </Container>
        </Volunteer>
    );
};

const mapStateToProps = (state) => {
    return {
        hasLogin: state.auth.access !== null,
        token: state.auth.access,
        name: state.auth.name,
        loading: state.myVolunteer.loading,
        volunteer: state.myVolunteer.volunteer,
        error: state.myVolunteer.error,
    }
}

export default connect(mapStateToProps, { fetchVolunteerDetail, deleteVolunteer, updateVolunteer })(MyVolunteerDetail);