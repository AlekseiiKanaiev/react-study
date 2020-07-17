import React, { Fragment, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FirebaseContext } from '../../../../context/firebase/firebase.context';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../../../redux/app/actions';
import { SimpleAlert } from '../../../components/simpleAlert';

export const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repPass, setRepPass] = useState('');

    const {register} = useContext(FirebaseContext);
    const dispatch = useDispatch();

    // const user = useSelector(state => state.app.user);
    const user = window.localStorage.getItem('user');
    // const user = useSelector(state => state.app.user) || JSON.parse(window.localStorage.getItem('user'));

    const verifyEmail = (email) => {
        return (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email));
    }

    const sumbitHandler = (e) => {
        e.preventDefault();
        if (pass !== repPass || pass.length < 6 || !verifyEmail(email) || name.length < 2) {
            dispatch(showAlert({type: 'warning', text: 'Incorrect form fill'}));
            return;
        }
        register(email, pass, name)
        .then(() => {
            console.log('push');
            props.history.push('/about');
            
        })
        .catch((e) => dispatch(showAlert({type: 'danger', text: e.message})));
    }

    if (user) {
        return <Redirect to ='/' />
    }

    return (
        <Fragment>
            <SimpleAlert />
            <h1>Register</h1>
            <form onSubmit={sumbitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleInputName">Your name</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" value={name} onChange={(e)=>setName(e.target.value)} />
                    {/* <small id="name" className="form-text text-muted"></small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={pass} onChange={(e)=>setPass(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={repPass} onChange={(e)=>setRepPass(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <button type='button' className="btn btn-primary login-page-btn" onClick={() => props.history.push('/login')}>To login</button>
            <button type='button' className="btn btn-primary login-page-btn" onClick={() => props.history.push('/')}>To main</button>
        </Fragment>
    );
}