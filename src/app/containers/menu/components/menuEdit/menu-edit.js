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
import { addBreakfast, addDinner, addSupper, deleteBreakfast, deleteDinner, deleteSupper, fetchMenu } from '../../../../../redux/menu/actions';
import { SimpleAlert } from '../../../../components/simpleAlert';
import { MenuList } from './menuList/menuList';
import { AddForm } from './addForm/addForm';
import { Loader } from '../../../../components/loader';
import './menu-edit.scss';

export const MenuEdit = (props) => {
    // const {logout} = useContext(FirebaseContext);
    const menu = useSelector(state => state.menu);
    // const user = useSelector(state => state.app.user);
    // const {user} = useSelector(state => state.app);
    const user = useSelector(state => state.app.user) || JSON.parse(window.localStorage.getItem('user'));
    
    const dispatch = useDispatch();

    // console.log(user);
    useEffect(() => {
        if (!user) {
            // return <Redirect to='/login' from = {props.history.location.pathname}/>
            props.history.push('/login', props.location.pathname);
        }
    }, [user])

    useEffect(() => {
        if (!menu.loaded) {
            dispatch(fetchMenu());
        }
    }, []);
    
    
    return (
        <Fragment>
            <SimpleAlert />
            <h1>Menu edit</h1>
            <div className='accordion'>
                <Accordion>
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
                </Accordion>
            </div>
        </Fragment>
    );
}
