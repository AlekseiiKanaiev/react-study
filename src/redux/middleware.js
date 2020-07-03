import { POSTS_CREATE_POST } from "./posts/constants"
import { showAlert } from "./app/actions";

//forbiden words
const forbidden = ['fuck', 'php', 'spam']

export const forbiddenWordMiddleware = ({dispatch}) => {
    console.log(2);
    return (next) => (action) => {
        if(action.type === POSTS_CREATE_POST) {
            if (forbidden.some(word => action.payload.title.includes(word))){
                console.log(1);
                return dispatch(showAlert({type: 'danger', text: 'Spam found'}))
            }
        }
        return next(action);
    }
}