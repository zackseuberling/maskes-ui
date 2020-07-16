import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, hasLogin, loading, ...rest }) => (
    <Route
        {...rest}
        render={props => !hasLogin && !loading
            ? (<Redirect to='/my-requests' />)
            : (<Component {...props} />)}
    />
);

const mapStateToProps = state => ({
    hasLogin: state.auth.access !== null,
    loading: state.auth.loading,
});

export default connect(mapStateToProps)(ProtectedRoute);