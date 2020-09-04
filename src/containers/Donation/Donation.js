import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDonation, createDonation, updateDonation, deleteDonation } from './store/actions/actions';
import Aux from '../../hoc/Aux/Aux';
import { Badge, Table, Button, Spinner, ProgressBar } from 'react-bootstrap';
import DonationForm from '../../components/Form/DonationForm';
import EditDonationModal from './EditDonationModal/EditDonationModal';
import DeleteDonationModal from '../../components/Modal/DeleteModal/DeleteModal';
import { FaDonate } from 'react-icons/fa';
import EditMenu from './EditMenu/EditMenu';
import moment from 'moment';
import './Donation.css';

const Donation = (props) => {
    const { donation, loading, reimbursementId,
        supporter, supporterId,
        reimbursementStatus, reimbursementAmount,
        onDonate, setOnDonate,
        fetchDonation, createDonation,
        updateDonation, deleteDonation, userId } = props;

    const history = useHistory()

    const [dns, setDns] = useState([])

    useEffect(() => {
        fetchDonation(reimbursementId)
    }, [fetchDonation, reimbursementId])

    useEffect(() => {
        setDns(donation ?
            donation.map((d, i) => {
                d.key = i;
                d.showEdit = false;
                d.showDelete = false;
                return d
            }) : [])
    }, [donation, fetchDonation])

    let display = <Spinner animation="grow" />

    const toggleShowModal = (e, i, type) => {
        setDns(dns.map((d, j) => {
            if (j === i) {
                if (type === "update") {
                    d.showEdit = !d.showEdit
                } else if (type === "delete") {
                    d.showDelete = !d.showDelete
                }
                return d
            } else {
                return d
            }
        }))
    };


    if (donation && !loading && dns) {
        const total_donation = dns.reduce((t, d) => t + parseInt(d.amount), 0);
        const total_reimbursement = parseInt(reimbursementAmount);
        let progress = Math.floor((total_donation / total_reimbursement) * 100);
        progress = (progress > 100) ? 100 : progress
        const donation_progress = <ProgressBar variant={progress === 100 ? "success" : "primary"} animated now={progress} label={`${progress}%`} />;
        display = (
            <Aux>
                <h5 style={{ fontWeight: 'bold' }}>Donation Infomation</h5>
                <Badge variant={reimbursementStatus === 'In Process' ? "warning" : "success"} className='mb-2'>{reimbursementStatus}</Badge>
                <h6 className="my-">Delivery Supporter <Button variant="link" onClick={() => history.push(`/profile/${supporterId}`)}>{supporter}</Button></h6>
                <h5 style={{ display: "flex" }}>Amount Needed: ${reimbursementAmount}</h5>
                {donation_progress}
                <Table size="sm" responsive='sm'>
                    <thead>
                        <tr>
                            <th>Donator</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {dns.map((d, idx) => <tr key={idx}>
                            <td
                                className="l-button"
                                onClick={() => history.push(`/profile/${d.donator.id}`)}
                            >{d.donator.display_name}</td>
                            <td>{d.amount}</td>
                            <td>{d.status}</td>
                            <td>{moment(d.updated_date).fromNow()}</td>
                            <td>{
                                parseInt(userId) === d.donator.id &&
                                <Aux>
                                    <EditDonationModal
                                        handleClose={(e) => toggleShowModal(e, idx, "update")}
                                        show={d.showEdit}
                                        donationId={d.id}
                                        update={updateDonation}
                                        donationAmount={d.amount}
                                        donationStatus={d.status === "Sent"}
                                        reimbursementId={reimbursementId}
                                    />
                                    <DeleteDonationModal
                                        showDeleteModal={d.showDelete}
                                        closeModalHandler={(e) => toggleShowModal(e, idx, "delete")}
                                        deleteHandler={() => deleteDonation(d.id, reimbursementId)}
                                        label={`donation ${d.amount}`}
                                    />

                                    <EditMenu
                                        toggleShowEditModal={(e) => toggleShowModal(e, idx, "update")}
                                        toggleShowDeleteModal={(e) => toggleShowModal(e, idx, "delete")}
                                    />
                                    {/* <BsThreeDots onClick={(e) => toggleShowModal(e, idx, "update")} className="edit-dots" /> */}
                                </Aux>
                            }</td>
                        </tr>)}
                    </tbody>
                </Table>
            </Aux>

        )
    }

    return (
        <Aux>

            {!onDonate
                ? <Button size='lg'
                    className='mt-1 mb-3 '
                    variant='outline-primary donate-button'
                    onClick={() => setOnDonate(true)}
                >Donate! <FaDonate className='mb-1' /></Button>
                : <DonationForm
                    reimbursementId={reimbursementId}
                    setOnDonate={setOnDonate}
                    create={createDonation}
                />

            }


            {display}
        </Aux>

    )
};

const mapStateToProps = state => {
    return {
        donation: state.donation.donation,
        loading: state.donation.loading,
    }
}

export default connect(mapStateToProps, { fetchDonation, createDonation, updateDonation, deleteDonation })(Donation);