import React, { Fragment, useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../../../context/firebase/firebase.context';
import { SimpleAlert } from '../../../components/simpleAlert';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../../../redux/app/actions';
// import { Redirect } from 'react-router-dom';
import './login.scss'

export const Login = (props) => {
    const {login} = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    console.log(props);
    // console.log(props.history);
    // console.log(props.match);

    // const user = useSelector(state => state.app.user);
    const user = window.localStorage.getItem('user');
    // const user = useSelector(state => state.app.user) || JSON.parse(window.localStorage.getItem('user'));
    console.log(user);

    const verifyEmail = (email) => {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
    }

    const sumbitHandler = (e) => {
        e.preventDefault();
        // console.log(props.history);
        if (!verifyEmail(email) || !pass.length >= 6) {
            dispatch(showAlert({type: 'warning', text: 'Incorrect email or password'}));
            return;
        }
        login(email, pass)
        .then(() => props.history.goBack())
        .catch((e) => dispatch(showAlert({type: 'danger', text: e.message})));
    }

    useEffect(() => {
        if (user) {
            props.location.state 
                ? props.history.push(props.location.state)
                : props.history.push('/')
        }
    }, [user])
    

    return (
        <Fragment>
            <SimpleAlert />
            <h1>Login</h1>
            <form onSubmit={sumbitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={pass} onChange={(e)=>setPass(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Login</button>
            </form>
            <button type='button' className="btn btn-primary login-page-btn" onClick={() => props.history.push('/register')}>Register</button>
            <button type='button' className="btn btn-primary login-page-btn" onClick={() => props.history.push('/')}>To main</button>
            {/* <button type='button' className="btn btn-primary" onClick={() => logout()}>Logout</button> */}
        </Fragment>
    );
}
