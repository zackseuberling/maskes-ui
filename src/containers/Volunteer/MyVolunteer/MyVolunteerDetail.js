import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
import { Spinner, Button, Container, Table } from 'react-bootstrap';
import ReimbursementForm from '../../../components/Volunteer/ReimbursementForm/ReimbursementForm';
import Volunteer from '../Volunteer';
import { connect } from 'react-redux';
import { fetchVolunteerDetail, deleteVolunteer, updateVolunteer } from './store/actions/actions';
import DeleteModal from '../../../components/Modal/DeleteModal/DeleteModal';
import UpdateModal from '../../../components/Modal/UpdateModal/UpdateModal';

const MyVolunteerDetail = (props) => {

    const { volunteer, loading, token, match, name, isMyVolunteer,
        fetchVolunteerDetail, deleteVolunteer, updateVolunteer } = props;

    const history = useHistory();

    const [myVolunteer, setMyVolunteer] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [updateId, setUpdateId] = useState({})

    useEffect(() => {
        if (isMyVolunteer) {
            setMyVolunteer(isMyVolunteer)
        }
    }, [isMyVolunteer])

    useEffect(() => {
        fetchVolunteerDetail(match.params.volunteerId, token)
    }, [fetchVolunteerDetail, token, match.params.volunteerId, updateId])


    const onMyVolunteer = (event) => {
        setMyVolunteer(!myVolunteer);
        if (!myVolunteer) {
            history.push('/volunteer/my-volunteer')
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
        history.push('/volunteer/my-volunteer/')
    }

    const confirmDeliveredHandler = () => {
        updateVolunteer(updateId, token);
        setShowUpdateModal(false);
        setUpdateId(null);
    }

    let display = []
    if (!loading && volunteer.request_detail) {
        display = (
            <Aux>
                <Table bordered striped hover size="sm" responsive='sm'>
                    <tbody >
                        <tr><td>Volunteer #</td><td>{volunteer.id}</td></tr>
                        <tr><td>Request #</td><td>{volunteer.request_detail.id}</td></tr>
                        <tr><td>Request Date</td><td>{new Date(volunteer.request_detail.created_date).toLocaleDateString()}</td></tr>
                        <tr><td>Location</td><td>{volunteer.request_detail.locations}</td></tr>
                        <tr><td>List of Items</td><td style={{ width: '80%' }}>{volunteer.request_detail.items_list}</td></tr>
                        <tr><td>Food Restrictions</td><td>{volunteer.request_detail.food_restrictions}</td></tr>
                        <tr><td>Household Size</td><td>{volunteer.request_detail.household_number}</td></tr>
                        <tr><td>Urgency</td><td>{volunteer.request_detail.urgency}</td></tr>
                        <tr><td>Volunteer Status</td><td style={volunteer.status === 'Delivered' ? { color: 'green' } : null}>{volunteer.status}</td></tr>
                    </tbody>
                </Table>

                {volunteer.status === 'Signed Up'
                    ? (<div>
                        <Button
                            className='mt-1 mb-3 mr-2'
                            onClick={() => showUpdateModalHandler(volunteer.id, volunteer.request_detail.id)}
                        >Confirm Delivered</Button>
                        <Button
                            className='mt-1 mb-3'
                            variant='danger'
                            onClick={() => showDeleteModalHandler(volunteer.id)}
                        >Cancel</Button>
                    </div>)

                    : null}
                {volunteer.status === 'Delivered'
                    ? <div>
                        <Button
                            className='mt-1 mb-3 mr-2'
                            disabled
                            variant='success'
                        >Delivered</Button>
                        <ReimbursementForm />
                    </div>
                    : null}

            </Aux>
        );
    }

    return (
        <Volunteer name={name} onMyVolunteer={onMyVolunteer} myVolunteer={myVolunteer}>
            <DeleteModal showDeleteModal={showDeleteModal} closeModalHandler={closeDeleteModalHandler} deleteHandler={volunteerDeleteHandler} />
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

    }
}

export default connect(mapStateToProps, { fetchVolunteerDetail, deleteVolunteer, updateVolunteer })(MyVolunteerDetail);