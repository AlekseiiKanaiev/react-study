import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Post } from './post';
import { Loader } from '../../../components/loader';
import { requestPosts } from '../../../../redux/posts/actions';

export const FetchPostsList = () => {
    // getting state trough react-redux hooks 
    const posts = useSelector((state) => state.posts.fetchedposts);
    const loading = useSelector((state) => state.app.loading);
    // function dispatch using for dispatch actions - react-redux hook
    const dispatch = useDispatch();
    if (loading) {
        return <Loader />
    }
    if (!posts.length){
        return <button className='btn btn-primary' onClick={() => dispatch(requestPosts())}>Load posts</button>
    }
    return(
        <div className="posts">
            {posts.map(post => <Post key = {post.id} post={post}/>)}
        </div>
    );
}
