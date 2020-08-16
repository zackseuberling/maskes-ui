import React from 'react';
import Aux from '../Aux/Aux';
import Navbar from '../../components/Navbar/Navbar';
import Alert from '../../components/Alert/Alert';
import Auth from '../../components/Auth/Auth';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Layout = (props) => {
    const history = useHistory();

    return (
        <Aux>
            <Auth />
            <Navbar history={history} />
            <Alert alerts={props.alerts} />
            {props.hasLogin ? <Container className='p-0 mb-0'><Breadcrumbs /></Container> : null}

            {props.children}

            {/* <footer className="py-5 bg-light">
            <Container>
                <p className="m-0 text-center text-black">Copyright &copy; Mutual Aid Group 2020</p>
            </Container>
        </footer> */}
        </Aux>
    )
};

const mapStateToProps = (state) => {
    return {
        hasLogin: state.auth.access !== null,
        alerts: state.alerts,
    }
}

export default connect(mapStateToProps)(Layout);