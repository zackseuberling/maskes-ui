import * as actionTypes from './actionTypes';
import axios from 'axios';

// FETCH REQUESTS
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

// CREATE REQUEST
export const createRequestStart = () => {
    return {
        type: actionTypes.CREATE_REQUEST_START
    };
}

export const createRequestSuccess = (payload) => {
    return {
        type: actionTypes.CREATE_REQUEST_SUCCESS,
        payload: payload
    };
}

export const createRequestFail = (error) => {
    return {
        type: actionTypes.CREATE_REQUEST_FAIL,
        error: error
    };
}

export const createRequest = (body, token) => {
    return dispatch => {
        dispatch(createRequestStart());
        const url = 'http://127.0.0.1:8000/requests/';
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.post(url, body, config)
            .then(response => {
                const payload = response.data;
                dispatch(createRequestSuccess(payload))
            })
            .catch(error => {
                dispatch(createRequestFail(error))
            })
    }
};