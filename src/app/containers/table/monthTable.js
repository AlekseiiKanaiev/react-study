import React, { useState, useEffect, Fragment } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './table.scss';

export const MonthTable = (props) => {
// January - 31 days.
// February - 28 days in a common year and 29 days in leap years.
// March - 31 days.
// April - 30 days.
// May - 31 days.
// June - 30 days.
// July - 31 days.
// August - 31 days
// September - 30 days
// October - 31 days
// November - 30 days
// December - 31 days
    const [month, setMonth] = useState(0);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thusrsday', 'Friday', 'Saturday'];
    const week = ['W', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const date = new Date(Date());
    const year = date.getFullYear();
    const firstDay = (new Date(year, month, 1).getDay()) || 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const daysBeforeFirstDay = firstDay - 1 ;
    const totalDaysInCalendar = daysInMonth + daysBeforeFirstDay;
    const weeksRows = new Array(Math.ceil(totalDaysInCalendar / 7));
    weeksRows.fill(1);

    useEffect(() => {
        setMonth(date.getMonth());
    }, [])

    const goToPrevMonth = () => {
        setMonth(month - 1);
    };

    const goToNextMonth = () => {
        setMonth(month + 1);
    };

    const getDayNumber = (weekIndex, dayIndex) => {
        const day = weekIndex * 7 + dayIndex;
        if (day < firstDay) return day + daysInPrevMonth - daysBeforeFirstDay;
        if (day > totalDaysInCalendar) return day - totalDaysInCalendar;
        return day - daysBeforeFirstDay;
    }

    return (
        <div>
            <p>MonthTable</p>
            <div className='header'>
                <button  className='decreaseWeeks' onClick = {() => goToPrevMonth() } >
                    <ArrowBackIosIcon />
                </button>
                <span>{months[new Date(2020, month + 1, 0).getMonth()]}</span>
                <button  className='increaseWeeks' onClick = {() => goToNextMonth()} >
                    <ArrowForwardIosIcon />
                </button>
            </div>
            <p>First day on {days[firstDay]},
            days in month: {daysInMonth},
            days in calendar before first day: {firstDay? firstDay - 1 : 6}</p>
            <div className = 'table'>
                <table className = 'calendar-table'>
                    <thead>
                        <tr>
                            {week.map((el) => <th key = {el}>{el}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {weeksRows.map((el, weekIndex) => (
                            <tr key = {weekIndex + 'row'}>
                                {week.map((el, dayIndex) => (
                                <td key = {dayIndex + 'cell'} onClick = {() => alert(`Current day is `)}>
                                    {/* {(i+1)+((curWeek*4 + index)*7) <= weeks*7 &&
                                        <div>
                                            <span>{(i+1)+((curWeek*4 + index)*7)}</span>
                                            {mochData.map(ex => (
                                                ex.day === (i+1)+((curWeek*4 + index)*7) &&
                                                <p key = {`${ex.day}-${ex.name}`}>
                                                    {ex.name}
                                                </p>
                                            ))}
                                        </div>
                                    } */}
                                    {!dayIndex ?
                                        <span>W{weekIndex}</span>
                                        :
                                        <div>
                                            <span>{getDayNumber(weekIndex, dayIndex)}</span>
                                        </div>
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
