import { v4 as uuid } from 'uuid';
import * as actionTypes from './actionTypes';

export const createAlert = (msg, variant, id) => {
    return {
        type: actionTypes.SET_ALERT,
        payload: { msg, variant, id }
    }
}

export const removeAlert = (id) => {
    return {
        type: actionTypes.REMOVE_ALERT,
        alertId: id
    }
}

export const setAlert = (msg, variant) => {
    return dispatch => {
        const id = uuid();
        dispatch(createAlert(msg, variant, id))
        setTimeout(
            () => dispatch(
                removeAlert(id)
            ), 5000);
    }
}