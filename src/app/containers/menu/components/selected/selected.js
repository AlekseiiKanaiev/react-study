import React, {useState, useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';
import './selected.scss';
import { showAlert } from '../../../../../redux/app/actions';
import { SimpleAlert } from '../../../../components/simpleAlert';

export const Selected = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const selectedMenu = useSelector(state => state.menu.selectedMenu);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(selectedMenu);
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

    const handleSaveMenu = () => {
        setOpen(false);
        dispatch(showAlert({type: 'success', text: 'Your menu has been saved (no)'}));
        
    }

    return (
        <Fragment>
            {selectedMenu.length && 
                <Fragment>
                    <SimpleAlert/>
                    <h2>Selected Menu</h2>
                    <TableContainer component={Paper}>
                        <Table className='table' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedMenu.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        {item.type}
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.description}</TableCell>
                                    <TableCell align="right">
                                        <img src={item.img} alt={item.name} className='image'/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <button type='button' className='btn btn-success save-button' onClick={handleClickOpen}>Save</button>
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
                                Subscribe
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>
            }
        </Fragment>
    );
}