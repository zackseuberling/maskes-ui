import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Comment from '../../components/Comment/Comment';
import Spinner from 'react-bootstrap/Spinner';
import {
    fetchComments, createComment, updateComment, deleteComment,
    createReply, updateReply, deleteReply
} from './store/actions/actions';

const Connect = (props) => {
    const { fetchComments, createComment,
        updateComment, deleteComment,
        createReply, updateReply, deleteReply,
        comments, loading, requestId, token, user_id } = props

    useEffect(() => requestId && fetchComments(requestId, token),
        [fetchComments, createComment,
            updateComment, deleteComment,
            createReply, updateReply, deleteReply,
            requestId, token])

    const createCommentHandler = (content) => {
        createComment(requestId, content, token);
    }

    const updateCommentHandler = (commentId, content) => {
        updateComment(requestId, commentId, content, token);
    }

    const deleteCommentHandler = (commentId) => {
        deleteComment(requestId, commentId, token);
    }

    const createReplyHandler = (commentId, content) => {
        createReply(commentId, content, requestId, token);
    }

    const updateReplyHandler = (replyId, content, commentId) => {
        updateReply(replyId, content, commentId, requestId, token);
    }

    const deleteReplyHandler = (replyId) => {
        deleteReply(replyId, requestId, token);
    }



    return loading ? <Spinner animation="border" />
        : <Comment
            comments={comments}
            create={createCommentHandler}
            update={updateCommentHandler}
            remove={deleteCommentHandler}
            create_reply={createReplyHandler}
            update_reply={updateReplyHandler}
            remove_reply={deleteReplyHandler}
            loading={loading}
            userId={parseInt(user_id)} />
};

const mapStateToProps = state => {
    return {
        comments: state.connect.comments,
        error: state.connect.error,
        loading: state.connect.loading,
        token: state.auth.access,
        user_id: state.auth.user_id
    }
}

export default connect(mapStateToProps, {
    fetchComments,
    createComment, updateComment, deleteComment,
    createReply, updateReply, deleteReply
})(Connect);