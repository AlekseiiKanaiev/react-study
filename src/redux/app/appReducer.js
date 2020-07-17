import { APP_SHOW_LOADER, APP_HIDE_LOADER, APP_SHOW_ALERT, APP_HIDE_ALERT, APP_SET_USER, APP_REMOVE_USER, APP_UPDATE_USER } from "./constants"

const initialState = {
    loading:true,
    alert: {
        type: '',
        text: '',
        show: false
    },
    user: null,
}

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case APP_SHOW_LOADER:
            return ({...state, loading: true});
        case APP_HIDE_LOADER:
            return ({...state, loading: false});
        case APP_SHOW_ALERT:
            // console.log(action.payload);
            return ({...state, alert: {...action.payload, show: true}});
        case APP_HIDE_ALERT:
            return ({...state, alert: {show: false}});
        case APP_SET_USER:
        case APP_UPDATE_USER:
            console.log('set');
            return ({...state, user: action.payload});
        case APP_REMOVE_USER:
            return ({...state, user: null});
        default:
            return state;
    }
}