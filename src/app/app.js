import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AlertState } from '../context/alert/alert.state';
import { FirebaseState, FirebaseAuth } from '../context/firebase/firebase.state';
import { Navbar } from './components/navbar';
import { Alert } from './components/alert';
import { Routes } from './route';

export const App = () => {
    return (
        <FirebaseAuth>
            <FirebaseState>
                    <AlertState>
                        <BrowserRouter>
                            <Navbar />
                            <div className = 'container pt-4'>
                                <Alert />
                                <Routes />
                            </div>
                        </BrowserRouter>
                    </AlertState>
            </FirebaseState>
        </FirebaseAuth>
    );
}