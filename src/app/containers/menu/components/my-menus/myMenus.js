import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableMenu } from '../tableMenu/tableMenu';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';
import { showAlert, saveUserMenu } from '../../../../../redux/app/actions';
import { Loader } from '../../../../components/loader';
import { SimpleAlert } from '../../../../components/simpleAlert';
import './myMenus.scss';

export const MyMenus = (props) => {
    const [index, setIndex] = useState('');
    const [open, setOpen] = useState(false);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const {loading, user: storedUser} = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user && !storedUser) {
            props.history.push('/login', props.location.pathname);
        }
    }, [user, storedUser]);

    const handleOpen = (i) => {
        setIndex(i);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteMenu = async() => {
        handleClose();
        const name = storedUser.userMenus[index].name;
        storedUser.userMenus.splice(index, 1);
        dispatch(saveUserMenu(storedUser));
        dispatch(showAlert({type: 'warning', text: `Your menu "${name}" has been deleted`}));
    }

    // console.log(storedUser);
    const isMenus = storedUser?.userMenus?.length > 0
    return (
        <Fragment>
            <SimpleAlert/>
            <h2>Saved user menus</h2>
            {loading ?
                <Loader />
            :
                isMenus ?
                    storedUser.userMenus.map((menu, i) => (
                        <Fragment key = {menu.date}>
                        {menu &&
                            <div className='saved-menu'>
                                <div className='header'>
                                    <div>
                                        <h3>{menu.name}</h3>
                                        <small>created: {menu.date.split('T')[0]}</small>
                                    </div>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleOpen(i)}>&times;</button>
                                </div>
                                <TableMenu  menu = {menu.selectedMenu}/>
                            </div>
                        }
                        </Fragment>
                    ))
                :
                    <p>You haven't got any saved menus</p>
            }

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete menu</DialogTitle>
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
