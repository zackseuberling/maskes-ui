import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { onAuth } from '../../../components/Auth/store/actions/actions';
import VolunteerSignUpForm from '../../../components/Form/VolunteerSignUpForm';

const SignUp = (props) => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        display_name: '',
        email: '',
        password: '',
    });

    const hasAccount = false;
    const is_volunteer = true;
    const is_requester = false;

    const { first_name, last_name, display_name, email, password } = formData;
    const { onAuth, isLoading, isAuthenticated } = props;

    const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

    const handleSubmit = (event) => {
        event.preventDefault();
        onAuth(first_name, last_name, display_name, email, password, hasAccount, is_requester, is_volunteer);
    };


    return isAuthenticated ? <Redirect to='/volunteer' /> : <VolunteerSignUpForm
        loading={isLoading}
        handleSubmit={handleSubmit}
        onChange={onChange}
    />
}
const mapStateToProps = state => {
    return {
        isLoading: state.auth.loading,
        isAuthenticated: state.auth.access !== null
    }
}

export default connect(mapStateToProps, { onAuth })(SignUp);