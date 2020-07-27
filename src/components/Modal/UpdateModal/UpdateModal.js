import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = (props) => {
    const { showUpdateModal, closeModalHandler, updateHanlder } = props
    return (
        < Modal show={showUpdateModal} centered onHide={closeModalHandler} >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delivered</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please confirm your delivery!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModalHandler}>
                    Close
          </Button>
                <Button variant="success" onClick={updateHanlder}>
                    Confirm!
          </Button>
            </Modal.Footer>
        </Modal >
    )
};

export default DeleteModal;