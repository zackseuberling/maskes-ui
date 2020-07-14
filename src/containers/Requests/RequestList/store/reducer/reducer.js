import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../../shared/utility';

const initialState = {
    requests: [],
    loading: false,
    name: '',
}

// FETCH REQUEST
const fetchRequestsSuccess = (state, action) => {
    return updateObject(state, {
        requests: action.payload,
        loading: false,
        name: action.payload.results[0].name,
    });
}

const fetchRequestsStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchRequestsFail = (state, action) => {
    return updateObject(state, { loading: false });
}

// CREATE REQUEST
const createRequestSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
}

const createRequestStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const createRequestFail = (state, action) => {
    return updateObject(state, { loading: false });
}

// REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REQUESTS_SUCCESS: return fetchRequestsSuccess(state, action);
        case actionTypes.FETCH_REQUESTS_START: return fetchRequestsStart(state, action);
        case actionTypes.FETCH_REQUESTS_FAIL: return fetchRequestsFail(state, action);

        case actionTypes.CREATE_REQUEST_SUCCESS: return createRequestSuccess(state, action);
        case actionTypes.CREATE_REQUEST_START: return createRequestStart(state, action);
        case actionTypes.CREATE_REQUEST_FAIL: return createRequestFail(state, action);

        default: return state;
    }
}

export default reducer;