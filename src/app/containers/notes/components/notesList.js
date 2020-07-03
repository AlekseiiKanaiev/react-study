import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const NotesList = (props) => (
    <TransitionGroup component = 'ul' className='list-group'>
        {props.notes.map(note => (
            <CSSTransition
                key = {note.id}
                classNames = 'note'
                timeout = {800}
            >
                <li className='list-group-item note'>
                    <div>
                    <b>{note.title}</b>
                        <small>{new Date().toLocaleDateString()}</small>
                    </div>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => props.deleteHandler(note.id)}>&times;</button>
                </li>
            </CSSTransition>
        ))}
    </TransitionGroup>
)
