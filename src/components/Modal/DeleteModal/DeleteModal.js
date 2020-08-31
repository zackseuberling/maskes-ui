import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './DeleteModal.css';

const DeleteModal = (props) => {
    const { showDeleteModal, closeModalHandler, deleteHandler, label } = props
    return (
        < Modal show={showDeleteModal} centered onHide={closeModalHandler} >
            <Modal.Header closeButton>
                <Modal.Title>Cancel {label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to cancel this {label}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModalHandler}>
                    Close
          </Button>
                <Button variant="outline-danger" className="delete-button" onClick={deleteHandler}>
                    Yes, Cancel
          </Button>
            </Modal.Footer>
        </Modal >
    )
};

export default DeleteModal;