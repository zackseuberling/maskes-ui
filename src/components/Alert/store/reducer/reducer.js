import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../../shared/utility';

const initialState = [];

const setAlert = (state, action) => {
    return [...state, action.payload]
}

const removeAlert = (state, action) => {
    return state.filter(alert => alert.id !== action.id);
}

export default function (state = initialState, action) {

    switch (action.type) {
        case actionTypes.SET_ALERT: return setAlert(state, action)
        case actionTypes.REMOVE_ALERT: return removeAlert(state, action)
        default:
            return state;
    }
}