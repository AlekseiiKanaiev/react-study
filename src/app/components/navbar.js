import React, { useContext, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
    // Menu,
    MenuList,
    MenuItem,
    Button,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
} from '@material-ui/core';
import { FirebaseContext } from '../../context/firebase/firebase.context';
import { useSelector } from 'react-redux';

export const Navbar = (props) => {
    const {logout} = useContext(FirebaseContext);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const storedUser = useSelector(state => state.app.user);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        console.log('close');
    };
    const handleLogout = (e) => {
        handleClose(e);
        logout().then(() => console.log('logout'));
    }
    // const [user, setUser] = useState(userRec);
    // console.log(user);
    return (
        <nav className = 'navbar navbar-dark navbar-expand-lg bg-primary'>
            <div className= 'navbar-brand'>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to = '/' className="nav-link" exact>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to = '/about' className="nav-link">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to = '/notes' className="nav-link">Notes</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to = '/posts' className="nav-link">Posts</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to = '/game' className="nav-link">Game</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to = '/menu' className="nav-link">Menu</NavLink>
                    </li>
                    {storedUser?.roles === 'DIS' &&
                        <li className="nav-item">
                            <NavLink to = '/dis' className="nav-link">Dis</NavLink>
                        </li>
                    }
                </ul>
            </div>
            {user ?
                <div>
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        className = 'user-button'
                        id = 'user-button'
                    >
                        {user.userName || user.displayName}
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex: 10}}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={() => window.location.assign('menu-edit')}>Edit dishes</MenuItem>
                                        <MenuItem onClick={() => window.location.assign('my-menus')}>My menus</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                    </Popper>
                </div>
            :
                <NavLink className="login-link" to = '/login'>Login</NavLink>
            }
        </nav>
    );
}
