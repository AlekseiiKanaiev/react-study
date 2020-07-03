import React from 'react';
import { connect } from 'react-redux';
import { Post } from './post';

const PostsListComponent = (props) => {
    if (!props.myPosts.length){
        return <h3 style={{color:'red'}}>No post created</h3>
    }
    return(
        <div className="posts">
            {props.myPosts.map(post => <Post key = {post.id} post={post}/>)}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        myPosts: state.posts.posts
    }
};

// getting state trough connect function in props
export const PostsList = connect(mapStateToProps, null)(PostsListComponent);