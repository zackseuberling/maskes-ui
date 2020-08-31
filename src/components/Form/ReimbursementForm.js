import React, { useEffect } from 'react';
import bsCustomFileInput from 'bs-custom-file-input';
import { Form, InputGroup, Button } from 'react-bootstrap';
import './ReimbursementForm.css';

const ReimbursementForm = (props) => {
    useEffect(() => {
        bsCustomFileInput.init();
    })

    const { formData, setFormData,
        onEdit, setOnEdit,
        create, update } = props

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const fileChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.files[0] });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onEdit ? update(formData) : create(formData)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-2 mr-sm-2">
                <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    value={onEdit ? formData.total_cost : undefined}
                    name="total_cost"
                    onChange={onChange}
                    placeholder="Total cost"
                    type="number"
                    min={0} step={0.01} max={999.99} />
            </InputGroup>

            <InputGroup className="mb-2 mr-sm-2">
                <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    name="amount"
                    value={onEdit ? formData.amount : undefined}
                    onChange={onChange}
                    placeholder="Reimbursement"
                    type="number"
                    min={0} step={0.01} max={300} />
            </InputGroup>

            <InputGroup className="mb-2 mr-sm-2">
                <Form.Control
                    as="textarea" rows="3"
                    name="note"
                    value={onEdit ? formData.note : undefined}
                    onChange={onChange}
                    placeholder="Note" />
            </InputGroup>

            <InputGroup className="mb-2 mr-sm-2">
                <Form.File
                    required={!onEdit}
                    className="mr-5"
                    id="receipt"
                    label={onEdit ? "Upload Another Receipt" : "Upload Receipt"}
                    custom
                    onChange={fileChangeHandler}
                    accept="image/png, image/jpeg"
                />
            </InputGroup>

            <Button type="submit" className="mt-3 mb-3 mr-sm-2 create-reimbursement-button">
                Submit
            </Button>
            {onEdit ? <Button variant="secondary" className='mt-3 mb-3'
                onClick={() => setOnEdit(false)}>Cancel</Button> : null}

        </Form>
    )
};

export default ReimbursementForm;