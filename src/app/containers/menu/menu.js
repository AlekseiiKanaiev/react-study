import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenu } from '../../../redux/menu/actions';
import { Carousel } from './components/carousel/carousel';
import { Loader } from '../../components/loader';
// import {menu} from './data';

export const Menu = (props) => {
    const [selected, setSelected] = useState([]);
    const menu = useSelector(state => state.menu);
    // console.log(menu);
    const dispatch = useDispatch();
    
    const onSelect = (item) => {
        const index = selected.findIndex(el => el.type === item.type);
        // console.log(index);
        if (index !== -1) {
            const id = selected[index].id;
            // console.log(id);
            if (id === item.id) {
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
            if (a.type < b.type) return -1;
            if ( a.type > b.type) return 1;
            return 0;
        })
        // console.log(selected);
        props.history.push('/selected', selected);
    }

    useEffect(() => {
        if (!menu.loaded) {
            dispatch(fetchMenu());
        }
    }, []);

    return (
        <div className= 'centred'>
            <h1>Menu</h1>
            <h2>Choose your racione</h2>
            {menu.loaded? 
                <Fragment>
                    {menu.breakfast.length > 0 && 
                    <div>
                        <h3>Choose breakfast</h3>
                        <Carousel menu={menu.breakfast} type = 'breakfast' onSelect={onSelect}/>
                    </div>
                    }
                    {menu.dinner.length > 0 && 
                        <div>
                            <h3>Choose dinner</h3>
                            <Carousel menu={menu.dinner} type = 'dinner' onSelect={onSelect}/>
                        </div>
                    }
                    {menu.supper.length > 0 && 
                        <div>
                            <h3>Choose supper</h3>
                            <Carousel menu={menu.supper} type = 'supper' onSelect={onSelect}/>
                        </div>
                    }
                </Fragment>
                :
                <Loader />
            }
            <button className='btn btn-info' style={{marginRight: '10px'}} disabled={selected.length < 3} onClick={choose}>Choose</button>
            <NavLink to = '/menu-edit' className='btn btn-info'>Edit</NavLink>
        </div>
    );
}