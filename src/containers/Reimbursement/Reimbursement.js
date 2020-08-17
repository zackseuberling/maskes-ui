import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import { Table, Button, Image, Popover, OverlayTrigger, Badge } from 'react-bootstrap';
import ReimbursementForm from '../../components/Form/ReimbursementForm';
import { requestReimbursement, fetchReimbursement } from './store/actions/actions';
import './Reimbursement.css'


const Reimbursement = (props) => {

    const { requestReimbursement, fetchReimbursement, volunteerId, reimbursement, token } = props

    useEffect(() => {
        if (reimbursement) {
            fetchReimbursement(reimbursement.id, token)
        }
    }, [token, reimbursement, fetchReimbursement])

    const [reimbursementFormData, setReimbursementFormData] = useState({
        total_cost: null,
        reimbursement: null,
        receipt: null,
    });

    return (
        !reimbursement ? <ReimbursementForm
            formData={reimbursementFormData}
            setFormData={setReimbursementFormData}
            requestReimbursement={requestReimbursement}
            volunteerId={volunteerId}
            token={token}
        /> : <Aux>
                <h5 style={{ fontWeight: 'bold' }}>Reimbursement Infomation</h5>

                <Badge variant={reimbursement.status === 'In Process' ? "warning" : "success"} className='mb-2'>{reimbursement.status}</Badge>

                <Table size="sm" responsive='sm'>
                    <tbody>
                        <tr><td>Reimbursement #</td><td>{reimbursement.id}</td></tr>
                        <tr><td>Total Cost</td><td>{reimbursement.total_cost}</td></tr>
                        <tr><td>Request Amount</td><td>{reimbursement.amount}</td></tr>
                        <tr>
                            <OverlayTrigger
                                trigger="click"
                                placement="top"
                                overlay={
                                    <Popover id="popover-basic">
                                        <Popover.Title as="h3">
                                            <a style={{ display: "table-cell" }}
                                                rel="noopener noreferrer"
                                                href={`http://142.93.99.126${reimbursement.receipt_photo}`}
                                                target="_blank">Receipt Photo</a>
                                        </Popover.Title>

                                        <Popover.Content>
                                            <Image src={`http://142.93.99.126${reimbursement.receipt_photo}`} thumbnail fluid />
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
                            className='mt-1 mb-3 mr-2'

                        >Edit</Button>
                        <Button
                            className='mt-1 mb-3'
                            variant='danger'

                        >Cancel</Button>
                    </div>}
            </Aux>
    )
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.access,
        loading: state.reimbursement.loading,
        reim: state.reimbursement.reimbursement,
        error: state.reimbursement.error,
    }
}

export default connect(mapStateToProps, { requestReimbursement, fetchReimbursement })(Reimbursement);