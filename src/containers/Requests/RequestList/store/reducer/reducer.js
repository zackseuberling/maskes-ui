import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../../shared/utility';

const initialState = {
    requests: [],
    loading: false,
}

const fetchRequestsSuccess = (state, action) => {
    return updateObject(state, {
        requests: action.payload,
        loading: false
    });
}

const fetchRequestsStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchRequestsFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REQUESTS_SUCCESS: return fetchRequestsSuccess(state, action);
        case actionTypes.FETCH_REQUESTS_START: return fetchRequestsStart(state, action);
        case actionTypes.FETCH_REQUESTS_FAIL: return fetchRequestsFail(state, action);
        default: return state;
    }
}

export default reducer;