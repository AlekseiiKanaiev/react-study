import React, { createContext, useState, useContext, useReducer } from 'react';

const AlertContext = createContext();
// const AlertToggleContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
}

// export const useAlertToggle = () => {
//     return useContext(AlertToggleContext);
// }
const SHOW_ALERT = 'SHOW_ALERT';
const HIDE_ALERT = 'HIDE_ALERT';

const reducer = (state, action) => {
    switch (action.type){
        case SHOW_ALERT:
            return {...state, visible: true, text: action.payload}
        case HIDE_ALERT:
            return {...state, visible: false}
        default:
            return state;
    }
}

export const AlertProvider = ({children}) => {
    // const [alert, setAlert] = useState(false);

    const initState = {visible: false, text: ''};
    const[state, dispatch] = useReducer(reducer, initState);

    // const toggle = () => {
    //     setAlert(!alert);
    // }

    const show = (text) => {
        return dispatch({type: SHOW_ALERT, payload:text});
    }

    const hide = () => {
        return dispatch({type: HIDE_ALERT});
    }

    return (
        <AlertContext.Provider value={
            {
                visible: state.visible,
                text: state.text,
                // toggle,
                show,
                hide,
            }
        }>
            {/* <AlertToggleContext.Provider value={toggle}> */}
                {children}
            {/* </AlertToggleContext.Provider> */}
        </AlertContext.Provider>
    )
}
