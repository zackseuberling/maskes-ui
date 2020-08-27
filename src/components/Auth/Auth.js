import React, { useState, useEffect } from 'react';
import './Auth.css';
import { connect } from 'react-redux';
import AuthModal from '../../components/Modal/AuthModal/AuthModal';
import { hideAuthModal, onAuth } from './store/actions/actions';

const Auth = (props) => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        display_name: '',
        email: '',
        password: '',
    })

    const [authError, setAuthError] = useState()

    const [hasAccount, setHasAccount] = useState(true)

    const switchAuthModeHandler = () => {
        setHasAccount(!hasAccount)
        setAuthError(null)
    }

    const { first_name, last_name, display_name, email, password } = formData
    const is_volunteer = false;
    const is_requester = true;

    const { showAuthModal, hideAuthModal, onAuth, isLoading, error, hasLogin, auth_volunteer, auth_requester } = props;

    const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

    const handleSubmit = (event) => {
        event.preventDefault();
        onAuth(first_name, last_name, display_name, email, password, hasAccount, is_requester, is_volunteer);
    }



    useEffect(() => {
        if (error) {
            setAuthError(error)
        }
    }, [setAuthError, error])


    return (
        <AuthModal
            showModal={showAuthModal}
            hideModal={hideAuthModal}
            isLogin={hasAccount}
            loading={isLoading}
            error={authError}
            onSubmit={handleSubmit}
            hasLogin={hasLogin}
            switchMode={switchAuthModeHandler}
            onChange={onChange}
            is_volunteer={auth_volunteer}
            is_requester={auth_requester}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        showAuthModal: state.auth.showAuthModal,
        isLoading: state.auth.loading,
        error: state.auth.error,
        hasLogin: state.auth.access !== null,
        auth_volunteer: state.auth.is_volunteer,
        auth_requester: state.auth.is_requester
    };
};

export default connect(mapStateToProps, { hideAuthModal, onAuth })(Auth);