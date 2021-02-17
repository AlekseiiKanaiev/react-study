import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { showAlert } from '../../../../../../redux/app/actions';
import './addForm.scss';

export const AddForm = (props) => {
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [img, setImage] = useState('');
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    const types = ['breakfast', 'dinner', 'supper'];

    const addHandler = (e) => {
        e.preventDefault();
        if(!name || !description || !img){
            dispatch(showAlert({type: 'danger', text: 'You must fill all inputs'}));
            return;
        }
        props.submitHandler({name, description, img, type});
        setName('');
        setDesc('');
        setImage('');
        setType('');
    }

    return (
        <form onSubmit={addHandler} className='add-new-dish-form'>
            <TextField
                label="Name*"
                variant="outlined"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <TextField
                label="Description*"
                variant="outlined"
                value={description}
                onChange={(e)=>setDesc(e.target.value)}
            />
            <TextField
                label="Image link*"
                variant="outlined"
                value={img}
                onChange={(e)=>setImage(e.target.value)}
            />
            <FormControl variant="outlined" className='select-type'>
            <InputLabel id="demo-simple-select-outlined-label">Type*</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="Age"
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {types.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
                </Select>
            </FormControl>
            <button type="submit" className="btn btn-primary" disabled={props.isDisabled || !(name && description && img)}>ADD</button>
        </form>
    );
}
