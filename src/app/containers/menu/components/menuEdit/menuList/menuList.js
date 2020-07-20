import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './menuList.scss';

export const MenuList = (props) => {
    console.log(props);
    return (
        <TransitionGroup component = 'ul' className='list-group'>
        {props.menu.map(item => (
            <CSSTransition
                key = {item.date}
                classNames = 'item'
                timeout = {800}
            >
                <li className='list-group-item item'>
                    <div>
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                    </div>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => props.deleteHandler(item.date)} disabled={props.isDisabled}>&times;</button>
                </li>
            </CSSTransition>
        ))}
        </TransitionGroup>
    );
}