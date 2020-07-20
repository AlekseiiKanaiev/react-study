import React, { useEffect, Fragment } from 'react';
// import {FirebaseContext} from '../../../../../context/firebase/firebase.context';
// import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addBreakfast, addDinner, addSupper, deleteBreakfast, deleteDinner, deleteSupper, fetchMenu, addAdminDish, deleteAdminDish } from '../../../../../redux/menu/actions';
import { SimpleAlert } from '../../../../components/simpleAlert';
import { MenuList } from './menuList/menuList';
import { AddForm } from './addForm/addForm';
import { Loader } from '../../../../components/loader';
import './menu-edit.scss';
import { saveUserDish, showAlert } from '../../../../../redux/app/actions';

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
        console.log(storedUser);
        if (!menu.loaded && storedUser?.roles === 'ADMIN') {
            dispatch(fetchMenu());
            console.log(1);
        }
    }, [storedUser]);
    
    // console.log(menu);

    const addUserDish = (item) => {
        const newDish = {...item, date: +(new Date())};
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

    function isAdmin() {
        return (
            <Fragment>
                {storedUser?.roles === 'ADMIN' ? 
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
                                <MenuList menu={menu.adminMenu} isDisabled={menu.loading} deleteHandler={(id) => dispatch(deleteAdminDish(id))}/>
                                :
                                <Loader />
                            }
                            <h3 className='menu-edit-header'>Add global dish</h3>
                            <AddForm isDisabled={menu.loading} submitHandler={(item) => dispatch(addAdminDish({...item, date: +(new Date())}))}/>
                        </AccordionDetails>
                    </Accordion>
                :
                    null}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <SimpleAlert />
            <h1>Menu edit</h1>
            <div className='accordion'>
                
                {loading ?
                    <Loader />
                :
                    <Fragment>
                        {isAdmin()}
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
                                        storedUser.userDishes?.length > 0 ?
                                            <MenuList menu={storedUser.userDishes} isDisabled={menu.loading} deleteHandler={(date) => removeUserDish(date)}/>
                                        :   
                                            <p>You haven't got any dishes yet</p>
                                    }
                                    <h3 className='menu-edit-header'>Add user dish</h3>
                                    <AddForm isDisabled={menu.loading} submitHandler={(item) => addUserDish(item)}/>
                                </AccordionDetails>
                            </Accordion>
                        
                    </Fragment>
                }
                {/* <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className='accordion-header'>Breakfast</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h3 className='menu-edit-header'>Breakfast list</h3>
                        {menu.loaded ? 
                            <MenuList menu={menu.breakfast} isDisabled={menu.loading} deleteHandler={(id) => dispatch(deleteBreakfast(id))}/>
                            :
                            <Loader />
                        }
                        <h3 className='menu-edit-header'>Add breakfast</h3>
                        <AddForm isDisabled={menu.loading} submitHandler={(item) => dispatch(addBreakfast(item))}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className='accordion-header'>Dinner</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h3 className='menu-edit-header'>Dinner list</h3>
                        {menu.loaded ? 
                            <MenuList menu={menu.dinner} isDisabled={menu.loading} deleteHandler={(id) => dispatch(deleteDinner(id))}/>
                            :
                            <Loader />
                        }
                        <h3 className='menu-edit-header'>Add dinner</h3>
                        <AddForm isDisabled={menu.loading} submitHandler={(item) => dispatch(addDinner(item))}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className='accordion-header'>Supper</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h3 className='menu-edit-header'>Supper list</h3>
                        {menu.loaded ?
                            <MenuList menu={menu.supper} isDisabled={menu.loading} deleteHandler={(id) => dispatch(deleteSupper(id))}/>
                            :
                            <Loader />
                        }
                        <h3 className='menu-edit-header'>Add supper</h3>
                        <AddForm isDisabled={menu.loading} submitHandler={(item) => dispatch(addSupper(item))}/>
                    </AccordionDetails>
                </Accordion> */}
            </div>
        </Fragment>
    );
}
