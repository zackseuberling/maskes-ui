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

//SIGNUP FOR VOLUNTEERING
export const volunteeringStart = () => {
    return {
        type: actionTypes.VOLUNTEERING_START
    };
}

export const volunteeringFail = (error) => {
    return {
        type: actionTypes.VOLUNTEERING_FAIL,
        error: error
    };
}

export const volunteeringSuccess = (payload) => {
    return {
        type: actionTypes.VOLUNTEERING_SUCCESS,
        payload: payload
    };
}

export const volunteering = (requestId, token) => {
    return dispatch => {
        dispatch(volunteeringStart());
        const url = 'http://127.0.0.1:8000/requests/volunteering/'
        const body = {
            request: requestId,
            status: 'Signed Up'
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.post(url, body, config)
            .then(response => {
                const payload = response.data;
                dispatch(volunteeringSuccess(payload));
            })
            .catch(error => {
                dispatch(volunteeringFail(error));
            })
    }
}