import { POSTS_CREATE_POST, POSTS_FETCH_POST, REQUEST_POSTS } from "./constants"
import { showLoader, hideLoader, showAlert } from "../app/actions"

export const createPost = (post) => {
    return {
        type: POSTS_CREATE_POST,
        payload: post
    }
}

export const fetchPosts = () => {
    return async (dispatch) => {
        try{
            dispatch(showLoader());
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
            const result = await response.json();
            if (result) {
                dispatch({type: POSTS_FETCH_POST, payload: result});
                setTimeout(() => dispatch(hideLoader()), 2000);
            }
        } catch(e) {
            dispatch(showAlert({type: 'danger', text: 'Server error'}));
            setTimeout(() => dispatch(hideLoader()), 2000);
        }
    }
}

// using saga
export const requestPosts = () => {
    return {
        type: REQUEST_POSTS
    }
}

export const fetchedPosts = (posts) => ({type: POSTS_FETCH_POST, payload: posts});
