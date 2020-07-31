import React from 'react';
import { Alert as AlertBS } from 'react-bootstrap';

const Alert = ({ alerts }) => (alerts !== null && alerts.length > 0)
    ? alerts.map(alert => (
        <AlertBS key={alert.id} variant={alert.variant}>
            {alert.msg}
        </AlertBS>))
    : null;

export default Alert;