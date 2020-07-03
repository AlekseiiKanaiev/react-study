import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../../redux/app/actions';

export const SimpleAlert = () => {

    const alert = useSelector(state => state.app.alert);
    const dispatch = useDispatch();

    const hide = () => {
        // setShow(false);
        dispatch(hideAlert());
    }

    const style = {
        position: 'fixed',
        zIndex: '100',
        width: '930px'
    };

    return (
        <CSSTransition
            in={alert.show}
            timeout={750}
            classNames="my-node"
            mountOnEnter
            unmountOnExit
        >
            <div className= {`alert alert-${alert.type || 'warning'} alert-dismissible`} style = {style} >
                <strong>Внимание!</strong>
                <p>
                    {alert.text}
                </p>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={hide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </CSSTransition>
    );
}