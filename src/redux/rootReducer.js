import { combineReducers } from "redux";
import { postsReducer } from './posts/postsReducer'
import { appReducer } from "./app/appReducer";
import { menuReducer } from "./menu/menuReducer";

export const rootReducer = combineReducers({
    posts: postsReducer,
    app: appReducer,
    menu: menuReducer
});