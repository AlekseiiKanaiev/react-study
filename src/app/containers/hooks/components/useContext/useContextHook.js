import React, { useState, useContext,  useCallback, useEffect, createContext } from 'react';
import { Main } from './main';
import { AlertProvider } from './alert/alertContext';
import { Alert } from './alert/alert'

export const useContextHook = (props) => {


    return (
        <>
            <div className='section header'>
                <h3>useContext hook</h3>
            </div>
            <AlertProvider>
                <div className='container'>
                    <Alert />
                    <Main toggleAlert={() => {}} />
                </div>
            </AlertProvider>
        </>
    )
}
