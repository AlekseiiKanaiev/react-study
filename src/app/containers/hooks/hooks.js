import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import './hooks.scss';
import { UseStateHook } from './components/useState/useStateHook';
import { UseEffectHook } from './components/useEffect/useEffectHook';
import { UseReftHook } from './components/useRef/useRefHook';
import { useMemoHook } from './components/useMemo/useMemoHook';
import { useCallbackHook } from './components/useCallback/useCallbackHook';
import { useContextHook } from './components/useContext/useContextHook';
import { CustomHooks } from './components/customHooks/customHooks';

export const Hooks = (props) => {
    return (
        <>
            <h2>Hooks</h2>
            <ul>
                <li>
                    <Link to={`/hooks/useState`}>useState hook</Link>
                </li>
                <li>
                    <Link to={`/hooks/useEffect`}>useEffect hook</Link>
                </li>
                <li>
                    <Link to={`/hooks/useRef`}>useRef hook</Link>
                </li>
                <li>
                    <Link to={`/hooks/useMemo`}>useMemo hook</Link>
                </li>
                <li>
                    <Link to={`/hooks/useCallback`}>useCallback hook</Link>
                </li>
                <li>
                    <Link to={`/hooks/useContext`}>useContext hook</Link>
                </li>
                <li>
                    <Link to={`/hooks/customHooks`}>Custom hooks</Link>
                </li>
            </ul>
            {/* <UseStateHook />
            <UseEffectHook />
            <UseReftHook /> */}
            <Switch>
                <Route path = '/hooks/useState' component = {UseStateHook}/>
                <Route path = '/hooks/useEffect' component = {UseEffectHook}/>
                <Route path = '/hooks/useRef' component = {UseReftHook}/>
                <Route path = '/hooks/useMemo' component = {useMemoHook}/>
                <Route path = '/hooks/useCallback' component = {useCallbackHook}/>
                <Route path = '/hooks/useContext' component = {useContextHook}/>
                <Route path = '/hooks/customHooks' component = {CustomHooks}/>
            </Switch>
        </>
    )
}
