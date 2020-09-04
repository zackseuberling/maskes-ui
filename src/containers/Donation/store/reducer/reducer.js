import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../shared/utility';
const initialState = {
    donation: null,
    loading: false,
    error: null,
    status: null,
};
//FETCH DONATION
const fetchDonationSuccess = (state, action) => {
    return updateObject(state, {
        donation: action.payload,
        loading: false,
        error: null,
    });
};

const fetchDonationStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const fetchDonationFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

//DELETE DONATION
const deleteDonationSuccess = (state, action) => {
    return updateObject(state, {
        donation: null,
        status: action.status,
        loading: false,
        error: null,
    });
};

const deleteDonationStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const deleteDonationFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

//UPDATE DONATION
const updateDonationSuccess = (state, action) => {
    return updateObject(state, {
        status: action.status,
        loading: false,
        error: null,
    });
};

const updateDonationStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const updateDonationFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

//CREATE DONATION
const createDonationSuccess = (state, action) => {
    return updateObject(state, {
        status: action.status,
        loading: false,
        error: null,
    });
};

const createDonationStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const createDonationFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DONATION_SUCCESS: return fetchDonationSuccess(state, action);
        case actionTypes.FETCH_DONATION_START: return fetchDonationStart(state, action);
        case actionTypes.FETCH_DONATION_FAIL: return fetchDonationFail(state, action);

        case actionTypes.DELETE_DONATION_SUCCESS: return deleteDonationSuccess(state, action);
        case actionTypes.DELETE_DONATION_START: return deleteDonationStart(state, action);
        case actionTypes.DELETE_DONATION_FAIL: return deleteDonationFail(state, action);

        case actionTypes.UPDATE_DONATION_SUCCESS: return updateDonationSuccess(state, action);
        case actionTypes.UPDATE_DONATION_START: return updateDonationStart(state, action);
        case actionTypes.UPDATE_DONATION_FAIL: return updateDonationFail(state, action);

        case actionTypes.CREATE_DONATION_SUCCESS: return createDonationSuccess(state, action);
        case actionTypes.CREATE_DONATION_START: return createDonationStart(state, action);
        case actionTypes.CREATE_DONATION_FAIL: return createDonationFail(state, action);

        default: return state;
    }
}

export default reducer;