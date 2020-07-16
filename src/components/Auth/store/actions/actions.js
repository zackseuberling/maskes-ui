import * as actionTypes from './actionTypes';
import axios from 'axios';

export const openAuthModal = () => ({
    type: actionTypes.OPEN_AUTH_MODAL,
});

export const hideAuthModal = () => ({
    type: actionTypes.HIDE_AUTH_MODAL,
});

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        access: payload.access,
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
}

export const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime)
    }
}

export const onAuth = (first_name, last_name, email, password, hasAccount) => {
    return dispatch => {
        dispatch(authStart());

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        const body = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        };
        let url = 'http://127.0.0.1:8000/auth/jwt/create/'

        if (!hasAccount) {
            url = 'http://127.0.0.1:8000/users/'
        }

        axios.post(url, body, config)
            .then(res => {
                const expiresIn = 3600 * 1000
                const expirationDate = new Date(new Date().getTime() + expiresIn)
                localStorage.setItem('access', res.data.access);
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(res.data));
                dispatch(hideAuthModal())
                dispatch(checkAuthTimeout(expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err));
            })
    }
}

export const authCheckLoginState = () => {
    return dispatch => {
        const access = localStorage.getItem('access');
        if (access) {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess({ access: access }));
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()))
            }

        } else {
            dispatch(logout())
        }
    }
}
