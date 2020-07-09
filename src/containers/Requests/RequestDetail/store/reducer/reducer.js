import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../../shared/utility';

const initialState = {
    request: [],
    loading: false,
}

const fetchRequestDetailSuccess = (state, action) => {
    return updateObject(state, {
        request: action.payload,
        loading: false
    });
}

const fetchRequestDetailStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchRequestDetailFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REQUEST_DETAIL_SUCCESS: return fetchRequestDetailSuccess(state, action);
        case actionTypes.FETCH_REQUEST_DETAIL_START: return fetchRequestDetailStart(state, action);
        case actionTypes.FETCH_REQUEST_DETAIL_FAIL: return fetchRequestDetailFail(state, action);
        default: return state;
    }
}

export default reducer;