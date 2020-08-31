import * as actionTypes from './actionTypes';
import axios from '../../../../../shared/axios';
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

export const fetchVolunteerRequests = (page, searchValues) => {
    return dispatch => {
        dispatch(fetchVolunteerRequestsStart());

        let url = `/requests/volunteer/?page=${page}`;

        axios.post(url, searchValues)
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