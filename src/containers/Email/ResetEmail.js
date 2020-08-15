import React from 'react';
import EmailReset from '../../components/Auth/Email/EmailReset';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../components/Alert/store/actions/actions';

const ResetEmail = (props) => {
    const { history, setAlert } = props
    const handleSubmit = (e, userEmail) => {
        e.preventDefault();

        const url = `http://localhost:8000/users/reset_email/`
        const body = {
            email: userEmail
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        axios.post(url, body, config)
            .then(res => {
                history.push(props.is_volunteer ? '/profile' : '/');
                setAlert(`Email reset link sccessfully sent to ${userEmail}`, "success");

            })
            .catch(err => {
                setAlert(`Email reset link failed to send to ${userEmail}`, "danger");
            })

    }

    return (
        <EmailReset
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

export default connect(mapStateToProps, { setAlert })(ResetEmail);