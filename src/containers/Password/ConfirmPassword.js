import React, { useEffect } from 'react';
import PasswordResetConfirm from '../../components/Auth/Password/PasswordResetConfirm';
import axios from '../../shared/axios';
import { connect } from 'react-redux';
import { logout } from '../../components/Auth/store/actions/actions';
import { setAlert } from '../../components/Alert/store/actions/actions';

const ResetPassword = (props) => {
    const { logout, setAlert, history, match } = props

    useEffect(() => {
        logout()
    }, [logout]);

    const handleSubmit = (e, formData) => {
        e.preventDefault();
        if (formData.new_password === formData.re_new_password) {
            const url = `/users/reset_password_confirm/`;
            const body = formData;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            axios.post(url, body, config)
                .then(res => {
                    setAlert("Successfully change password", "success");
                    history.push('/');
                })
                .catch(err => {
                    err.response.data.new_password && setAlert(`${err.response.data.new_password ? err.response.data.new_password : ""}`, "danger");
                    err.response.data.token && setAlert(`${err.response.data.token ? err.response.data.token : ""}`, "danger");
                    // err.response.data.new_password && setAlert(`${err.response.data.new_password}`, "danger");

                })
        } else {
            setAlert("Passwords do not match", "danger");
        }

    }

    return (
        <PasswordResetConfirm
            handleSubmit={handleSubmit}
            params={match.params}
        />
    )

};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.access !== null,
        is_volunteer: state.auth.is_volunteer,
        is_requester: state.auth.is_requester,
    }
}

export default connect(mapStateToProps, { logout, setAlert })(ResetPassword);