import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../../shared/utility';
const initialState = {
    volunteer: [],
    loading: false,
    error: null,
};

const fetchVolunteerDetailSuccess = (state, action) => {
    return updateObject(state, {
        volunteer: action.payload,
        loading: false,
    });
};

const fetchVolunteerDetailStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const fetchVolunteerDetailFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VOLUNTEER_DETAIL_SUCCESS: return fetchVolunteerDetailSuccess(state, action);
        case actionTypes.FETCH_VOLUNTEER_DETAIL_START: return fetchVolunteerDetailStart(state, action);
        case actionTypes.FETCH_VOLUNTEER_DETAIL_FAIL: return fetchVolunteerDetailFail(state, action);

        default: return state;
    }
}

export default reducer;