import React from 'react';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';

export const TableMenu = (props) => {
    // console.log(props);
    return (
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
                {props.menu.map((item) => (
                    <TableRow key={`${item.type}-${item.date}`}>
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
    );
}