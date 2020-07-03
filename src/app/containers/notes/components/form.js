import React, {useState} from 'react';

export const Form = (props) => {
    const [value, setValue] = useState('');
    
    const submitHandler = (e) => {
        e.preventDefault();
        props.addHandler(value);
        setValue('');
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='form-group'>
                <input className='form-control' 
                    type = 'text' 
                    placeholder = 'Название заметки' 
                    value = {value}
                    onChange={(e)=> setValue(e.target.value)}
                    />
            </div>
        </form>
    );
}