import React from 'react';
import { Route, Switch} from 'react-router-dom';
import {Game} from './containers/game/game';
import { Home } from './containers/home/home';
import { About } from './containers/about/about';
import { Notes } from './containers/notes/notes';
import { Posts } from './containers/posts/posts';
import { Menu } from './containers/menu/menu';
import { MenuEdit } from './containers/menu/components/menuEdit/menu-edit';
import { Login } from './containers/auth/login/login';
import { Register } from './containers/auth/register/register';
import { Selected } from './containers/menu/components/selected/selected';
import { MyMenus } from './containers/menu/components/my-menus/myMenus';
import { Dis } from './containers/dis/dis';
import { Table } from './containers/table/table';
import { Hooks } from './containers/hooks/hooks';
// import { FirebaseContext } from '../context/firebase/firebase.context';

export const Routes = () => {
    // const {setUserContext} = useContext(FirebaseContext);
    // useEffect(() => {
    //     setUserContext();
    // })
    return(
        <Switch>
            <Route exact path = '/' component = {Home}/>
            <Route path = '/about' component = {About}/>
            <Route path = '/notes' component = {Notes}/>
            <Route path = '/posts' component = {Posts}/>
            <Route path = '/game' component = {Game}/>
            <Route path = '/menu' component = {Menu}/>
            <Route path = '/menu-edit' component = {MenuEdit}/>
            <Route path = '/login' component = {Login}/>
            <Route path = '/register' component = {Register}/>
            <Route path = '/selected' component = {Selected}/>
            <Route path = '/my-menus' component = {MyMenus}/>
            <Route path = '/dis' component = {Dis}/>
            <Route path = '/table' component = {Table}/>
            <Route path = '/hooks' component = {Hooks}/>
        </Switch>
    );
}
