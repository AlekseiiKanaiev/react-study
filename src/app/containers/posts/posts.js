import React, {Fragment} from 'react';
import { Form } from './components/form';
import { PostsList } from './components/postsList';
import { FetchPostsList } from './components/fetchPostsList';
import { SimpleAlert } from '../../components/simpleAlert'

export const Posts = () => {

    return(
        <Fragment>
           <SimpleAlert />
            <div className='row'>
                <div className='col'>
                    <Form />
                </div>
            </div>
            <hr />
            <div className='row'>
                <div className='col'>
                    <h2>Ours posts</h2>
                    <PostsList />
                </div>
                <div className='col'>
                    <h2>Feched posts</h2>
                    <FetchPostsList />
                </div>
            </div>
        </Fragment>
    );
}