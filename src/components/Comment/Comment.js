import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Button, Comment as CommentSUI, Form, Checkbox } from 'semantic-ui-react'

const Comment = (props) => {
    const [key, setKey] = useState('Comment');
    const [collapsed, setCollapsed] = useState(true)

    const handleCheckbox = (e, { checked }) => setCollapsed(checked)

    return (
        <Tabs
            id="controlled-tab-example"
            className='mb-3'
            activeKey={key}
            onSelect={(k) => { setKey(k); console.log(k) }}
        >
            <Tab eventKey="Comment" title="Comment">
                <CommentSUI.Group>
                    <CommentSUI>
                        <CommentSUI.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <CommentSUI.Content>
                            <CommentSUI.Author as='a'>Matt</CommentSUI.Author>
                            <CommentSUI.Metadata>
                                <div>Today at 5:42PM</div>
                            </CommentSUI.Metadata>
                            <CommentSUI.Text>How artistic!</CommentSUI.Text>
                            <CommentSUI.Actions>
                                <CommentSUI.Action>Reply</CommentSUI.Action>
                            </CommentSUI.Actions>
                        </CommentSUI.Content>
                    </CommentSUI>

                    <CommentSUI>
                        <CommentSUI.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                        <CommentSUI.Content>
                            <CommentSUI.Author as='a'>Elliot Fu</CommentSUI.Author>
                            <CommentSUI.Metadata>
                                <div>Yesterday at 12:30AM</div>
                            </CommentSUI.Metadata>
                            <CommentSUI.Text>
                                <p>This has been very useful for my research. Thanks as well!</p>
                            </CommentSUI.Text>
                            <CommentSUI.Actions>
                                <CommentSUI.Action>Reply</CommentSUI.Action>
                            </CommentSUI.Actions>
                        </CommentSUI.Content>
                        <CommentSUI.Group>
                            <CommentSUI>
                                <CommentSUI.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                <CommentSUI.Content>
                                    <CommentSUI.Author as='a'>Jenny Hess</CommentSUI.Author>
                                    <CommentSUI.Metadata>
                                        <div>Just now</div>
                                    </CommentSUI.Metadata>
                                    <CommentSUI.Text>Elliot you are always so right :)</CommentSUI.Text>
                                    <CommentSUI.Actions>
                                        <CommentSUI.Action>Reply</CommentSUI.Action>
                                    </CommentSUI.Actions>
                                </CommentSUI.Content>
                            </CommentSUI>
                        </CommentSUI.Group>
                    </CommentSUI>

                    <CommentSUI>
                        <CommentSUI.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                        <CommentSUI.Content>
                            <CommentSUI.Author as='a'>Joe Henderson</CommentSUI.Author>
                            <CommentSUI.Metadata>
                                <div>5 days ago</div>
                            </CommentSUI.Metadata>
                            <CommentSUI.Text>Dude, this is awesome. Thanks so much</CommentSUI.Text>
                            <CommentSUI.Actions>
                                <CommentSUI.Action>Reply</CommentSUI.Action>
                            </CommentSUI.Actions>
                        </CommentSUI.Content>
                    </CommentSUI>

                    <CommentSUI>
                        <CommentSUI.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                        <CommentSUI.Content>
                            <CommentSUI.Author as='a'>Christian Rocha</CommentSUI.Author>
                            <CommentSUI.Metadata>
                                <span>2 days ago</span>
                            </CommentSUI.Metadata>
                            <CommentSUI.Text>
                                I'm very interested in this motherboard. Do you know if it'd
                                work in a Intel LGA775 CPU socket?
                            </CommentSUI.Text>
                            <CommentSUI.Actions>
                                <CommentSUI.Action>Reply</CommentSUI.Action>
                                <CommentSUI.Action><Checkbox
                                    style={{ color: 'grey', fontSize: '11px' }}
                                    defaultChecked
                                    label='Collapse Replies'
                                    onChange={handleCheckbox}
                                /></CommentSUI.Action>

                            </CommentSUI.Actions>
                        </CommentSUI.Content>

                        <CommentSUI.Group collapsed={collapsed}>
                            <CommentSUI>
                                <CommentSUI.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                                <CommentSUI.Content>
                                    <CommentSUI.Author as='a'>Elliot Fu</CommentSUI.Author>
                                    <CommentSUI.Metadata>
                                        <span>1 day ago</span>
                                    </CommentSUI.Metadata>
                                    <CommentSUI.Text>No, it wont</CommentSUI.Text>
                                    <CommentSUI.Actions>
                                        <a href="?">Reply</a>
                                    </CommentSUI.Actions>
                                </CommentSUI.Content>
                            </CommentSUI>
                            <CommentSUI>


                                <CommentSUI.Avatar
                                    as='a'
                                    src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
                                />
                                <CommentSUI.Content>
                                    <CommentSUI.Author as='a'>Jenny Hess</CommentSUI.Author>
                                    <CommentSUI.Metadata>
                                        <span>20 minutes ago</span>
                                    </CommentSUI.Metadata>
                                    <CommentSUI.Text>Maybe it would.</CommentSUI.Text>
                                    <CommentSUI.Actions>
                                        <a href="?">Reply</a>
                                    </CommentSUI.Actions>
                                </CommentSUI.Content>

                            </CommentSUI>
                        </CommentSUI.Group>
                    </CommentSUI>

                </CommentSUI.Group>
            </Tab>
            <Tab eventKey="create_comment" title="Add Comment">
                <Form reply>
                    <Form.TextArea />
                    <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                </Form>
            </Tab>
        </Tabs>
    );
};

export default Comment;