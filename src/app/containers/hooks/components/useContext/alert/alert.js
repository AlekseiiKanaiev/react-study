import React from 'react';
import { useAlert } from './alertContext';

export const Alert = (props) => {
    const {visible, text, hide} = useAlert();
    return (
        <>
            {visible && (
                <div className='alert alert-danger' onClick={hide}>
                    {text}
                </div>
            )}
        </>
    )
}
