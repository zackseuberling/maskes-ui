import React, { useState } from 'react';
import Aux from '../../hoc/Aux/Aux';
import { Form, InputGroup, Button } from 'react-bootstrap';

const DonationForm = (props) => {

    const { setOnDonate,
        reimbursementId,
        create } = props

    const [formData, setFormData] = useState({
        donation_amount: null,
        donation_status: null,
    })

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const onCheck = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.checked })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        create(formData, reimbursementId);
    }

    return (
        <Aux>
            < Form onSubmit={handleSubmit} >
                <h5 style={{ fontWeight: "bold" }}>Donation Instruction</h5>
                <p>
                    Please contact the delivery supporter of this request for ways to transfer money.
                    Check out their profile for more contact infomation.
                If you have any question please contact our admins via <a href="mailto: admin@skcema.org">admin@skcema.org</a>
                </p>
                <p>Thank you for being an amazing supporter!</p>
                <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        name="donation_amount"
                        onChange={onChange}
                        placeholder="Enter amount"
                        type="number"
                        min={0} step={0.01} max={999.99} />
                </InputGroup>
                <Form.Group>
                    <Form.Check
                        label="Money transferred?"
                        name="donation_status"
                        onChange={onCheck}
                    />
                </Form.Group>
                <Button variant="warning" size="sm" type="submit" className='mr-1'>Submit</Button>
                <Button variant='secondary' size="sm"
                    onClick={() => setOnDonate(false)}>Cancel</Button>
                <hr />

            </Form >
        </Aux>)
};

export default DonationForm;