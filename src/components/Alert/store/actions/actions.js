import { v4 as uuid } from 'uuid';
import * as actionTypes from './actionTypes';

const setAlert = (msg, variant, id) => {
    return {
        type: actionTypes.SET_ALERT,
        payload: { msg, variant, id }
    }
}

const removeAlert = (id) => {
    return {
        type: actionTypes.SET_ALERT,
        payload: id
    }
}

export const setAlert = (msg, variant) => dispatch => {
    const id = uuid();
    dispatch(setAlert(msg, variant, id))
    setTimeout(() => dispatch(
        removeAlert(id)
    ), 5000);
}