import axios from '../../../../shared/axios';
import * as actionTypes from './actionTypes';

export const fetchCommentsStart = () => {
    return {
        type: actionTypes.FETCH_COMMENTS_START
    }
}

export const fetchCommentsSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        payload: payload
    }
}

export const fetchCommentsFail = (error) => {
    return {
        type: actionTypes.FETCH_COMMENTS_FAIL,
        error: error
    }
}

export const fetchComments = (requestId) => {
    return dispatch => {
        dispatch(fetchCommentsStart());
        const url = '/connect/comments/view_comments/';

        const body = {
            requestId: requestId
        }
        axios.post(url, body)
            .then(response => {
                const payload = response.data
                dispatch(fetchCommentsSuccess(payload));
            })
            .catch(error => {
                dispatch(fetchCommentsFail(error))
            })
    }
}

//CREATE COMMENT
export const createCommentStart = () => {
    return {
        type: actionTypes.CREATE_COMMENT_START
    }
}

export const createCommentSuccess = (payload) => {
    return {
        type: actionTypes.CREATE_COMMENT_SUCCESS,
        payload: payload
    }
}

export const createCommentFail = (error) => {
    return {
        type: actionTypes.CREATE_COMMENT_FAIL,
        error: error
    }
}

export const createComment = (requestId, content) => {
    return dispatch => {
        dispatch(createCommentStart());
        const url = '/connect/comments/';

        const body = {
            request: requestId,
            comment_content: content
        }
        axios.post(url, body)
            .then(response => {
                const payload = response.data
                dispatch(createCommentSuccess(payload));
                dispatch(fetchComments(requestId))
            })
            .catch(error => {
                dispatch(createCommentFail(error))
            })
    }
}

//UPDATE COMMENT
export const updateCommentStart = () => {
    return {
        type: actionTypes.UPDATE_COMMENT_START
    }
}

export const updateCommentSuccess = (payload) => {
    return {
        type: actionTypes.UPDATE_COMMENT_SUCCESS,
        payload: payload
    }
}

export const updateCommentFail = (error) => {
    return {
        type: actionTypes.UPDATE_COMMENT_FAIL,
        error: error
    }
}

export const updateComment = (requestId, commentId, content) => {
    return dispatch => {
        dispatch(updateCommentStart());
        const url = `/connect/comments/${commentId}/`;

        const body = {
            comment_content: content,
            request: requestId
        }
        axios.put(url, body)
            .then(response => {
                const payload = response.data
                dispatch(updateCommentSuccess(payload));
                dispatch(fetchComments(requestId));
            })
            .catch(error => {
                dispatch(updateCommentFail(error))
            })
    }
}

//DELETE COMMENT
export const deleteCommentStart = () => {
    return {
        type: actionTypes.DELETE_COMMENT_START
    }
}

export const deleteCommentSuccess = (payload) => {
    return {
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        payload: payload
    }
}

export const deleteCommentFail = (error) => {
    return {
        type: actionTypes.DELETE_COMMENT_FAIL,
        error: error
    }
}

export const deleteComment = (requestId, commentId) => {
    return dispatch => {
        dispatch(deleteCommentStart());
        const url = `/connect/comments/${commentId}/`;

        axios.delete(url)
            .then(response => {
                const payload = response.data
                dispatch(deleteCommentSuccess(payload));
                dispatch(fetchComments(requestId))
            })
            .catch(error => {
                dispatch(deleteCommentFail(error))
            })
    }
}



//CREATE REPLY
export const createReplyStart = () => {
    return {
        type: actionTypes.CREATE_REPLY_START
    }
}

export const createReplySuccess = (payload) => {
    return {
        type: actionTypes.CREATE_REPLY_SUCCESS,
    }
}

export const createReplyFail = (error) => {
    return {
        type: actionTypes.CREATE_REPLY_FAIL,
    }
}

export const createReply = (commentId, content, requestId) => {
    return dispatch => {
        dispatch(createReplyStart());
        const url = '/connect/replies/';

        const body = {
            reply_content: content,
            comment: commentId
        }
        axios.post(url, body)
            .then(response => {
                dispatch(createReplySuccess());
                dispatch(fetchComments(requestId))
            })
            .catch(error => {
                dispatch(createReplyFail(error))
            })
    }
}

//UPDATE REPLY
export const updateReplyStart = () => {
    return {
        type: actionTypes.UPDATE_REPLY_START
    }
}

export const updateReplySuccess = () => {
    return {
        type: actionTypes.UPDATE_REPLY_SUCCESS,
    }
}

export const updateReplyFail = () => {
    return {
        type: actionTypes.UPDATE_REPLY_FAIL,
    }
}

export const updateReply = (replyId, content, commentId, requestId) => {
    return dispatch => {
        dispatch(updateReplyStart());
        const url = `/connect/replies/${replyId}/`;

        const body = {
            reply_content: content,
            comment: commentId
        }
        axios.put(url, body)
            .then(response => {
                dispatch(updateReplySuccess());
                dispatch(fetchComments(requestId));
            })
            .catch(error => {
                dispatch(updateReplyFail())
            })
    }
}

//DELETE REPLY
export const deleteReplyStart = () => {
    return {
        type: actionTypes.DELETE_REPLY_START
    }
}

export const deleteReplySuccess = () => {
    return {
        type: actionTypes.DELETE_REPLY_SUCCESS,
    }
}

export const deleteReplyFail = () => {
    return {
        type: actionTypes.DELETE_REPLY_FAIL,
    }
}

export const deleteReply = (replyId, requestId) => {
    return dispatch => {
        dispatch(deleteReplyStart());
        const url = `/connect/replies/${replyId}/`;

        axios.delete(url)
            .then(response => {

                dispatch(deleteReplySuccess());
                dispatch(fetchComments(requestId))
            })
            .catch(error => {
                dispatch(deleteReplyFail())
            })
    }
}