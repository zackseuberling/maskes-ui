import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Alert from '../../components/Alert/Alert';
import Auth from '../../components/Auth/Auth';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Container from 'react-bootstrap/Container';
import Footer from './Footer/Footer';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Layout.css';

const Layout = (props) => {
    const history = useHistory();

    return (
        <div id="page-container">
            <div id="content-wrap">
                <Auth />
                <Navbar history={history} />
                <Alert alerts={props.alerts} />
                {props.hasLogin ? <Container className='p-0 mb-0'><Breadcrumbs /></Container> : null}
                {props.children}
            </div>
            <Footer />


        </div>


    )
};

const mapStateToProps = (state) => {
    return {
        hasLogin: state.auth.access !== null,
        alerts: state.alerts,
    }
}

export default connect(mapStateToProps)(Layout);