import * as actionTypes from './actionTypes';
import axios from '../../../../shared/axios';

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
        is_requester: payload.is_requester,
        is_volunteer: payload.is_volunteer,
        name: payload.name,
        user_id: payload.user_id
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
}

export const logoutSuccess = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('is_requester');
    localStorage.removeItem('is_volunteer');
    localStorage.removeItem('name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('refresh');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const logout = () => {
    return dispatch => {

        axios.post('/blacklist/', { "refresh": localStorage.getItem('refresh') })
            .then(response => {
                dispatch(logoutSuccess())
            })
            .catch(error => {
                dispatch(logoutSuccess())
            })
    }
}

// export const checkAuthTimeout = (expirationTime) => {
//     return dispatch => {
//         setTimeout(() => {
//             // dispatch(logout());
//         }, expirationTime)
//     }
// }

export const onAuth = (first_name, last_name, display_name, email, password, hasAccount, is_requester, is_volunteer) => {
    return dispatch => {
        dispatch(authStart());

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        const body = {
            first_name: first_name,
            last_name: last_name,
            display_name: display_name,
            email: email,
            password: password,
            is_requester: is_requester,
            is_volunteer: is_volunteer,
        };

        let url = '/auth/jwt/create/'

        if (hasAccount) {
            axios.post(url, body, config)
                .then(res => {
                    const expiresIn = 3600 * 1000
                    const expirationDate = new Date(new Date().getTime() + expiresIn)
                    localStorage.setItem('access', res.data.access);
                    localStorage.setItem('refresh', res.data.refresh);
                    localStorage.setItem('expirationDate', expirationDate)
                    localStorage.setItem('is_requester', res.data.is_requester)
                    localStorage.setItem('is_volunteer', res.data.is_volunteer)
                    localStorage.setItem('name', res.data.first_name)
                    localStorage.setItem('user_id', res.data.user_id)
                    dispatch(authSuccess(res.data));
                    dispatch(hideAuthModal())
                    // dispatch(checkAuthTimeout(expiresIn))
                })
                .catch(err => {
                    dispatch(authFail(err));
                })
        } else {
            url = '/users/'
            axios.post(url, body, config)
                .then(res => {
                    url = '/auth/jwt/create/'
                    axios.post(url, body, config)
                        .then(res => {
                            const expiresIn = 3600 * 1000
                            const expirationDate = new Date(new Date().getTime() + expiresIn)
                            localStorage.setItem('access', res.data.access);
                            localStorage.setItem('refresh', res.data.refresh);
                            localStorage.setItem('expirationDate', expirationDate)
                            localStorage.setItem('is_requester', res.data.is_requester)
                            localStorage.setItem('is_volunteer', res.data.is_volunteer)
                            localStorage.setItem('name', res.data.first_name)
                            localStorage.setItem('user_id', res.data.user_id)
                            dispatch(authSuccess(res.data));
                            dispatch(hideAuthModal())
                            // dispatch(checkAuthTimeout(expiresIn))
                        })
                        .catch(err => {
                            dispatch(authFail(err));
                        })
                })
                .catch(err => {
                    dispatch(authFail(err));
                })
        }


    }
}

export const authCheckLoginState = () => {
    return dispatch => {
        const access = localStorage.getItem('access');
        const refresh = localStorage.getItem('refresh');
        const payload = {
            access: access,
            refresh: refresh,
            is_requester: (localStorage.getItem('is_requester') === "true"),
            is_volunteer: (localStorage.getItem('is_volunteer') === "true"),
            name: localStorage.getItem('name'),
            user_id: localStorage.getItem('user_id')
        }
        if (access) {
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate < new Date()) {
            // dispatch(logout());
            // } else {
            dispatch(authSuccess(payload));
            // dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()))
            // }

        }
        // else {
        //     dispatch(logout())
        // }
    }
}
