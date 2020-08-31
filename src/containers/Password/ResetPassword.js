import React from 'react';
import PasswordReset from '../../components/Auth/Password/PasswordReset';
import axios from '../../shared/axios';
import { connect } from 'react-redux';
import { setAlert } from '../../components/Alert/store/actions/actions';

const ResetPassword = (props) => {
    const { history, setAlert } = props
    const handleSubmit = (e, userEmail) => {
        e.preventDefault();

        const url = `/users/reset_password/`
        const body = {
            email: userEmail
        }

        axios.post(url, body)
            .then(res => {
                history.push(props.is_volunteer ? '/profile' : '/');
                setAlert(`Password reset link sccessfully sent to ${userEmail}`, "success");

            })
            .catch(err => {
                setAlert(`Password reset link failed to send to ${userEmail}`, "danger");
            })

    }


    return (
        <PasswordReset
            handleSubmit={handleSubmit} />
    )

};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.access !== null,
        is_volunteer: state.auth.is_volunteer,
        is_requester: state.auth.is_requester,
    }
}

export default connect(mapStateToProps, { setAlert })(ResetPassword);