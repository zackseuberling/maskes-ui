import React from 'react';
import Container from 'react-bootstrap/Container';
import Aux from '../Aux/Aux';
import Navbar from '../../components/Navbar/Navbar';
import Alert from '../../components/Alert/Alert';
import Auth from '../../components/Auth/Auth';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { connect } from 'react-redux';

const Layout = (props) => (
    <Aux>
        <Auth />
        <Navbar />
        <Alert alerts={props.alerts} />
        {props.hasLogin ? <Breadcrumbs /> : null}
        <main>
            {props.children}
        </main>
        <footer className="py-5 bg-light">
            <Container>
                <p className="m-0 text-center text-black">Copyright &copy; Mutual Aid Group 2020</p>
            </Container>
        </footer>
    </Aux>
);

const mapStateToProps = (state) => {
    return {
        hasLogin: state.auth.access !== null,
        alerts: state.alerts,
    }
}

export default connect(mapStateToProps)(Layout);