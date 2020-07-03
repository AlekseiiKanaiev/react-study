import {
    MENU_SET_MENU_BREAKFAST,
    MENU_SET_MENU_DINNER,
    MENU_SET_MENU_SUPPER,
    MENU_REMOVE_MENU_BREAKFAST,
    MENU_REMOVE_MENU_DINNER,
    MENU_REMOVE_MENU_SUPPER,
    MENU_LOADED,
    MENU_SET_LOADING,
    MENU_REMOVE_LOADING
} from "./constants";

const initialState = {
    breakfast: [],
    dinner: [],
    supper: [],
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
        case MENU_SET_MENU_BREAKFAST:
            return {...state, breakfast: state.breakfast.concat(action.payload)}
        case MENU_SET_MENU_DINNER:
            return {...state, dinner: state.dinner.concat(action.payload)}
        case MENU_SET_MENU_SUPPER:
            return {...state, supper: state.supper.concat(action.payload)}
        case MENU_REMOVE_MENU_BREAKFAST:
            return {...state, breakfast: state.breakfast.filter(item => item.id !== action.payload)}
        case MENU_REMOVE_MENU_DINNER:
            return {...state, dinner: state.dinner.filter(item => item.id !== action.payload)}
        case MENU_REMOVE_MENU_SUPPER:
            return {...state, supper: state.supper.filter(item => item.id !== action.payload)}
        default:
            return state;
    }
}