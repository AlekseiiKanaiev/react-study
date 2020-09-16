import React, { useState, useEffect, Fragment } from 'react';
import './game.scss';

export const Table = (props) => {
    console.log(props.curWeek)
    const week = ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
        <table>
            <thead>
                <tr>
                    {week.map((el, index) => <th key = {el}>{el}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.rows.map((el, index) => (
                    <tr key = {index + 'row'}>
                        {week.map((el, i) => (
                        <td key = {i + 'cell'}>
                            {(i+1)+((props.curWeek*4 + index)*7)}
                            {props.data.map(ex => (
                                ex.day === (i+1)+((props.curWeek*4 + index)*7) &&
                                <p key = {`${ex.day}-${ex.name}`}>
                                    {ex.name}
                                </p>
                            ))}
                        </td>))}
                    </tr>
                ))}
            </tbody>

        </table>
    )
}
