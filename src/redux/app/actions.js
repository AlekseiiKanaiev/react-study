import {
    APP_SHOW_LOADER,
    APP_HIDE_LOADER,
    APP_SHOW_ALERT,
    APP_HIDE_ALERT,
    APP_SET_USER,
    APP_REMOVE_USER,
    APP_UPDATE_USER,
    APP_UPDATE_USER_MENU,
    APP_UPDATE_USER_DISH,
    APP_GET_USER
} from "./constants";

export const showLoader = () => {
    return ({type: APP_SHOW_LOADER});
}
export const hideLoader = () => {
    return({type: APP_HIDE_LOADER});
}

export const showAlert = (alert, delay = 2000) => {
    console.log(alert);
    // return ({type: APP_SHOW_ALERT, payload: alert});
    // console.log(alert);
    return (dispatch) => {
        dispatch({type: APP_SHOW_ALERT, payload: alert});
        setTimeout(() => dispatch(hideAlertInner()), delay);
    }
}

function hideAlertInner() {
    return ({type: APP_HIDE_ALERT})
}

export const hideAlert = (delay = 0) => {
    return (dispatch) => {
        setTimeout(() => dispatch(hideAlert()), delay);
    }
};

export const getUser = (email) => {
    return ({type: APP_GET_USER, payload: email});
}

export const setUser = (user) => {
    console.log('set user');
    return ({type: APP_SET_USER, payload: user});
}

export const removeUser = () => {
    return ({type: APP_REMOVE_USER})
}

export const updateUser = (user) => {
    return ({type: APP_UPDATE_USER, payload: user});
}

export const saveUserMenu = (user) => {
    console.log(user);
    return ({type: APP_UPDATE_USER_MENU, payload: user});
}
export const saveUserDish = (user) => {
    return ({type: APP_UPDATE_USER_DISH, payload: user});
}