import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const EditDonationModal = (props) => {
    const { handleClose, show, update,
        donationAmount, donationStatus,
        reimbursementId, donationId } = props;

    const [formData, setFormData] = useState({
        update_amount: 0,
        update_status: false,
    })

    useEffect(() => {
        setFormData({
            update_amount: donationAmount,
            update_status: donationStatus
        })
    }, [donationAmount, donationStatus])

    const handleSubmit = (event) => {
        // event.preventDefault();
        update(formData, reimbursementId, donationId);
    }

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const onCheck = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.checked })
    }

    return (
        < Form onSubmit={handleSubmit} >
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <h3>Edit Donation</h3>
                    <hr />


                    <InputGroup className="mb-2 mr-sm-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            name="update_amount"
                            value={formData.update_amount}
                            onChange={onChange}
                            placeholder="Enter amount"
                            type="number"
                            min={0} step={0.01} max={999.99} />
                    </InputGroup>
                    <Form.Group>
                        <Form.Check
                            checked={formData.update_status}
                            label="Money transferred?"
                            name="update_status"
                            onChange={onCheck}
                        />
                    </Form.Group>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={handleSubmit} type="submit">
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </Form >
    )
};

export default EditDonationModal;