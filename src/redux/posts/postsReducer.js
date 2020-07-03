import { POSTS_CREATE_POST, POSTS_FETCH_POST} from "./constants";

const initialState = {
    posts: [],
    fetchedposts: [],
}

export const postsReducer = (state = initialState, action) => {
    switch(action.type){
        case POSTS_CREATE_POST:
            return {...state, posts: [...state.posts, action.payload]}
        case POSTS_FETCH_POST:
            return {...state, fetchedposts: action.payload}
        default:
            return state;
    }
}