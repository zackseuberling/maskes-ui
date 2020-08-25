import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = (props) => {
    const { showDeleteModal, closeModalHandler, deleteHandler } = props

    return (
        < Modal show={showDeleteModal} centered onHide={closeModalHandler} >
            <Modal.Header closeButton>
                <Modal.Title>Cancel Reimbursement</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to cancel this reimbusement?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModalHandler}>
                    Close
          </Button>
                <Button variant="danger" onClick={deleteHandler}>
                    Yes, Cancel
          </Button>
            </Modal.Footer>
        </Modal >
    )
};

export default DeleteModal;