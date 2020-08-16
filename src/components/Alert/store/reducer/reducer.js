import * as actionTypes from '../actions/actionTypes';

const initialState = [];

export const createAlert = (state, action) => {
    return [...state, action.payload]
};

export const removeAlert = (state, action) => {
    return state.filter(alert => alert.id !== action.alertId);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALERT: return createAlert(state, action)
        case actionTypes.REMOVE_ALERT: return removeAlert(state, action)
        default:
            return state;
    }
};

export default reducer;