import React, { useEffect } from 'react';
import EmailResetConfirm from '../../components/Auth/Email/EmailResetConfirm';
import axios from '../../shared/axios';
import { connect } from 'react-redux';
import { logout } from '../../components/Auth/store/actions/actions';
import { setAlert } from '../../components/Alert/store/actions/actions';

const ResetEmail = (props) => {
    const { logout, setAlert, history, match } = props

    useEffect(() => {
        logout()
    }, [logout]);

    const handleSubmit = (e, formData) => {
        e.preventDefault();
        if (formData.new_email === formData.re_new_email) {
            const url = `/users/reset_email_confirm/`;
            const body = formData;

            axios.post(url, body)
                .then(res => {
                    setAlert("Successfully changed email", "success");
                    history.push('/');
                })
                .catch(err => {
                    err.response.data.new_email && setAlert(`${err.response.data.new_email ? err.response.data.new_email : "Reset Email Failed"}`, "danger");
                    err.response.data.token && setAlert(`${err.response.data.token ? err.response.data.token : "Reset Email Failed"}`, "danger");
                })
        } else {
            setAlert("Emails do not match", "danger");
        }

    }

    return (
        <EmailResetConfirm
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

export default connect(mapStateToProps, { logout, setAlert })(ResetEmail);