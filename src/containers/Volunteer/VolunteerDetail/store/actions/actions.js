import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchVolunteerRequestDetailStart = () => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_REQUEST_DETAIL_START
    };
}

export const fetchVolunteerRequestDetailSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_REQUEST_DETAIL_SUCCESS,
        payload: payload
    };
}

export const fetchVolunteerRequestDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_REQUEST_DETAIL_FAIL,
        error: error
    };
}

export const fetchVolunteerRequestDetail = (requestId, token) => {
    return dispatch => {
        dispatch(fetchVolunteerRequestDetailStart());
        const url = `http://127.0.0.1:8000/requests/volunteer/${requestId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.get(url, config)
            .then(response => {
                const payload = response.data;
                dispatch(fetchVolunteerRequestDetailSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchVolunteerRequestDetailFail(error))
            })
    }
};
