import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Alert from '../../components/Alert/Alert';
import Auth from '../../components/Auth/Auth';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Container from 'react-bootstrap/Container';
import { Segment, List, Grid, Header } from 'semantic-ui-react';
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
            <footer id="footer">
                <Segment className='waveFooter' inverted vertical style={{ padding: "4em 1em", backgroundColor: "#343a40" }}>
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header inverted as="h4" content="About" />
                                    <List link inverted>
                                        <List.Item as="a">Sitemap</List.Item>
                                        <List.Item as="a">Contact Us</List.Item>
                                        <List.Item as="a">Community Events</List.Item>
                                        <List.Item as="a">Mutual Aid Pod</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header inverted as="h4" content="Services" />
                                    <List link inverted>
                                        <List.Item as="a">Request Support</List.Item>
                                        <List.Item as="a">Offer Support</List.Item>
                                        <List.Item as="a">How To Get Help</List.Item>
                                        <List.Item as="a">How To Get Involved</List.Item>

                                    </List>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Header as="h4" inverted>
                                        Footer Header
                                    </Header>
                                    <p>
                                        Extra space for a call to action inside the footer that could
                                        help re-engage users.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                <p>Copyright &copy; 2020 SKCEMA</p>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            </footer>


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