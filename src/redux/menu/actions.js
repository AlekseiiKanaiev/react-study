import {
    MENU_FETCH_MENU,
    MENU_LOADED,
    MENU_SET_LOADING,
    MENU_REMOVE_LOADING,
    MENU_SET_SELECTED_MENU,
    MENU_ADD_MENU_ADMIN,
    MENU_DELETE_MENU_ADMIN,
    MENU_SET_MENU
} from "./constants";

export const fetchMenu = () => {
    // console.log('action', MENU_FETCH_MENU);
    return {
        type: MENU_FETCH_MENU
    };
}

export const addAdminDish = (item) => {
    return ({type: MENU_ADD_MENU_ADMIN, payload: item})
}
export const deleteAdminDish = (id) => {
    return ({type: MENU_DELETE_MENU_ADMIN, payload: id})
}

export const menuLoaded = () => {
    return ({type: MENU_LOADED})
}

export const menuSetLoading = () => {
    return ({type: MENU_SET_LOADING})
}
export const menuRemoveLoading = () => {
    return ({type: MENU_REMOVE_LOADING})
}


export const setSelectedMenu = (menu) => {
    return ({type: MENU_SET_SELECTED_MENU, payload: menu})
}

export const setMenu = (menu) => {
    return ({type: MENU_SET_MENU, payload: menu})
}
