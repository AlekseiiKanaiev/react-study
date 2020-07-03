import { SHOW_LOADER, HIDE_LOADER, ADD_NOTE, REMOVE_NOTE, FETCH_NOTES } from "./firebase.constants";

const handlers = {
    DEFAULT: (state) => state,
    [SHOW_LOADER]: (state) => ({...state, loading:true}),
    [HIDE_LOADER]: (state) => ({...state, loading:false}),
    [ADD_NOTE]: (state, {payload}) => ({...state, notes: [...state.notes, payload]}),
    [REMOVE_NOTE]: (state, {payload}) => ({...state, notes: state.notes.filter(note => note.id !== payload)}),
    [FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload}),
    // [SET_USER]: (state, {payload}) => ({...state, user: payload}),
    // [REMOVE_USER]: (state) => ({...state, user: null}),
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    
    return handle(state, action);
}