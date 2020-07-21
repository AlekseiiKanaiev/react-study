import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './redux/rootReducer'; 
import { forbiddenWordMiddleware } from './redux/middleware';
import { sagaWatcher } from './redux/posts/saga';
import createSagaMiddleware from 'redux-saga'
import { App } from './app/app';
import './index.scss';
import { spawn } from 'redux-saga/effects';
import { menuSaga } from './redux/menu/saga';
import { appSaga } from './redux/app/saga';

const saga = createSagaMiddleware();

const store = createStore(rootReducer, compose(
        applyMiddleware(thunk, forbiddenWordMiddleware, saga),
        // cause error in build version -> comment for deploy
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

function* rootSaga() {
    yield spawn(sagaWatcher);
    yield spawn(menuSaga);
    yield spawn(appSaga);
}

saga.run(rootSaga);

const app = (
    <Provider store = {store}>
        <App />
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById('root')
);

