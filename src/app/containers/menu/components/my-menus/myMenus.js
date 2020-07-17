import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableMenu } from '../tableMenu/tableMenu';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';
import { updateUser } from '../../../../../redux/app/actions';
import './myMenus.scss';
import { Loader } from '../../../../components/loader';

export const MyMenus = (props) => {
    const [index, setIndex] = useState('');
    const [open, setOpen] = useState(false);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const {loading, user: storedUser} = useSelector(state => state.app);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!(user || storedUser)) {
            props.history.push('/login', props.location.pathname);
        }
    }, [user, storedUser]);

    const deleteMenu = (i) => {
        setIndex(i);
        // storedUser.userMenus.splice(index, 1);
        // console.log(storedUser);
        // dispatch(updateUser(storedUser));
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteMenu = () => {
        handleClose();
        storedUser.userMenus.splice(index, 1);
        console.log(storedUser);
        dispatch(updateUser(storedUser));
    }

    console.log(storedUser);
    const isMenus = storedUser && storedUser.userMenus.length > 0
    return (
        <Fragment>
            <h2>Saved user menus</h2>
            {loading ? 
                <Loader />
            :
                isMenus ? 
                    storedUser.userMenus.map((menu, i) => (
                        <div key = {i}>
                            <div className='header'>
                                <h3>{menu.name}</h3>
                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleOpen}>&times;</button>
                            </div>
                            <TableMenu  menu = {menu.selectedMenu}/>
                        </div>
                    ))
                :
                <p>You haven't got any saved menus</p>
            }
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you shure you want to delete this menu?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteMenu} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}