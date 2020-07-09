import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from './store/actions/actions';

const Logout = ({ logout }) => {
    useEffect(() => {
        logout();
    })
    return <Redirect to="/" />;
}
export default connect(null, { logout })(Logout);