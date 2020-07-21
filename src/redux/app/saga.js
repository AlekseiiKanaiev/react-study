import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { APP_UPDATE_USER_MENU, APP_UPDATE_USER_DISH, APP_UPDATE_USER_SUCCESS, APP_GET_USER } from './constants';
import { showLoader, hideLoader, setUser } from './actions';

const url = process.env.REACT_APP_DB_URL;

export function* appSaga() {
    yield takeEvery(APP_UPDATE_USER_MENU, updateUser);
    yield takeEvery(APP_UPDATE_USER_DISH, updateUser);
    yield takeEvery(APP_GET_USER, getUserByEmail);
}

function* getUserByEmail(action){
    yield put(showLoader());
    const response = yield call(getUsers);
    let user;
    if (response) {
        Object.keys(response.data).forEach(key => {
            if (response.data[key].email === action.payload) {
                user = {...response.data[key], id: key};
            }
        })
    }
    if (user){
        yield put(setUser(user));
    }
    yield put(hideLoader());

}

async function getUsers(){
    try{
        return await axios.get(`${url}/users.json`);
    }
    catch(e){
        throw new Error('Server Error: ' + e.message);
    }
}

function* updateUser(action) {
    // console.log(action.payload);
    const data = Object.assign({}, action.payload);
    delete data.id;
    
    yield call(putUser, action.payload.id, data);
    yield put({type: APP_UPDATE_USER_SUCCESS, payload: action.payload});
}

async function putUser(id, data){
    try{
        await axios.put(`${url}/users/${id}.json`, data);
    } catch(e) {
        throw new Error('Server Error: ' + e.message);
    }
}