import * as actionTypes from './actionTypes';
import axios from '../../../../../shared/axios';
import { setAlert } from '../../../../../components/Alert/store/actions/actions';

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

export const fetchRequests = (page) => {
    return dispatch => {
        dispatch(fetchRequestsStart());
        const url = `/requests/requester/?page=${page}`;

        axios.get(url)
            .then(response => {
                const payload = response.data;
                dispatch(fetchRequestsSuccess(payload));
            })
            .catch(error => {
                dispatch(fetchRequestsFail(error));
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

export const createRequest = (body) => {
    return dispatch => {
        dispatch(createRequestStart());
        const url = '/requests/requester/';

        axios.post(url, body)
            .then(response => {
                const payload = response.data;
                dispatch(createRequestSuccess(payload));
                dispatch(fetchRequests(1))
                dispatch(setAlert(`Request #${payload.id} successfully created`, "success"));
            })
            .catch(error => {
                dispatch(createRequestFail(error));
                dispatch(setAlert("Failed to create a request, please try again", "danger"));
            })
    }
};