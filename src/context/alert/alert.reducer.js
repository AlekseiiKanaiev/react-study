import { SHOW_ALERT, HIDE_ALERT } from './alert.constants'

const handlers = {
    DEFAULT: state => state,
    [SHOW_ALERT]: (state, {payload}) => ({...state, ...payload, visible: true}),
    [HIDE_ALERT]: (state) => ({...state, visible: false})

}

export const alertReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    // console.log(handle);
    return handle(state, action)
}