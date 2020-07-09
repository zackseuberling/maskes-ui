import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchRequestsStart = () => {
    return {
        type: actionTypes.FETCH_REQUESTS_START
    };
}

export const fetchRequestsSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_REQUESTS_SUCCESS,
        payload: payload
    };
}

export const fetchRequestsFail = (error) => {
    return {
        type: actionTypes.FETCH_REQUESTS_FAIL,
        error: error
    };
}

export const fetchRequests = (page, token) => {
    return dispatch => {
        dispatch(fetchRequestsStart());
        const url = `http://127.0.0.1:8000/requests/?page=${page}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.get(url, config)
            .then(response => {
                const payload = response.data;
                dispatch(fetchRequestsSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchRequestsFail(error))
            })
    }
};
