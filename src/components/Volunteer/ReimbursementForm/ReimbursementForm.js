import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const ReimbursementForm = (props) => (
    <Form inline>
        <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control name="totalCost" placeholder="Total cost" type="number" />
        </InputGroup>

        <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control name="reimbursement" placeholder="Reimbursement" type="number" />
        </InputGroup>

        <InputGroup className="mb-2 mr-sm-2">
            <Form.File
                id="receipt"
                label="Upload Receipt"
                custom
            />
        </InputGroup>

        <Button type="submit" className="mb-2 mr-sm-2">
            Submit
        </Button>
    </Form>
);

export default ReimbursementForm;