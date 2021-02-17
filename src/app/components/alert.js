import React, {useContext, useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import { AlertContext } from '../../context/alert/alert.context';

export const Alert = () => {
    const {alert, hide} = useContext(AlertContext);
    const [showMessage, setShow] = useState(alert.visible);
    useEffect(() => {
        console.log(alert.visible)
        setShow(alert.visible)
    }, [alert])
    return (
        <CSSTransition
            in={showMessage}
            timeout={750}
            classNames="my-node"
            mountOnEnter
            unmountOnExit
        >
            <div>
                <div className= {`alert alert-${alert.type || 'warning'} alert-dismissible`}>
                    <strong>Внимание!</strong>
                    <p>
                        {alert.text}
                    </p>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>

        </CSSTransition>
    );
}
