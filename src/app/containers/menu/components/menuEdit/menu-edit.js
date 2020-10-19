import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchMenu, addAdminDish, deleteAdminDish } from '../../../../../redux/menu/actions';
import { SimpleAlert } from '../../../../components/simpleAlert';
import { MenuList } from './menuList/menuList';
import { AddForm } from './addForm/addForm';
import { Loader } from '../../../../components/loader';
import { saveUserDish, showAlert } from '../../../../../redux/app/actions';
import './menu-edit.scss';

export const MenuEdit = (props) => {
    // const {logout} = useContext(FirebaseContext);
    const menu = useSelector(state => state.menu);
    // const user = useSelector(state => state.app.user);
    // const {user} = useSelector(state => state.app);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const {loading, user: storedUser} = useSelector(state => state.app);

    const dispatch = useDispatch();

    // console.log(user);
    useEffect(() => {
        if (!user && !storedUser) {
            props.history.push('/login', props.location.pathname);
        }
    }, [user, storedUser]);

    useEffect(() => {
        // console.log(storedUser);
        if (!menu.loaded) {
            dispatch(fetchMenu());
        }
    }, [storedUser]);

    console.log(menu);

    const addUserDish = (item) => {
        console.log(item);
        const newDish = item.date? {...item} : {...item, date: +(new Date())};
        if (newDish.id) {
            delete newDish.id;
        }
        const updUser = storedUser.userDishes ? {...storedUser, userDishes: [...storedUser.userDishes, newDish]} : {...storedUser, userDishes: [newDish]};
        // console.log(updUser);
        dispatch(saveUserDish(updUser));
        dispatch(showAlert({type: 'success', text: 'Your dish has been added'}));
    }
    const removeUserDish = (date) => {
        // console.log(storedUser.userDishes);
        const updUserDishes = storedUser.userDishes.filter(item => item.date !== date);
        const updUser = {... storedUser, userDishes: updUserDishes};
        dispatch(saveUserDish(updUser));
        dispatch(showAlert({type: 'warning', text: 'Your dish has been removed'}));
    }

    return (
        <div>
            <SimpleAlert />
            <h1>Menu edit</h1>
            <div className='accordion'>
            {loading ?
                <Loader />
            :
                <Fragment>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className='accordion-header'>Global dishes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <h3 className='menu-edit-header'>Global dishes list</h3>
                            {menu.loaded ?
                                <MenuList
                                    user = {storedUser}
                                    menu={menu.adminMenu}
                                    isDisabled={menu.loading}
                                    deleteHandler={(id) => dispatch(deleteAdminDish(id))}
                                    addUserDish = {(item) => addUserDish(item)}
                                    list = 'globalList'
                                />
                                :
                                <Loader />
                            }
                            {storedUser?.roles === 'ADMIN' &&
                                <Fragment>
                                    <h3 className='menu-edit-header'>Add global dish</h3>
                                    <AddForm isDisabled={menu.loading} submitHandler={(item) => dispatch(addAdminDish({...item, date: +(new Date())}))}/>
                                </Fragment>
                            }
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className='accordion-header'>User dishes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <h3 className='menu-edit-header'>User dishes list</h3>
                            {
                                storedUser?.userDishes?.length > 0 ?
                                    <MenuList
                                        menu={storedUser.userDishes}
                                        isDisabled={menu.loading}
                                        deleteHandler={(date) => removeUserDish(date)}
                                        list = 'userlList'
                                    />
                                :
                                    <p>You haven't got any dishes yet</p>
                            }
                            <h3 className='menu-edit-header'>Add user dish</h3>
                            <AddForm isDisabled={menu.loading} submitHandler={(item) => addUserDish(item)}/>
                        </AccordionDetails>
                    </Accordion>
                </Fragment>
            }
            </div>
        </div>
    );
}
