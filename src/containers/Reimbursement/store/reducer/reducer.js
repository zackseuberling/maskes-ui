import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../shared/utility';
const initialState = {
    reimbursement: [],
    loading: false,
    error: null,
    status: null,
};
//FETCH REIMBURSEMENT
const fetchReimbursementSuccess = (state, action) => {
    return updateObject(state, {
        reimbursement: action.payload,
        loading: false,
        error: null,
    });
};

const fetchReimbursementStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const fetchReimbursementFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

//DELETE REIMBURSEMENT
const deleteReimbursementSuccess = (state, action) => {
    return updateObject(state, {
        status: action.status,
        loading: false,
        error: null,
    });
};

const deleteReimbursementStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const deleteReimbursementFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

//UPDATE REIMBURSEMENT
const updateReimbursementSuccess = (state, action) => {
    return updateObject(state, {
        status: action.status,
        loading: false,
        error: null,
    });
};

const updateReimbursementStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const updateReimbursementFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

//REQUEST REIMBURSEMENT
const requestReimbursementSuccess = (state, action) => {
    return updateObject(state, {
        status: action.status,
        loading: false,
        error: null,
    });
};

const requestReimbursementStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const requestReimbursementFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REIMBURSEMENT_SUCCESS: return fetchReimbursementSuccess(state, action);
        case actionTypes.FETCH_REIMBURSEMENT_START: return fetchReimbursementStart(state, action);
        case actionTypes.FETCH_REIMBURSEMENT_FAIL: return fetchReimbursementFail(state, action);

        case actionTypes.DELETE_REIMBURSEMENT_SUCCESS: return deleteReimbursementSuccess(state, action);
        case actionTypes.DELETE_REIMBURSEMENT_START: return deleteReimbursementStart(state, action);
        case actionTypes.DELETE_REIMBURSEMENT_FAIL: return deleteReimbursementFail(state, action);

        case actionTypes.UPDATE_REIMBURSEMENT_SUCCESS: return updateReimbursementSuccess(state, action);
        case actionTypes.UPDATE_REIMBURSEMENT_START: return updateReimbursementStart(state, action);
        case actionTypes.UPDATE_REIMBURSEMENT_FAIL: return updateReimbursementFail(state, action);

        case actionTypes.REQUEST_REIMBURSEMENT_SUCCESS: return requestReimbursementSuccess(state, action);
        case actionTypes.REQUEST_REIMBURSEMENT_START: return requestReimbursementStart(state, action);
        case actionTypes.REQUEST_REIMBURSEMENT_FAIL: return requestReimbursementFail(state, action);

        default: return state;
    }
}

export default reducer;