import React, { useState, useCallback, useEffect } from 'react';

function useLogger(value) {
    useEffect(() => {
        console.log('value changed: ' + value)
    }, [value])
}

function useInput(initValue){
    const [value, setValue] = useState(initValue);
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const clear = () => {
        setValue('');
    }
    return {
        bind: {value, onChange},
        value,
        clear
    };
}

export const CustomHooks = (props) => {
    const [age, setAge] = useState(0);

    const changeAgeHandler = (e) => {
        setAge(e.target.value)
    }

    const inputName = useInput('');
    const inputLastName = useInput('');

    useLogger(inputName.value);

    return (
        <>
            <div className='section header'>
                <h3>Cunstom hooks</h3>
            </div>
            <div>
                <input type='text' value={inputName.bind.value} onChange={inputName.bind.onChange}/>
                <button type='button' className='btn btn-warning btn-sm' onClick={inputName.clear}>Clear</button>
                <br />
                <input type='text' {...inputLastName.bind}/>
                <br />
                <input type='number' value={age} onChange={changeAgeHandler}/>
                <br />
            </div>
        </>
    )
}
