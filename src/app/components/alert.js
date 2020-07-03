import React, {useContext} from 'react';
import { CSSTransition } from 'react-transition-group';
import { AlertContext } from '../../context/alert/alert.context';

export const Alert = () => {
    const {alert, hide} = useContext(AlertContext);
    return (
        <CSSTransition
            in={alert.visible}
            timeout={750}
            classNames="my-node"
            mountOnEnter
            unmountOnExit
        >
            <div className= {`alert alert-${alert.type || 'warning'} alert-dismissible`}>
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