import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../shared/utility';

const initialState = {
    profile: null,
    error: null,
    loading: false
}

const fetchProfileStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const fetchProfileFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const fetchProfileSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        profile: action.payload,
        error: null
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_START: return fetchProfileStart(state, action);
        case actionTypes.FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
        case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);
        default: return state
    }
};

export default reducer;