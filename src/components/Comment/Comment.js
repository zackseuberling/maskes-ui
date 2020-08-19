import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Button, Comment as CommentSUI, Form } from 'semantic-ui-react';
import { Button as BSButton, Modal } from 'react-bootstrap'
import { FiChevronDown } from "react-icons/fi";
import { BsPencil, BsXSquare } from 'react-icons/bs';
import moment from 'moment';
import Aux from '../../hoc/Aux/Aux';
import './Comment.css';

import Reply from './Reply/Reply';

const Comment = (props) => {

    const { comments, create, update, remove,
        create_reply, update_reply, remove_reply,
        loading, userId } = props

    const history = useHistory();

    const [key, setKey] = useState('Comment');
    const [commentContent, setCommentContent] = useState()

    //Create Comment Form
    const onChange = (e) => {
        setCommentContent(e.target.value);
    }

    //Edit Comment Form
    const toggleEditor = (i) => {
        setCms(cms.map((cm, j) => (j === i) ? { ...cm, key: j, onEdit: !cm.onEdit } : { ...cm, key: j }))
    }
    const [cms, setCms] = useState(comments ?
        comments.results.map((cm, i) => (
            {
                ...cm,
                key: i,
                onEdit: false,
                collapsed: true,
                comment_content: "",
                reply_content: ""
            })
        ) : [])
    const onChangeComment = (e, i) => {
        setCms(cms.map((cm, j) => (j === i) ? { ...cm, key: j, comment_content: e.target.value } : { ...cm, key: j }))
    };

    const onChangeReply = (e, i) => {
        setCms(cms.map((cm, j) => (j === i) ? { ...cm, key: j, reply_content: e.target.value } : { ...cm, key: j }))
    };

    //Delete Comment
    //Confirm Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState(null)
    const deleteModal = (
        < Modal show={showDeleteModal} centered onHide={() => setShowDeleteModal(false)} >
            <Modal.Header closeButton>
                <Modal.Title>Delete Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
            <Modal.Footer>
                <BSButton variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Close
          </BSButton>
                <BSButton variant="danger" onClick={() => remove(deleteCommentId)}>
                    Yes, Delete
          </BSButton>
            </Modal.Footer>
        </Modal >
    )


    //Show/unshow replies
    const toggleColapsed = (i) => {
        setCms(cms.map((cm, j) => (j === i) ? { ...cm, key: j, collapsed: !cm.collapsed } : { ...cm, key: j }))
    }

    let display = []

    const edit_button = <BsPencil />
    const delete_button = <BsXSquare />


    if (!loading && comments && comments.results.length > 0) {
        display = cms.map((comment, index) => <CommentSUI key={comment.id}>
            <CommentSUI.Avatar as='a' src='https://skcema.org/media/default.jpg' />
            <CommentSUI.Content>
                <CommentSUI.Author as='a' onClick={() => history.push(`/profile/${comment.author}`)}>{comment.author_name}</CommentSUI.Author>
                <CommentSUI.Metadata>
                    <span>{moment(comment.created_date).fromNow()}</span>
                    {comment.onEdit ?
                        <CommentSUI.Actions>
                            <CommentSUI.Action className='delete-btn'
                                onClick={() => {
                                    setShowDeleteModal(true);
                                    setDeleteCommentId(comment.id)
                                }}>
                                {delete_button}
                            </CommentSUI.Action>
                        </CommentSUI.Actions> : null}
                </CommentSUI.Metadata>
                {!comment.onEdit
                    ? <Aux>
                        <CommentSUI.Text>
                            {comments.results[index].comment_content}
                        </CommentSUI.Text>
                        <CommentSUI.Actions>
                            <CommentSUI.Action onClick={(e) => toggleColapsed(index)}>
                                <CommentSUI.Metadata>
                                    {comment.reply_count} {comment.reply_count > 1 ? 'Replies' : 'Reply'} {comment.collapsed ? null : <FiChevronDown />}
                                </CommentSUI.Metadata>

                            </CommentSUI.Action>
                            {(userId === comment.author)
                                ? <CommentSUI.Action className='edit-btn'
                                    onClick={(e) => toggleEditor(index)}>{edit_button}</CommentSUI.Action>
                                : null}
                        </CommentSUI.Actions>
                    </Aux>
                    : <Form reply onSubmit={() => update(comment.id, comment.comment_content)}>
                        <Form.TextArea style={{ height: 60, marginTop: -10 }} onChange={(e) => onChangeComment(e, index)} value={comment.comment_content} />
                        <BSButton type='submit' size='sm' className='mr-2'>Update</BSButton><BSButton onClick={(e) => toggleEditor(index)} variant='secondary' size='sm'>Cancel</BSButton>
                    </Form>
                }
            </CommentSUI.Content>
            <CommentSUI.Group collapsed={comment.collapsed}>
                {comment.replies.length > 0 ? comment.replies.map((reply, idx) =>
                    <Reply
                        key={idx}
                        reply={reply}
                        userId={userId}
                        moment={moment}
                        update={update_reply}
                        remove={remove_reply}
                    />) : null}
                <Form reply onSubmit={() => create_reply(comment.id, comment.reply_content)}>
                    <Form.Group inline>
                        <Form.Input label="Reply" width={10} style={{ height: 30 }}
                            onChange={(e) => onChangeReply(e, index)}
                            value={comment.reply_content}
                        />
                    </Form.Group>

                </Form>
            </CommentSUI.Group>

        </CommentSUI>)
    } else { display = <div>No comment yet</div> }

    return (
        <Aux>
            {deleteModal}
            <Tabs
                id="controlled-tab-example"
                className='mb-3'
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="Comment" title="Comment">
                    <CommentSUI.Group>{display}</CommentSUI.Group>
                </Tab>
                <Tab eventKey="Add Comment" title="Add Comment">
                    <Form reply onSubmit={() => create(commentContent)}>
                        <Form.TextArea onChange={onChange} value={commentContent} />
                        <Button type='submit' content='Add Comment' labelPosition='left' icon='edit' primary />
                    </Form>
                </Tab>
            </Tabs>
        </Aux>
    );
};

export default Comment;