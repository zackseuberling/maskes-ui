import { setAlert } from '../../../../../components/Alert/store/actions/actions';
import * as actionTypes from './actionTypes';
import axios from '../../../../../shared/axios';

//VOLUNTEER LIST
export const fetchVolunteerListStart = () => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_LIST_START
    };
}

export const fetchVolunteerListSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_LIST_SUCCESS,
        payload: payload
    };
}

export const fetchVolunteerListFail = (error) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_LIST_FAIL,
        error: error
    };
}

export const fetchVolunteerList = (page) => {
    return dispatch => {
        dispatch(fetchVolunteerListStart());
        const url = `/requests/volunteering/?page=${page}`;

        axios.get(url)
            .then(response => {
                const payload = response.data;
                dispatch(fetchVolunteerListSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchVolunteerListFail(error))
                dispatch(setAlert("Failed to fetch data from server", "danger"));
            })
    }
};

//VOLUNTEER DETAIL
export const fetchVolunteerDetailStart = () => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_DETAIL_START
    };
}

export const fetchVolunteerDetailSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_DETAIL_SUCCESS,
        payload: payload
    };
}

export const fetchVolunteerDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_DETAIL_FAIL,
        error: error
    };
}

export const fetchVolunteerDetail = (volunteerId) => {
    return dispatch => {
        dispatch(fetchVolunteerDetailStart());
        const url = `/requests/volunteering/${volunteerId}/`;

        axios.get(url)
            .then(response => {
                const payload = response.data;
                dispatch(fetchVolunteerDetailSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchVolunteerDetailFail(error))
                dispatch(setAlert("Failed to fetch data from server", "danger"));
            })
    }
};

//DELETE VOLUNTEER

export const deleteVolunteerStart = () => {
    return {
        type: actionTypes.DELETE_VOLUNTEER_START
    };
}

export const deleteVolunteerSuccess = (status) => {
    return {
        type: actionTypes.DELETE_VOLUNTEER_SUCCESS,
        status: status
    };
}

export const deleteVolunteerFail = (error) => {
    return {
        type: actionTypes.DELETE_VOLUNTEER_FAIL,
        error: error
    };
}

export const deleteVolunteer = (volunteerId) => {
    return dispatch => {
        dispatch(deleteVolunteerStart());
        const url = `/requests/volunteering/${volunteerId}/`;

        axios.delete(url)
            .then(response => {
                const status = response.request.status;
                dispatch(deleteVolunteerSuccess(status));
                dispatch(fetchVolunteerList(1))
                dispatch(setAlert(`Your volunteer #${volunteerId} has been canceled, the corresponding request will be available for all volunteers`, "warning"));
            })
            .catch(error => {
                dispatch(deleteVolunteerFail(error));
                dispatch(setAlert(`Failed to cancel volunteer #${volunteerId} data from server`, "danger"));
            })
    }
};

//UPDATE VOLUNTEER
export const updateVolunteerStart = () => {
    return {
        type: actionTypes.UPDATE_VOLUNTEER_START
    };
}

export const updateVolunteerSuccess = (status) => {
    return {
        type: actionTypes.UPDATE_VOLUNTEER_SUCCESS,
        status: status
    };
}

export const updateVolunteerFail = (error) => {
    return {
        type: actionTypes.UPDATE_VOLUNTEER_FAIL,
        error: error
    };
}


export const updateVolunteer = ({ volunteerId, requestId }) => {
    return dispatch => {
        dispatch(updateVolunteerStart());
        const url = `/requests/volunteering/${volunteerId}/`;

        const body = {
            request: requestId,
            status: "Delivered"
        }
        axios.put(url, body)
            .then(response => {
                const status = response.request.status;
                dispatch(updateVolunteerSuccess(status));
                dispatch(fetchVolunteerDetail(volunteerId));
                dispatch(setAlert(`Successfully confirmed delivery for request #${requestId}.`, "success"));
                dispatch(setAlert("Please fill out reimbursement form if needed.", "info"))
            })
            .catch(error => {
                dispatch(updateVolunteerFail(error));
                dispatch(setAlert(`Failed to update delivery status for request #${requestId}`, "danger"));
            })
    }
};



