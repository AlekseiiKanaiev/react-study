import {takeEvery, put, call} from 'redux-saga/effects'
import { REQUEST_POSTS } from './constants'
import { showLoader, hideLoader, showAlert } from '../app/actions'
import { fetchedPosts } from './actions';

export function* sagaWatcher() {
    yield takeEvery(REQUEST_POSTS, sagaWorker)
}

function* sagaWorker() {
    console.log('fetch posts');
    try{
        yield put(showLoader());
        const payload = yield call(fetchPosts);
        yield put(fetchedPosts(payload));
        yield put(hideLoader());
    } catch(e) {
        yield put(showAlert({type: 'danger', text: 'Server error'}));
        yield put(hideLoader());
    }
    
}  

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    return await response.json();
}