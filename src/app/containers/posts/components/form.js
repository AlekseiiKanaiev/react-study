import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../../redux/posts/actions';
import { showAlert } from '../../../../redux/app/actions'

const FormComponent = (props) => {
    const [value, setValue] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        if (!value.trim()) {
            // alert.show('No text', 'warning');
            props.showAlert({type: 'warning', text: 'No title'});
            return;
        }
        const post = {id: new Date(), title: value}
        props.createPost(post);
        setValue('');
    }

    return(
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter post"
                    name='post'
                    value = {value}
                    onChange = {(e) => setValue(e.target.value)}
                />
                <button type='submit' className='btn btn-success mt-1'>Add</button>
            </div>
        </form>
    );
}

const mapDispatchToProps = {
    createPost,
    showAlert
}

// getting actions trough connect function in props
export const Form = connect(null, mapDispatchToProps)(FormComponent);