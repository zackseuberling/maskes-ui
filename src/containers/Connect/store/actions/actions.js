import axios from axios;
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

export const fetchCommentsFail = () => {
    return {
        type: actionTypes.FETCH_COMMENTS_FAIL,
        error: error
    }
}

export const fetchComments = (requestId, token) => {
    return dispatch => {
        dispatch(fetchCommentsStart());
        const url = 'http://localhost:8000/connect/comments/';
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        const body = {
            request: requestId
        }
        axios.get(url, body, config)
            .then(response => {
                console.log(response);
                const payload = response.data
                dispatch(fetchCommentsSuccess(payload));
            })
            .catch(error => {
                console.log(error.response.data)
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

export const createCommentFail = () => {
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
            content_content: content
        }
        axios.post(url, body, config)
            .then(response => {
                console.log(response);
                const payload = response.data
                dispatch(createCommentSuccess(payload));
            })
            .catch(error => {
                console.log(error.response.data)
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

export const updateCommentFail = () => {
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
            request: requestId,
            content_content: content
        }
        axios.put(url, body, config)
            .then(response => {
                console.log(response);
                const payload = response.data
                dispatch(updateCommentSuccess(payload));
            })
            .catch(error => {
                console.log(error.response.data)
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

export const deleteCommentFail = () => {
    return {
        type: actionTypes.DELETE_COMMENT_FAIL,
        error: error
    }
}

export const deleteComment = (commentId, token) => {
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
                console.log(response);
                const payload = response.data
                dispatch(deleteCommentSuccess(payload));
            })
            .catch(error => {
                console.log(error.response.data)
                dispatch(deleteCommentFail(error))
            })
    }
}