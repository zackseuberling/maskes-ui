import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../../shared/utility';
const initialState = {
    request: [],
    loading: false,
}

const fetchVolunteerRequestDetailSuccess = (state, action) => {
    return updateObject(state, {
        request: action.payload,
        loading: false,
    });
}

const fetchVolunteerRequestDetailStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchVolunteerRequestDetailFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VOLUNTEER_REQUEST_DETAIL_SUCCESS: return fetchVolunteerRequestDetailSuccess(state, action);
        case actionTypes.FETCH_VOLUNTEER_REQUEST_DETAIL_START: return fetchVolunteerRequestDetailStart(state, action);
        case actionTypes.FETCH_VOLUNTEER_REQUEST_DETAIL_FAIL: return fetchVolunteerRequestDetailFail(state, action);
        default: return state;
    }
}

export default reducer;