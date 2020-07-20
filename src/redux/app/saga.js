import {takeEvery, put, call, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { APP_UPDATE_USER_MENU, APP_UPDATE_USER_DISH, APP_UPDATE_USER_SUCCESS } from './constants';
import { showAlert } from './actions';

const url = process.env.REACT_APP_DB_URL;

export function* appSaga() {
    yield takeEvery(APP_UPDATE_USER_MENU, updateUser);
    yield takeEvery(APP_UPDATE_USER_DISH, updateUser);
}

function* updateUser(action) {
    console.log(action.payload);
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