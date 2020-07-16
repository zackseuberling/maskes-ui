import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../shared/utility';
const initialState = {
    showAuthModal: false,
    access: null,
    refresh: null,
    error: null,
    loading: false,
    name: null,
    is_volunteer: false,
    is_requester: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_AUTH_MODAL:
            return updateObject(state, { showAuthModal: true });
        case actionTypes.HIDE_AUTH_MODAL:
            return updateObject(state, { showAuthModal: false });

        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true })

        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                access: action.access,
                refresh: action.refresh,
                is_requester: action.is_requester,
                is_volunteer: action.is_volunteer,
                name: action.name,
                error: null,
                loading: false
            })

        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false
            })
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                access: null,
                refresh: null,
                name: null,
                is_volunteer: false,
                is_requester: false
            })
        default:
            return state;
    }
};

export default reducer;