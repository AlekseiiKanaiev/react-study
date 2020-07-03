import React, {useEffect, Fragment} from 'react';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';
import './selected.scss';

export const Selected = (props) => {
    console.log(props.location);
    const {state} = props.location;

    useEffect(() => {
        console.log(state);
        if (!state) {
            props.history.push('/menu');
        }
    }, []);

    return (
        <Fragment>
        {state && 
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
                    {state.map((item) => (
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
        }
        </Fragment>
    );
}