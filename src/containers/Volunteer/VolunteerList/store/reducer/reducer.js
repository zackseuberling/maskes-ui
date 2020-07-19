import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../../shared/utility';

const initialState = {
    requests: [],
    loading: false,
}

// FETCH REQUEST
const fetchVolunteerRequestsSuccess = (state, action) => {
    return updateObject(state, {
        requests: action.payload,
        loading: false,
    });
}

const fetchVolunteerRequestsStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchVolunteerRequestsFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VOLUNTEER_REQUESTS_SUCCESS: return fetchVolunteerRequestsSuccess(state, action);
        case actionTypes.FETCH_VOLUNTEER_REQUESTS_START: return fetchVolunteerRequestsStart(state, action);
        case actionTypes.FETCH_VOLUNTEER_REQUESTS_FAIL: return fetchVolunteerRequestsFail(state, action);

        default: return state;
    }
}

export default reducer;