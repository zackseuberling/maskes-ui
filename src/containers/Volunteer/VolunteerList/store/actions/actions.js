import * as actionTypes from './actionTypes';
import axios from 'axios';
import { setAlert } from '../../../../../components/Alert/store/actions/actions';

// FETCH REQUESTS
export const fetchVolunteerRequestsStart = () => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_REQUESTS_START
    };
}

export const fetchVolunteerRequestsSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_REQUESTS_SUCCESS,
        payload: payload
    };
}

export const fetchVolunteerRequestsFail = (error) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_REQUESTS_FAIL,
        error: error
    };
}

export const fetchVolunteerRequests = (page, token, searchValues) => {
    return dispatch => {
        dispatch(fetchVolunteerRequestsStart());

        let url = `http://127.0.0.1:8000/requests/volunteer/?page=${page}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.post(url, searchValues, config)
            .then(response => {
                const payload = response.data;
                dispatch(fetchVolunteerRequestsSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchVolunteerRequestsFail(error))
                dispatch(setAlert("Failed to fetch data from server", "danger"));
            })
    }
};