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

export const fetchReimbursement = (reimbursementId) => {
    return dispatch => {
        dispatch(fetchReimbursementStart());
        const url = `/funds/reimbursement/${reimbursementId}/`;
        axios.get(url)
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

export const deleteReimbursement = (reimbursementId) => {
    return dispatch => {
        dispatch(deleteReimbursementStart());
        const url = `/funds/reimbursement/${reimbursementId}/`;

        axios.delete(url)
            .then(response => {
                const status = response.status;
                dispatch(deleteReimbursementSuccess(status));
                dispatch(setAlert(`Your reimbursement #${reimbursementId} has been canceled`, "warning"));
            })
            .catch(error => {
                dispatch(deleteReimbursementFail(error));
                dispatch(setAlert(`Failed to cancel reimbursement #${reimbursementId}`, "danger"));
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


export const updateReimbursement = (formData, volunteerId, reimbursementId) => {
    return dispatch => {
        dispatch(updateReimbursementStart());
        const token = localStorage.getItem('access');
        const url = `/funds/reimbursement/${reimbursementId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        };

        const { total_cost, amount, receipt, note } = formData;

        let form_data = new FormData();
        if (receipt) {
            form_data.append('receipt_photo', receipt)
        };
        form_data.append('total_cost', parseFloat(total_cost));
        form_data.append('amount', parseFloat(amount));
        form_data.append('volunteer_notes', note);

        form_data.append('volunteer', volunteerId);

        axios.put(url, form_data, config)
            .then(response => {
                const status = response.status;
                dispatch(updateReimbursementSuccess(status));
                dispatch(fetchReimbursement(reimbursementId));
                dispatch(setAlert(`Reimbursement #${reimbursementId} updated.`, "success"));
            })
            .catch(error => {
                dispatch(updateReimbursementFail(error));
                dispatch(setAlert(`Failed to update reimbursement #${reimbursementId}`, "danger"));
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


export const requestReimbursement = (formData, volunteerId) => {
    return dispatch => {
        dispatch(requestReimbursementStart());
        const token = localStorage.getItem('access')
        const url = '/funds/reimbursement/';
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        };
        const { total_cost, amount, receipt, note } = formData;
        let form_data = new FormData();
        form_data.append('receipt_photo', receipt);
        form_data.append('total_cost', parseFloat(total_cost));
        form_data.append('amount', parseFloat(amount));
        form_data.append('volunteer_notes', note);
        form_data.append('status', 'In Process');
        form_data.append('volunteer', volunteerId);

        axios.post(url, form_data, config)
            .then(response => {
                const reimbursementId = response.data.id
                dispatch(requestReimbursementSuccess(response.status));
                dispatch(setAlert(`Successfully create reimbursement #${reimbursementId}.`, "success"));
                dispatch(fetchVolunteerDetail(volunteerId));
                // dispatch(fetchReimbursement(reimbursementId, token));
            })
            .catch(error => {
                dispatch(requestReimbursementFail(error));
                dispatch(setAlert('Failed to create reimbursement', "danger"));
            })
    }
};



