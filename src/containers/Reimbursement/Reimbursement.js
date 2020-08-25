import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import { Table, Button, Image, Popover, OverlayTrigger, Badge, Spinner } from 'react-bootstrap';
import ReimbursementForm from '../../components/Form/ReimbursementForm';
import { requestReimbursement, fetchReimbursement, updateReimbursement, deleteReimbursement } from './store/actions/actions';
import DeleteModal from './DeleteModal';
import './Reimbursement.css'


const Reimbursement = (props) => {

    const { requestReimbursement, fetchReimbursement,
        updateReimbursement, deleteReimbursement,
        volunteerId, reimbursement_detail, token, reimbursement, loading,
        reimbursementId
    } = props;

    const [onEdit, setOnEdit] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [reimbursementFormData, setReimbursementFormData] = useState(reimbursement_detail ? {
        total_cost: reimbursement_detail.total_cost,
        amount: reimbursement_detail.amount,
        note: reimbursement_detail.volunteer_notes,
        receipt: null,
    } : null);


    const handleCreate = (formData) => {
        requestReimbursement(formData, volunteerId, token);
    };

    const handleUpdate = (formData) => {
        updateReimbursement(formData, volunteerId, token, reimbursementId);
        setOnEdit(false);
    };

    const handleDelete = () => {
        deleteReimbursement(reimbursementId, token, volunteerId);
        setShowDeleteModal(false);
    };

    useEffect(() => {
        if (reimbursement_detail) {
            fetchReimbursement(reimbursement_detail.id, token)
        }
    }, [token, reimbursement_detail, fetchReimbursement, deleteReimbursement, volunteerId, reimbursementId]);


    let display = <Spinner animation="border" style={{ marginLeft: '40%' }} />

    if (!loading) {
        display = (
            !reimbursement || onEdit ? <ReimbursementForm
                formData={reimbursementFormData}
                setFormData={setReimbursementFormData}
                create={handleCreate}
                update={handleUpdate}
                remove={handleDelete}
                onEdit={onEdit}
                setOnEdit={setOnEdit}
            /> : <Aux>
                    <Badge variant={reimbursement.status === 'In Process' ? "warning" : "success"} className='mb-2'>{reimbursement.status}</Badge>

                    <Table size="sm" responsive='sm'>
                        <tbody>
                            <tr><td>Reimbursement #</td><td>{reimbursement.id}</td></tr>
                            <tr><td>Total Cost</td><td>{reimbursement.total_cost}</td></tr>
                            <tr><td>Request Amount</td><td>{reimbursement.amount}</td></tr>
                            <tr><td>Note</td><td>{reimbursement.volunteer_notes}</td></tr>
                            <tr>
                                <OverlayTrigger
                                    trigger="click"
                                    placement="top"
                                    overlay={
                                        <Popover id="popover-basic">
                                            <Popover.Title as="h3">
                                                <a style={{ display: "table-cell" }}
                                                    rel="noopener noreferrer"
                                                    href={reimbursement.receipt_photo}
                                                    target="_blank">Receipt Photo</a>
                                            </Popover.Title>

                                            <Popover.Content>
                                                <Image src={reimbursement.receipt_photo} thumbnail fluid />
                                            </Popover.Content>
                                        </Popover>
                                    }
                                >
                                    <td className="receipt-link">Receipt</td>
                                </OverlayTrigger>
                            </tr>
                        </tbody>
                    </Table>
                    {reimbursement.status !== 'Completed' &&
                        <div>
                            <Button
                                className='mt-1 mb-3 mr-2 edit-reimbursement-button'
                                onClick={() => setOnEdit(true)}
                            >Edit</Button>
                            <Button
                                className='mt-1 mb-3'
                                variant='outline-danger'
                                onClick={() => {
                                    setShowDeleteModal(true);
                                }}
                            >Cancel</Button>
                        </div>}
                </Aux>

        )
    }

    return <div>
        <DeleteModal
            showDeleteModal={showDeleteModal}
            closeModalHandler={() => setShowDeleteModal(false)}
            deleteHandler={handleDelete} />
        <h5 style={{ fontWeight: 'bold' }}>Reimbursement Infomation</h5>
        {display}
    </div>

};

const mapStateToProps = (state) => {
    return {
        token: state.auth.access,
        loading: state.reimbursement.loading,
        reimbursement: state.reimbursement.reimbursement,
        error: state.reimbursement.error,
    }
}

export default connect(mapStateToProps, {
    requestReimbursement, fetchReimbursement,
    updateReimbursement, deleteReimbursement
})(Reimbursement);