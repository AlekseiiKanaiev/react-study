import React, {useState, useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';
import './selected.scss';
import { showAlert, saveUserMenu } from '../../../../../redux/app/actions';
import { SimpleAlert } from '../../../../components/simpleAlert';
import { TableMenu } from '../tableMenu/tableMenu';

export const Selected = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const selectedMenu = useSelector(state => state.menu.selectedMenu);
    const user = useSelector(state => state.app.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(selectedMenu);
        if (!selectedMenu.length) {
            props.history.push('/menu');
        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveMenu = async () => {
        setOpen(false);
        const savedMenu = {name, selectedMenu, date: new Date()};
        const updUser = user.userMenus ? {...user, userMenus: [...user.userMenus, savedMenu]} : {...user, userMenus: [savedMenu]};
        dispatch(saveUserMenu(updUser));
        dispatch(showAlert({type: 'success', text: 'Your menu has been saved'}));
        setName('');
    }

    return (
        <Fragment>
            {selectedMenu.length && 
                <Fragment>
                    <SimpleAlert/>
                    <h2>Selected Menu</h2>
                    <TableMenu menu = {selectedMenu}/>
                    {user && 
                        <button type='button' className='btn btn-success save-button' onClick={handleClickOpen}>Save</button>
                    }
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter name of your menu
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name of menu"
                                type="text"
                                fullWidth
                                defaultValue={name}
                                onChange = {(e) => setName(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSaveMenu} color="primary" disabled={name.length<1}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>
            }
        </Fragment>
    );
}