import React, {useContext, useEffect} from 'react';
import { Form } from './components/form';
import { NotesList } from './components/notesList';
import { FirebaseContext } from '../../../context/firebase/firebase.context';
import { Loader } from '../../components/loader';
import { AlertContext } from '../../../context/alert/alert.context';

export const Notes = () => {
    const alert = useContext(AlertContext);
    const {loading, notes, fetchNotes, removeNote, addNote} = useContext(FirebaseContext);

    const addHandler = (value) => {
        if (!value.trim()) {
            alert.show('No text', 'warning');
            return;
        }
        addNote(value.trim())
            .then(() => alert.show('Note has been created', 'success'))
            .catch((e) => alert.show(e.message, 'danger'));
    }

    const deleteHandler = (id) => {
        removeNote(id)
            .then(() => alert.show('Note has been deleted', 'warning'))
            .catch((e) => alert.show(e.message, 'danger'));
    }
    
    // eslint-disable-next-line
    useEffect(() => {
        fetchNotes()
            .catch((e) => alert.show(e.message, 'danger'));
    }, []);

    return (
        <div>
            <h1>Notes</h1>
            <Form addHandler={addHandler} />
            <hr />
            {loading? <Loader /> : <NotesList notes = {notes} deleteHandler={deleteHandler}/>}
        </div>
        
    );
}