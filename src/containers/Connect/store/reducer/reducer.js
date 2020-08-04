import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../shared/utility';

const initialState = {
    comments: null,
    error: null,
    loading: false
}

const fetchCommentsStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const fetchCommentsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const fetchCommentsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        comments: action.payload,
        error: null
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COMMENTS_START: return fetchCommentsStart(state, action);
        case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentsSuccess(state, action);
        case actionTypes.FETCH_COMMENTS_FAIL: return fetchCommentsFail(state, action);
        default: return state
    }
};

export default reducer;