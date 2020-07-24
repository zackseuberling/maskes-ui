import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const fetchVolunteerDetail = (volunteerId, token) => {
    return dispatch => {
        dispatch(fetchVolunteerDetailStart());
        const url = `http://127.0.0.1:8000/requests/volunteering/${volunteerId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.get(url, config)
            .then(response => {
                const payload = response.data;
                dispatch(fetchVolunteerDetailSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchVolunteerDetailFail(error))
            })
    }
};


