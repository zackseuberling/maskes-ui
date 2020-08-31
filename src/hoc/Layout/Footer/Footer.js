import React from 'react';
import { Segment, List, Grid, Header, Icon } from 'semantic-ui-react';
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './Footer.css'

const Footer = (props) => (
    <footer id="footer">
        <Segment className='waveFooter' inverted vertical style={{ padding: "4em 1em", backgroundColor: "#343a40" }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header inverted as="h4" content="About" />
                            <List link inverted>
                                <List.Item as="a">Sitemap</List.Item>
                                <List.Item as="a">Contact Us</List.Item>
                                <List.Item as="a">Community Events</List.Item>
                                <List.Item as="a">Mutual Aid Pod</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header inverted as="h4" content="Services" />
                            <List link inverted>
                                <List.Item as="a">Request Support</List.Item>
                                <List.Item as="a">Offer Support</List.Item>
                                <List.Item as="a">How To Get Help</List.Item>
                                <List.Item as="a">How To Get Involved</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Form>
                                <Form.Control className="subscribe-email" type="email" placeholder="Enter email" />
                                <Button variant="warning" size="sm" className='mt-2'>Subscribe</Button>
                            </Form>
                            <br />
                            <Icon name='facebook' style={{ fontSize: "1.5rem" }} />
                            <Icon name='instagram' style={{ fontSize: "1.5rem" }} />
                            <Icon name='twitter' style={{ fontSize: "1.5rem" }} />
                            <Icon name='whatsapp' style={{ fontSize: "1.5rem" }} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p>Copyright &copy; 2020 SKCEMA</p>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </footer>

);

export default Footer;