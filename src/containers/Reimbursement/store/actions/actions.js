import { setAlert } from '../../../../components/Alert/store/actions/actions';
import { fetchVolunteerDetail } from '../../../Volunteer/MyVolunteer/store/actions/actions';
import * as actionTypes from './actionTypes';
import axios from '../../../../shared/axios';

//FETCH REIMBURSEMENT
export const fetchReimbursementStart = () => {
    return {
        type: actionTypes.FETCH_REIMBURSEMENT_START
    };
}

export const fetchReimbursementSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_REIMBURSEMENT_SUCCESS,
        payload: payload
    };
}

export const fetchReimbursementFail = (error) => {
    return {
        type: actionTypes.FETCH_REIMBURSEMENT_FAIL,
        error: error
    };
}

export const fetchReimbursement = (reimbursementId, token) => {
    return dispatch => {
        dispatch(fetchReimbursementStart());
        const url = `/funds/reimbursement/${reimbursementId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.get(url, config)
            .then(response => {
                const payload = response.data;
                dispatch(fetchReimbursementSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchReimbursementFail(error))
                dispatch(setAlert("Failed to fetch data from server", "danger"));
            })
    }
};

//DELETE REIMBURSEMENT

export const deleteReimbursementStart = () => {
    return {
        type: actionTypes.DELETE_REIMBURSEMENT_START
    };
}

export const deleteReimbursementSuccess = (status) => {
    return {
        type: actionTypes.DELETE_REIMBURSEMENT_SUCCESS,
        status: status
    };
}

export const deleteReimbursementFail = (error) => {
    return {
        type: actionTypes.DELETE_REIMBURSEMENT_FAIL,
        error: error
    };
}

export const deleteReimbursement = (reimbursementId, token) => {
    return dispatch => {
        dispatch(deleteReimbursementStart());
        const url = `/funds/reimbursement/${reimbursementId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.delete(url, config)
            .then(response => {
                const status = response.status;
                dispatch(deleteReimbursementSuccess(status));
                dispatch(setAlert(`Your reimbursement #${reimbursementId} has been canceled`, "warning"));
            })
            .catch(error => {
                dispatch(deleteReimbursementFail(error));
                dispatch(setAlert(`Failed to cancel reimbursement #${reimbursementId} data from server`, "danger"));
            })
    }
};

//UPDATE REIMBURSEMENT
export const updateReimbursementStart = () => {
    return {
        type: actionTypes.UPDATE_REIMBURSEMENT_START
    };
}

export const updateReimbursementSuccess = (status) => {
    return {
        type: actionTypes.UPDATE_REIMBURSEMENT_SUCCESS,
        status: status
    };
}

export const updateReimbursementFail = (error) => {
    return {
        type: actionTypes.UPDATE_REIMBURSEMENT_FAIL,
        error: error
    };
}


export const updateReimbursement = ({ total_cost, reimbursement, receipt }, reimbursementId, token) => {
    return dispatch => {
        dispatch(updateReimbursementStart());
        const url = `/funds/reimbursement/${reimbursementId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        };
        let form_data = new FormData();
        form_data.append('receipt_photo', receipt);
        form_data.append('total_cost', parseFloat(total_cost));
        form_data.append('amount', parseFloat(reimbursement));
        form_data.append('status', 'Completed');
        form_data.append('reimbursement', reimbursementId);

        axios.put(url, form_data, config)
            .then(response => {
                const status = response.status;
                dispatch(updateReimbursementSuccess(status));
                dispatch(fetchReimbursement(reimbursementId, token));
                dispatch(setAlert(`Reimbursement #${reimbursementId} completed.`, "success"));
            })
            .catch(error => {
                dispatch(updateReimbursementFail(error));
                dispatch(setAlert(`Failed to update status for reimbursement #${reimbursementId}`, "danger"));
            })
    }
};


//CREATE REIMBURSEMENT
export const requestReimbursementStart = () => {
    return {
        type: actionTypes.REQUEST_REIMBURSEMENT_START
    };
}

export const requestReimbursementSuccess = (status) => {
    return {
        type: actionTypes.REQUEST_REIMBURSEMENT_SUCCESS,
        status: status
    };
}

export const requestReimbursementFail = (error) => {
    return {
        type: actionTypes.REQUEST_REIMBURSEMENT_FAIL,
        error: error
    };
}


export const requestReimbursement = ({ total_cost, reimbursement, receipt }, volunteerId, token) => {
    return dispatch => {
        dispatch(requestReimbursementStart());
        const url = '/funds/reimbursement/';
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        };
        let form_data = new FormData();
        form_data.append('receipt_photo', receipt);
        form_data.append('total_cost', parseFloat(total_cost));
        form_data.append('amount', parseFloat(reimbursement));
        form_data.append('status', 'In Process');
        form_data.append('volunteer', volunteerId);

        axios.post(url, form_data, config)
            .then(response => {
                const reimbursementId = response.data.id
                dispatch(requestReimbursementSuccess(response.status));
                dispatch(setAlert(`Successfully create reimbursement #${reimbursementId}.`, "success"));
                dispatch(fetchVolunteerDetail(volunteerId, token));
                // dispatch(fetchReimbursement(reimbursementId, token));
            })
            .catch(error => {
                dispatch(requestReimbursementFail(error));
                dispatch(setAlert('Failed to create reimbursement', "danger"));
            })
    }
};



