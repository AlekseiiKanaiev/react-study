import React, { useState, useEffect } from 'react';


export const UseEffectHook = (props) => {
    const [type, setType] = useState('users');
    const [data, setData] = useState(null);
    const [pos, setPos] = useState({x:0, y: 0})

    useEffect(() => {
        console.log('При базовом использовании хука useEffect он будет вызываться при каждои рендере компонента');
    });
    const mousemoveHandle = (event) => {
        setPos({x: event.clientX, y: event.clientY})
    }
    useEffect(() => {
        console.log('Compponent did mount');

        window.addEventListener('mousemove', mousemoveHandle);
        return () => {
            console.log('component will unmount');
            window.removeEventListener('mousemove', mousemoveHandle);
        }
    }, []);

    useEffect(() => {
        console.log('Хук useEffect будет вызываться только при изменении состояния переменной во втором параметре колбэк-функции');
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(response => response.json())
            .then(json => setData(json));
        return () => {
            console.log('clean type');
        }
    }, [type]);

    // console.log('render')
    return (
        <>
            <div className='section header'>
                <h3>useEffect hook</h3>
            </div>
            <div>
                {<pre>{JSON.stringify(pos, null, 2)}</pre>}
            </div>
            <div className='section '>
                <p>
                    Ресурс: {type}
                </p>
                <button type='button' className='btn btn-info' onClick={() => setType('users')}>
                    Users
                </button>
                <button type='button' className='btn btn-info' onClick={() => setType('todos')}>
                    Todos
                </button>
                <button type='button' className='btn btn-info' onClick={() => setType('posts')}>
                    Posts
                </button>
            </div>
            <div>
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        </>
    )
}
