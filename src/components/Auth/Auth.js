import React, { useState } from 'react';
import './Auth.css';
import { connect } from 'react-redux';
import AuthModal from '../../components/Modal/AuthModal/AuthModal';
import { hideAuthModal, onAuth } from './store/actions/actions';

const Auth = (props) => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })

    const [hasAccount, setHasAccount] = useState(true)

    const switchAuthModeHandler = () => {
        setHasAccount(!hasAccount)
    }

    const { first_name, last_name, email, password } = formData
    const { showAuthModal, hideAuthModal, onAuth, isLoading, hasError, hasLogin } = props;

    const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

    const handleSubmit = (event) => {
        event.preventDefault();
        onAuth(first_name, last_name, email, password, hasAccount);
    }

    return (
        <AuthModal
            showModal={showAuthModal}
            hideModal={hideAuthModal}
            isLogin={hasAccount}
            loading={isLoading}
            error={hasError}
            onSubmit={handleSubmit}
            hasLogin={hasLogin}
            switchMode={switchAuthModeHandler}
            onChange={onChange}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        showAuthModal: state.auth.showAuthModal,
        isLoading: state.auth.loading,
        hasError: state.auth.error,
        hasLogin: state.auth.access !== null,
    };
};

export default connect(mapStateToProps, { hideAuthModal, onAuth })(Auth);