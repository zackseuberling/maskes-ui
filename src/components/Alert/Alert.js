import React from 'react';
import { Alert as AlertBS } from 'react-bootstrap';
import './Alert.css';

const Alert = ({ alerts }) => (alerts !== null && alerts.length > 0)
    ? alerts.map(alert => (
        <AlertBS className="my-alert" key={alert.id} variant={alert.variant}>
            {alert.msg}
        </AlertBS>))
    : null;

export default Alert;