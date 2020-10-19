import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    MenuItem,
    Select
} from '@material-ui/core';
import { setMenu, setSelectedMenu } from '../../../redux/menu/actions';
import { Carousel } from './components/carousel/carousel';
import { Loader } from '../../components/loader';
import './menu.scss';

// import {menu} from './data';

export const Menu = (props) => {
    const menu = useSelector(state => state.menu);
    const {loading, user: storedUser} = useSelector(state => state.app);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [meals, setMeals] = useState([]);
    const [selected, setSelected] = useState([]);
    const [position, setPos] = useState(0);
    const [search, setSearch] = useState([]);
    const [type, setType] = React.useState([]);
    const user = JSON.parse(window.localStorage.getItem('user'));
    console.log(storedUser, menu);
    const dispatch = useDispatch();
    const types = ['breakfast', 'dinner', 'supper'];

    const onSelect = (item) => {
        console.log(item);
        const index = selected.findIndex(el => el.date === item.date);
        // console.log(index);
        if (index !== -1) {
            // console.log(id);
            if (selected[index].date === item.date) {
                setSelected(state => state.filter(el => el.date !== item.date));
            } else {
                setSelected(state => state.filter(el => el.date !== item.date));
                setSelected(state => [...state, item]);
            }
        } else {
            setSelected(state => [...state, item]);
        }
    }

    const choose = () => {
        selected.sort((a, b) => {
            const firstPos = meals.find(el => el.name === a.type).position;
            const secondPos = meals.find(el => el.name === b.type).position;
            if (firstPos < secondPos) return -1;
            if ( firstPos > secondPos) return 1;
            return 0;
        })
        console.log(selected);
        dispatch(setSelectedMenu(selected));
        props.history.push('/selected');
    }

    useEffect(() => {
        console.log(menu.selectedMenu);
        let selectedMeals = [];
        if (menu.selectedMenu.length > 0) {
            selectedMeals = menu.selectedMenu.map((item, i) => ({title: item.title, position: i}));
        } else {
            selectedMeals = menu.setMenu.map((item, i) => ({title: item.title, position: i}));
        }
        setMeals(selectedMeals);
    }, [menu]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function addMeal() {
        console.log(meals);
        setOpen(false);
        const addedMeals = [...meals, { title : getName(name), position}];
        console.log(addedMeals);
        setMeals(addedMeals);
        setPos(state => state+1);
        setSearch([...search, ''])
        setName('');
        setType([...search, '']);
        dispatch(setMenu(addedMeals));
    }

    const inputHandler = (e, i) => {
        // console.log(e.target.value);
        const val = [...search];
        val.splice(i, 1, e.target.value);
        setSearch(val);
    }
    const changeType = (event, i) => {
        const res = [...type];
        res.splice(i, 1, event);
        setType(res);
    }

    const getName = name => {
        console.log(meals);
        const repeats = meals.filter(item => item.title == name);
        if(repeats.length){
            const newName = `${name}-${repeats.length}`;
            return newName;
        }
        return name;
    }

    const setTitle = title => {
        if(title.split(' ').length > 1){
            return title.replace(' ', '-');
        }
        return title;
    }
    // console.log(selected);
    console.log(meals);

    return (
        <div className= 'centred'>
            <h1>Menu</h1>
            <h2>Choose your racione</h2>
            {
            !user && !storedUser ?
                <p>
                    You are not logged, you may
                    <NavLink to = '/login' className=""> login </NavLink>
                    or if you are haven't got account yet -
                    <NavLink to = '/register' className="">register</NavLink>
                </p>
            :
                loading?
                    <Loader />
                :
                    storedUser?.userDishes ?
                        <Fragment>
                            {menu.setMenu.length > 0 &&
                                menu.setMenu.map((item, i) => (
                                    <div key={item.position}>
                                        <h3>Choose {item.title}</h3>
                                        {/* <input type='text' placeholder='search' value = {search[i]} onChange={}/> */}
                                        <TextField
                                            className = 'search-input'
                                            margin="dense"
                                            id="search"
                                            label="Search dish"
                                            type="text"
                                            defaultValue={search[i]}
                                            onChange = {(e) => inputHandler(e, i)}
                                        />
                                        <br />
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={type[i]}
                                            onChange={(e) =>  changeType(e.target.value, i)}
                                            >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {types.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
                                        </Select>
                                        <Carousel
                                            menu={type[i] ? storedUser.userDishes.filter(el => el.type && el.type === type[i]) : storedUser.userDishes}
                                            title = {setTitle(item.title)}
                                            selectedItem = {menu.selectedMenu[i]}
                                            search = {search[i]} onSelect={onSelect}
                                        />
                                    </div>
                                ))
                            }
                            <div>
                                <button onClick={handleClickOpen} className='btn btn-outline-success btn-lg'>Add meal</button>
                            </div>
                        </Fragment>
                    :
                        <p>
                            You haven't got any saved dishes, go to
                            <NavLink to = '/menu-edit' className=""> menu-edit </NavLink>
                            and add some
                        </p>
            }
            {selected.length > 0 &&
                <button className='btn btn-info' style={{marginTop: '10px'}} disabled={selected.length !== meals.length} onClick={choose}>Choose</button>
            }

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New meal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter name of your meal
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
                    <Button onClick={addMeal} color="primary" disabled={name.length<1}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
