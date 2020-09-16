import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../../components/loader';
import { Time } from './components/time/time';
import { ComandList } from './components/commandList/comandList';
import { Blocks } from './components/blocks/blocks';
import { TaskList } from './components/taskList/taskList';
import { AddCommand } from './components/addCommand/addCommand';

export const Dis = (props) => {
    const user = window.localStorage.getItem('user');
    const {loading, user: storedUser} = useSelector(state => state.app);

    if(!user){
        props.history.push('/');
    }
    else if (loading) {
        return <Loader />
    }
    else if (storedUser?.roles !== 'DIS'){
        props.history.push('/');
    }

    return (
        <div>
            <h2>
                DIS
            </h2>
            <Time />
            <Blocks />
            <AddCommand />
            <ComandList />
            <TaskList />
        </div>
    );
}
