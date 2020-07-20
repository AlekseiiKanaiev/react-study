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
    Button
} from '@material-ui/core';
import { fetchMenu, setSelectedMenu } from '../../../redux/menu/actions';
import { Carousel } from './components/carousel/carousel';
import { Loader } from '../../components/loader';

// import {menu} from './data';

export const Menu = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [meals, setMeals] = useState([]);
    const [selected, setSelected] = useState([]);
    const [position, setPos] = useState(0);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const {loading, user: storedUser} = useSelector(state => state.app);
    const menu = useSelector(state => state.menu);
    // console.log(menu);
    const dispatch = useDispatch();
    
    const onSelect = (item) => {
        console.log(item);
        const index = selected.findIndex(el => el.type === item.type);
        console.log(index);
        if (index !== -1) {
            // console.log(id);
            if (selected[index].date === item.date) {
                setSelected(state => state.filter(el => el.type !== item.type));
            } else {
                setSelected(state => state.filter(el => el.type !== item.type));
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
        // if (!menu.loaded) {
        //     dispatch(fetchMenu());
        // }
        console.log(menu.selectedMenu);
        // setSelected(menu.selectedMenu);
        const selectedMeals = menu.selectedMenu.map((item, i) => ({name: item.type, position: i}));
        setMeals(selectedMeals);
    }, [menu]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    function addMeal() {
        setOpen(false);
        const meal = {name, position};
        setMeals([...meals, meal]);
        setPos(state => state+1);
        setName('');
    }

    // console.log(selected);
    // console.log(meals);
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
                storedUser?.userDishes ?
                    <Fragment>
                        {meals.length > 0 &&
                            meals.map((item, i) => (
                                <div key={item.position}>
                                    <h3>Choose {item.name}</h3>
                                    <Carousel menu={storedUser.userDishes} type = {item.name} selectedMenu = {menu.selectedMenu} onSelect={onSelect}/>
                                </div>
                            ))
                        }
                        <div>
                            <button onClick={handleClickOpen}>Add meal</button>
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
                <button className='btn btn-info' style={{marginRight: '10px'}} disabled={selected.length !== meals.length} onClick={choose}>Choose</button>
            }
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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