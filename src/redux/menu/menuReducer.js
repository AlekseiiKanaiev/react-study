import {
    MENU_LOADED,
    MENU_SET_LOADING,
    MENU_REMOVE_LOADING,
    MENU_SET_SELECTED_MENU,
    MENU_FETCH_MENU_SUCCESS,
    MENU_ADD_MENU_ADMIN_SUCCESS,
    MENU_DELETE_MENU_ADMIN_SUCCESS,
    MENU_SET_MENU
} from "./constants";

const initialState = {
    selectedMenu: [],
    setMenu: [],
    adminMenu: [],
    loaded: false,
    loading: false
}

export const menuReducer = (state = initialState, action) => {
    switch(action.type){
        case MENU_LOADED:
            return {...state, loaded: true}
        case MENU_SET_LOADING:
            return {...state, loading: true}
        case MENU_REMOVE_LOADING:
            return {...state, loading: false}

        case MENU_FETCH_MENU_SUCCESS:
            return {...state, adminMenu: action.payload};

        case MENU_ADD_MENU_ADMIN_SUCCESS:
            console.log(action.payload);
            return {...state, adminMenu: state.adminMenu.concat(action.payload)}
        case MENU_DELETE_MENU_ADMIN_SUCCESS:
            return {...state, adminMenu: state.adminMenu.filter(item => item.id !== action.payload)}

        case MENU_SET_SELECTED_MENU:
            return {...state, selectedMenu: action.payload}
        case MENU_SET_MENU:
            return {...state, setMenu: action.payload}
        default:
            return state;
    }
}
