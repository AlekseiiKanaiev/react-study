import React, {useReducer} from 'react';
import { AlertContext } from './alert.context';
import { alertReducer } from './alert.reducer';
import { SHOW_ALERT, HIDE_ALERT } from './alert.constants';

export const AlertState = ({children}) => {
    const initialState = {
        text: '',
        type: '',
        visible: false
    }
    const [state, dispatch] = useReducer(alertReducer, initialState);

    const show = (text, type = 'warning') => {
        dispatch({type: SHOW_ALERT, payload: {text, type}});
        // setTimeout(hide, 2000);
    }

    const hide = () => {
        dispatch({type: HIDE_ALERT});
    }

    return (
        <AlertContext.Provider value = {{show, hide, alert: state}}>
            {children}
        </AlertContext.Provider>
    );
}
