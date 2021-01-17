import api from '../apis/api';
import axios from "axios";
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(userId=>dispatch(fetchUser(userId)))
        .value()

}

export const fetchPosts = () => async dispatch => {
    const response = await axios({
        method: 'get',
        port: 3991,
        url: '/posts'
    })
    dispatch({type: 'FETCH_POSTS', payload: response.data})
}

export const fetchUser = (userId) => async dispatch =>{
    const response = await axios({
        method: 'get',
        port: 3991,
        url: `/users/${userId}`
    })
    dispatch({type: 'FETCH_USER', payload: response.data})
}

export const deletePost = postId => async dispatch =>{
    await axios({
        method:'delete',
        port:3991,
        url: `/posts/${postId}`
    })

    dispatch({type:'DELETE_POST', payload: postId})
}
