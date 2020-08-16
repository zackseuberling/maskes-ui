import React, { useEffect } from 'react';
import bsCustomFileInput from 'bs-custom-file-input';
import { Form, InputGroup, Button } from 'react-bootstrap';

const ReimbursementForm = (props) => {
    useEffect(() => {
        bsCustomFileInput.init();
    })

    const { formData, setFormData, requestReimbursement, volunteerId, token } = props
    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const fileChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.files[0] });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        requestReimbursement(formData, volunteerId, token);
    }

    return (
        <Form inline onSubmit={handleSubmit}>
            <InputGroup className="mb-2 mr-sm-2">
                <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
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
                    name="reimbursement"
                    onChange={onChange}
                    placeholder="Reimbursement"
                    type="number"
                    min={0} step={0.01} max={300} />
            </InputGroup>

            <InputGroup className="mb-2 mr-sm-2">
                <Form.File
                    className="mr-5"
                    id="receipt"
                    label="Upload Receipt"
                    custom
                    onChange={fileChangeHandler}
                    accept="image/png, image/jpeg"
                />
            </InputGroup>

            <Button type="submit" className="mb-2 mr-sm-2">
                Submit
        </Button>
        </Form>
    )
};

export default ReimbursementForm;