import {
    MENU_FETCH_MENU,
    MENU_ADD_MENU_BREAKFAST,
    MENU_ADD_MENU_DINNER,
    MENU_ADD_MENU_SUPPER,
    MENU_SET_MENU_BREAKFAST,
    MENU_SET_MENU_DINNER,
    MENU_SET_MENU_SUPPER,
    MENU_LOADED,
    MENU_DELETE_MENU_BREAKFAST,
    MENU_DELETE_MENU_DINNER,
    MENU_DELETE_MENU_SUPPER,
    MENU_SET_LOADING,
    MENU_REMOVE_LOADING,
    MENU_SET_SELECTED_MENU,
    MENU_ADD_MENU_ADMIN,
    MENU_DELETE_MENU_ADMIN
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

export const addBreakfast = (item) => {
    return ({type: MENU_ADD_MENU_BREAKFAST, payload: item})
}
export const addDinner = (item) => {
    return ({type: MENU_ADD_MENU_DINNER, payload: item})
}
export const addSupper = (item) => {
    return ({type: MENU_ADD_MENU_SUPPER, payload: item})
}

export const setBreakfast = (item) => {
    return ({type: MENU_SET_MENU_BREAKFAST, payload: item})
}
export const setDinner = (item) => {
    return ({type: MENU_SET_MENU_DINNER, payload: item})
}
export const setSupper = (item) => {
    return ({type: MENU_SET_MENU_SUPPER, payload: item})
}

export const deleteBreakfast = (id) => {
    return ({type: MENU_DELETE_MENU_BREAKFAST, payload: id})
}
export const deleteDinner = (id) => {
    return ({type: MENU_DELETE_MENU_DINNER, payload: id})
}
export const deleteSupper = (id) => {
    return ({type: MENU_DELETE_MENU_SUPPER, payload: id})
}

export const setSelectedMenu = (menu) => {
    return ({type: MENU_SET_SELECTED_MENU, payload: menu})
}