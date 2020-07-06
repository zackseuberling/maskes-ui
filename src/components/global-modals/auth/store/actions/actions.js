import * as actionTypes from './actionTypes';

export const openAuthModal = () => ({
    type: actionTypes.OPEN_AUTH_MODAL,
});

export const hideAuthModal = () => ({
    type: actionTypes.HIDE_AUTH_MODAL,
});

export const onLogin = () => ({
    type: actionTypes.SUCCESSFULLY_LOG_IN,
});

export const onRegister = () => ({
    type: actionTypes.SUCCESSFULLY_CREATE_ACCOUNT,
})
