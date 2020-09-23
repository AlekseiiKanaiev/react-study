import React, { useState, useEffect, Fragment } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './table.scss';

export const Table = (props) => {
    const [curWeek, setCurWeek] = useState(0);
    const mochWeeks = 10;
    const mochRows = [{}, {}, {}, {}];
    const mochData = [
        {
            day: 5,
            name: 'ex1'
        },
        {
            day: 5,
            name: 'ex2'
        },
        {
            day: 31,
            name: 'ex3'
        }
    ];
    const week = ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
        <div className='table-component'>
                <div className='header'>
                <button  className='decreaseWeeks' onClick = {() => setCurWeek(curWeek - 1)} disabled = {curWeek === 0}>
                    <ArrowBackIosIcon />
                </button>
                <span>Weeks {curWeek*4 + 1} - {curWeek*4 + 4}</span>
                <button  className='increaseWeeks' onClick = {() => setCurWeek(curWeek + 1)} disabled = {curWeek >= mochWeeks / 4 - 1}>
                    <ArrowForwardIosIcon />
                </button>
            </div>
            <div className = 'table'>
                <table className='weeks-table'>
                    <thead>
                        <tr><td></td></tr>
                    </thead>
                    <tbody>
                        {mochRows.map((el, index) => (
                            <tr key = {index} className='weekRow'>
                                <td>{((index + curWeek*4) + 1) <= mochWeeks && `W${(index + curWeek*4) + 1}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className = 'calendar-table'>
                    <thead>
                        <tr>
                            {week.map((el, index) => <th key = {el}>{el}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {mochRows.map((el, index) => (
                            <tr key = {index + 'row'}>
                                {week.map((el, i) => (
                                <td key = {i + 'cell'} onClick = {() => alert(`Current day is ${(i+1)+((curWeek*4 + index)*7)}`)}>
                                    {(i+1)+((curWeek*4 + index)*7) <= mochWeeks*7 &&
                                        <p>
                                            <span>{(i+1)+((curWeek*4 + index)*7)}</span>
                                            {mochData.map(ex => (
                                                ex.day === (i+1)+((curWeek*4 + index)*7) &&
                                                <p key = {`${ex.day}-${ex.name}`}>
                                                    {ex.name}
                                                </p>
                                            ))}
                                        </p>
                                    }
                                </td>))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
