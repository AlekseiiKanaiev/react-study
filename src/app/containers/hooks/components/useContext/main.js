import React from 'react';
// import { useAlertToggle } from './alert/alertContext';
import { useAlert } from './alert/alertContext';

export const Main = () => {
    // const toggleAlert = useAlertToggle();
    const {show} = useAlert();

    return (
        <>
            <div className='section header'>
                <h3>Hello</h3>
            </div>
            <button type='button' className='btn btn-success' onClick={() => show('Some text')}>
                Show alert
            </button>
        </>
    )
}
