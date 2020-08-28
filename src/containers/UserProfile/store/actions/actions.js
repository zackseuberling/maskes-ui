import axios from '../../../../shared/axios';
import * as actionTypes from './actionTypes';

export const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_PROFILE_START
    }
}

export const fetchProfileSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        payload: payload
    }
}

export const fetchProfileFail = (error) => {
    return {
        type: actionTypes.FETCH_PROFILE_FAIL,
        error: error
    }
}

export const fetchProfile = (userId, token) => {
    return dispatch => {
        dispatch(fetchProfileStart());

        const url = `/profile/${userId}/`
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.get(url, config)
            .then(response => {
                const payload = response.data
                dispatch(fetchProfileSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchProfileFail(error))
            })

    }
}
