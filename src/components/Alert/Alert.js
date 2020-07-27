import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const Alert = (props) => {
    const { alerts } = props
    if (alerts !== null && alerts.length > 0) {
        return (
            alerts.map(alert => (
                <Alert key={alert.id} variant={alert.variant}>
                    {alert.msg}
                </Alert>
            ))
        )
    }

};


const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);