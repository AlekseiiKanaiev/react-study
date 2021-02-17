import React, { Fragment, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './menuList.scss';

export const MenuList = (props) => {
    console.log(props);
    const [search, setSearch] = useState('');
    const [type, setType] = React.useState('');
    const types = ['breakfast', 'dinner', 'supper'];
    let showFilters = true;
    let menu = props.menu;
    if (props.list === 'globalList' && props.user && props.user.userDishes) {
        menu = menu.filter(item => !props.user.userDishes.some(el => el.date === item.date));
        showFilters = menu.length > 0;
    }
    if (type){
        console.log(type);
        menu = menu.filter(el => el.type && el.type === type);
    }
    if (search.trim()){
        menu = menu.filter(el => el.name.split(' ').some(el => el.startsWith(search.trim()))
            || el.description.split(' ').some(el => el.startsWith(search.trim()))
            || el.description.includes(search.trim())
        );
    }
    // console.log(menu);
    return (
        <Fragment>
            {showFilters &&
                <div className="filters">
                    <TextField id="filled-search" label="Search field" type="search" variant="filled" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <FormControl className='menu-select'>
                        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {types.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
                        </Select>
                        {/* <FormHelperText>Select type of the dish</FormHelperText> */}
                    </FormControl>
                </div>
            }
            <TransitionGroup component = 'ul' className='list-group'>
            {menu.map(item => (
                <CSSTransition
                    key = {item.date}
                    classNames = 'item'
                    timeout = {800}
                >
                    <li className='list-group-item item'>
                        <div>
                            <h5>{item.name}</h5>
                            <p>{item.description}</p>
                        </div>
                        <div>
                            {item.id &&
                                <button
                                    type='button'
                                    className='btn btn-outline-success btn-sm add-button'
                                    onClick = {() => props.addUserDish(item)}
                                    disabled={props.isDisabled || props.user?.userDishes?.some(el => el.date === item.date)}
                                >
                                    +
                                </button>
                            }
                            {(props.user?.roles === 'ADMIN' || !props.user) &&
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm delete-button"
                                    onClick={() => props.deleteHandler(item.date)}
                                    disabled={props.isDisabled}
                                >
                                    &times;
                                </button>
                            }
                        </div>
                    </li>
                </CSSTransition>
            ))}
            </TransitionGroup>
        </Fragment>
    );
}
