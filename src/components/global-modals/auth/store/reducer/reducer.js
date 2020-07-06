import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../../shared/utility';
const initialState = {
    hasLogin: false,
    showAuthModal: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_AUTH_MODAL:
            return updateObject(state, { showAuthModal: true });
        case actionTypes.HIDE_AUTH_MODAL:
            return updateObject(state, { showAuthModal: false });
        case actionTypes.SUCCESSFULLY_LOG_IN:
            return updateObject(state, { hasLogin: true });
        case actionTypes.SUCCESSFULLY_CREATE_ACCOUNT:
            return updateObject(state, { hasLogin: true });
        default:
            return state;
    }
};

export default reducer;