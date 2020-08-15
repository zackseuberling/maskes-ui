import axios from 'axios';
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

export const fetchComments = (requestId, token) => {
    return dispatch => {
        dispatch(fetchCommentsStart());
        const url = 'http://localhost:8000/connect/comments/view_comments/';
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        const body = {
            requestId: requestId
        }
        axios.post(url, body, config)
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

export const createComment = (requestId, content, token) => {
    return dispatch => {
        dispatch(createCommentStart());
        const url = 'http://localhost:8000/connect/comments/';
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        const body = {
            request: requestId,
            comment_content: content
        }
        axios.post(url, body, config)
            .then(response => {
                const payload = response.data
                dispatch(createCommentSuccess(payload));
                dispatch(fetchComments(requestId, token))
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

export const updateComment = (requestId, commentId, content, token) => {
    return dispatch => {
        dispatch(updateCommentStart());
        const url = `http://localhost:8000/connect/comments/${commentId}/`;
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        const body = {
            comment_content: content,
            request: requestId
        }
        axios.put(url, body, config)
            .then(response => {
                const payload = response.data
                dispatch(updateCommentSuccess(payload));
                dispatch(fetchComments(requestId, token));
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

export const deleteComment = (requestId, commentId, token) => {
    return dispatch => {
        dispatch(deleteCommentStart());
        const url = `http://localhost:8000/connect/comments/${commentId}/`;
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.delete(url, config)
            .then(response => {
                const payload = response.data
                dispatch(deleteCommentSuccess(payload));
                dispatch(fetchComments(requestId, token))
            })
            .catch(error => {
                dispatch(deleteCommentFail(error))
            })
    }
}