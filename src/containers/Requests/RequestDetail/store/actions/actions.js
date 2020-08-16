import * as actionTypes from './actionTypes';
import axios from '../../../../../shared/axios';
import { setAlert } from '../../../../../components/Alert/store/actions/actions';

export const fetchRequestDetailStart = () => {
    return {
        type: actionTypes.FETCH_REQUEST_DETAIL_START
    };
}

export const fetchRequestDetailSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_REQUEST_DETAIL_SUCCESS,
        payload: payload
    };
}

export const fetchRequestDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_REQUEST_DETAIL_FAIL,
        error: error
    };
}

export const fetchRequestDetail = (requestId, token) => {
    return dispatch => {
        dispatch(fetchRequestDetailStart());
        const url = `/requests/requester/${requestId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.get(url, config)
            .then(response => {
                const payload = response.data;
                dispatch(fetchRequestDetailSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchRequestDetailFail(error));
                dispatch(setAlert("Failed to fetch data from server", "danger"));
            })
    }
};
