import {takeEvery, put, call, takeLatest} from 'redux-saga/effects';
import { showLoader, showAlert, hideLoader } from '../app/actions';
import axios from 'axios';
import {
    MENU_FETCH_MENU,
    MENU_ADD_MENU_BREAKFAST,
    MENU_ADD_MENU_DINNER,
    MENU_ADD_MENU_SUPPER,
    MENU_SET_MENU_BREAKFAST,
    MENU_SET_MENU_DINNER,
    MENU_SET_MENU_SUPPER,
    MENU_REMOVE_MENU_BREAKFAST,
    MENU_REMOVE_MENU_SUPPER,
    MENU_REMOVE_MENU_DINNER,
    MENU_DELETE_MENU_BREAKFAST,
    MENU_DELETE_MENU_DINNER,
    MENU_DELETE_MENU_SUPPER
} from "./constants";
import {setBreakfast, setDinner, setSupper, menuLoaded} from './actions'

const url = process.env.REACT_APP_DB_URL;

export function* menuSaga() {
    yield takeEvery(MENU_FETCH_MENU, fetchMenu);
    yield takeLatest(MENU_ADD_MENU_BREAKFAST, addMenuItem);
    yield takeLatest(MENU_ADD_MENU_DINNER, addMenuItem);
    yield takeLatest(MENU_ADD_MENU_SUPPER, addMenuItem);
    yield takeLatest(MENU_DELETE_MENU_BREAKFAST, removeMenuItem);
    yield takeLatest(MENU_DELETE_MENU_DINNER, removeMenuItem);
    yield takeLatest(MENU_DELETE_MENU_SUPPER, removeMenuItem);
}


function* fetchMenu() {
    console.log('fetch menu');
    try{
        yield put(showLoader());
        const response = yield call(getMenu);
        let payload = [];
        response.forEach(res => {
            console.log(res.data);
            if (res.data){
                payload.push(Object.keys(res.data).map(key => ({...res.data[key], id: key})));
                // dispatch({type: FETCH_NOTES, payload});
                // hideLoader();
            }
        });
        console.log(payload);
        if (payload[0]) {yield put(setBreakfast(payload[0]));}
        if (payload[1]) {yield put(setDinner(payload[1]));}
        if (payload[2]) {yield put(setSupper(payload[2]));}
        yield put(menuLoaded());
        console.log('setted');
        yield put(hideLoader());
    } catch(e) {
        console.log(e);
        yield put(hideLoader());
    }
}

async function getMenu(){
    const urls = [`${url}/menu_breakfast.json`, `${url}/menu_dinner.json`, `${url}/menu_supper.json`];
    const gets = urls.map(url => axios.get(url));
    return await axios.all([...gets]);
}

function* addMenuItem (action) {
    console.log(action);
    let type = null;
    let actionType = null;
    switch (action.type) {
        case MENU_ADD_MENU_BREAKFAST:
            type = 'breakfast';
            actionType = MENU_SET_MENU_BREAKFAST;
            break;
        case MENU_ADD_MENU_DINNER:
            type = 'dinner';
            actionType = MENU_SET_MENU_DINNER;
            break;
        case MENU_ADD_MENU_SUPPER:
            type = 'supper';
            actionType = MENU_SET_MENU_SUPPER;
            break;
        default:
            break;
    }
    if (!type || !actionType){
        return
    }
    const payload = yield call(postMenuItem, action.payload, type);
    console.log(payload);
    yield put({type: actionType, payload});
    yield put(showAlert({type: 'success', text: `Add new ${type}`}));
}

const postMenuItem = async (item, type) => {
    try{
        const response = await axios.post(`${url}/menu_${type}.json`, item);
        console.log('add', response);
        const payload = {...item, id: response.data.name};
        return payload;
        // console.log(payload);
        // dispatch({type: ADD_NOTE, payload});
    }
    catch(e){
        throw new Error('Server Error: ' + e.message);
    }
}

function*  removeMenuItem(action){
    console.log(action);
    let type = null;
    let actionType = null;
    switch (action.type) {
        case MENU_DELETE_MENU_BREAKFAST:
            type = 'breakfast';
            actionType = MENU_REMOVE_MENU_BREAKFAST;
            break;
        case MENU_DELETE_MENU_DINNER:
            type = 'dinner';
            actionType = MENU_REMOVE_MENU_DINNER;
            break;
        case MENU_DELETE_MENU_SUPPER:
            type = 'supper';
            actionType = MENU_REMOVE_MENU_SUPPER;
            break;
        default: 
            break;
    }
    if (!type || !actionType){
        return;
    }
    console.log(1);
    yield call(deleteMenuItem, type, action.payload);
    yield put({type: actionType, payload: action.payload});
    yield put(showAlert({type: 'warning', text: `Deleted ${type} item`}));
}
const deleteMenuItem = async (type, id) => {
    await axios.delete(`${url}/menu_${type}/${id}.json`);
}