import React, { useReducer } from 'react';
import axios from 'axios';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer,
    // IfFirebaseAuthed,
    // IfFirebaseAuthedAnd
  } from "@react-firebase/auth";

import { FirebaseContext } from './firebase.context';
import { firebaseReducer } from './firebase.reducer';
import { SHOW_LOADER, HIDE_LOADER, ADD_NOTE, REMOVE_NOTE, FETCH_NOTES } from './firebase.constants';
import { removeUser, getUser } from '../../redux/app/actions';
import { useDispatch } from 'react-redux';

const url = process.env.REACT_APP_DB_URL;

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_DB_URL,
    messagingSenderId: process.env.REACT_APP_STORAGE_BUCKET,
    appId: process.env.REACT_APP_MESSAGING_SENDER_ID
}
firebase.initializeApp(config);

export const FirebaseStateFunction = (props) => {
    const dispatchRedux = useDispatch();
    // app.initializeApp(config);
    // const firibaseAuth = app.auth();
    // console.log(props);

    if (props.user?.displayName) {
        // console.log(props.user);
        setUserLocal(props.user);
    }

    const initialState = {
        notes: [],
        loading: false,
        user: null
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    function setUserLocal(user) {
        console.log('set user');
        // console.log(user);
        window.localStorage.setItem('user', JSON.stringify(user));
        dispatchRedux(getUser(user.email));
    }

    const showLoader = () => {
        dispatch({type: SHOW_LOADER});
    }

    const hideLoader = () => {
        dispatch({type: HIDE_LOADER});
    }

    const addNote = async (title) => {
        const note = {
            title,
            date: new Date().toJSON()
        }
        try{
            const response = await axios.post(`${url}/notes.json`, note);
            // console.log('add', response);
            const payload = {...note, id: response.data.name}
            // console.log(payload);
            dispatch({type: ADD_NOTE, payload});
        }
        catch(e){
            throw new Error('Server Error: ' + e.message);
        }
    }

    const removeNote = async (id) => {
        try {
            await axios.delete(`${url}/notes/${id}.json`);
            dispatch({type: REMOVE_NOTE, payload: id});
        }
        catch(e){
            throw new Error('Server Error: ' + e.message);
        }
    }
    
    const fetchNotes = async () => {
        showLoader();
        try{
            const result = await axios.get(`${url}/notes.json`);
            // console.log('fetch', result.data);
            if (result.data){
                const payload = Object.keys(result.data).map(key => ({...result.data[key], id: key}));
                dispatch({type: FETCH_NOTES, payload});
                hideLoader();
            }
        } catch(e) {
            hideLoader();
            throw new Error('Server Error: ' + e.message);
        }
    }

    const login = (email, pass) => {
        return props.firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((user) => {
            // console.log(user);
            setUserLocal(user.user);
            return Promise.resolve();
        });
    }

    const logout = () => {
        return props.firebase.auth().signOut().then(() => {
            window.localStorage.removeItem('user');
            dispatchRedux(removeUser());
            // return Promise.resolve();
        });
    }

    const register = (email, pass, userName='guest', roles = '') => {
        return props.firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(async(user) => {
            // console.log(user);
            const newUser = {email, roles, userName};
            try{
                const response = await axios.post(`${url}/users.json`, newUser);
                // console.log(response);
                const updUSer = props.firebase.auth().currentUser;
                updUSer.updateProfile({displayName: userName})
                .then(() => {
                    // console.log(user);
                    setUserLocal(user.user);
                })
                .catch((e) => console.log(e));
            } catch(e) {
                console.log(e);
                // throw new Error('Server Error: ' + e.message);
            } 
        });
    }

    return (
        <FirebaseContext.Provider 
            value = {{
                showLoader, 
                hideLoader,
                addNote,
                removeNote,
                fetchNotes,
                login,
                logout,
                register,
                // setUserContext,
                loading: state.loading,
                notes: state.notes,
                user: state.user
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
}

export const FirebaseState = ({children}) => {
    return (
        <FirebaseAuthConsumer>
            <FirebaseStateFunction children={children}/>
        </FirebaseAuthConsumer>
    );
}

export const FirebaseAuth = ({children}) => (
    <FirebaseAuthProvider  {...config} firebase={firebase}>
        {children}
    </FirebaseAuthProvider>
);