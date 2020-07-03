import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../../../../../redux/app/actions';

export const AddForm = (props) => {
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [img, setImage] = useState('');
    const dispatch = useDispatch();

    const addHandler = (e) => {
        e.preventDefault();
        if(!name || !description || !img){
            dispatch(showAlert({type: 'danger', text: 'You must fill all inputs'}))
            return;
        }
        props.submitHandler({name, description, img});
        setName('');
        setDesc('');
        setImage('');
    }

    return (
        <form onSubmit={addHandler}>
            <div className="form-group">
                <label htmlFor="exampleInputName">Name</label>
                <input type="text" className="form-control" id="exampleInputName" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputDescription">Description</label>
                <input type="text" className="form-control" id="exampleInputDescription" value={description} onChange={(e)=>setDesc(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputImage">Image link</label>
                <input type="text" className="form-control" id="exampleInputImage" value={img} onChange={(e)=>setImage(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">ADD</button>
        </form>
    );
}