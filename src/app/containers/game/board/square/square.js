import React, { useState, useEffect } from 'react';
import './square.scss'

export const Square = (props) => {
    const [value, setValue] = useState(props.value);
    

    useEffect(() => {
        setValue(props.value)
    }, [props.value]);

    const style = props.isWinVal ? 'square winner' : 'square';
    return (
        <button className = {style} onClick = {() => props.handleClick()}>
          {value}
        </button>
    );
}