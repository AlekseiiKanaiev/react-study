import React, { useState, useEffect, useRef } from 'react';

// let renderCount = 1;

export const UseReftHook = (props) => {
    // const [renderCount, setRenderCount] = useState(1);
    const [val, setVal] = useState('');
    const renderCount = useRef(1);
    const inputEl = useRef(null);
    const prevVal = useRef('');

    useEffect(() => {
        // setRenderCount((prev) => prev + 1);
        renderCount.current++;
        console.log(inputEl.current.value);
    });

    useEffect(() => {
        prevVal.current = val;
    }, [val])

    return (
        <>
            <div className='section header'>
                <h3>useRef hook</h3>
            </div>
            <div>
                <p>
                    При создании переменная с помощью хука useRef мы получаем объект.
                    Состояния заданные через хук useRef сохраняются между рендерами компонентов, но изменение состояния таких  переменных не вызывает ререндер компонента
                </p>
                <p>
                    Render count: {renderCount.current}
                </p>
                <p>
                    Также хук useRef часто используют для создания ссылок на DOM элементы.
                </p>
                <p>
                    <input ref={inputEl} type='text' value={val} onChange={(e) => setVal(e.target.value)}/>
                </p>
                <button type='button' className='btn btn-success' onClick={() => inputEl.current.focus()}>
                    Focus
                </button>
                <p>
                    Также с помощью useRef мы можем получить значение предыдущего состояния переменной до рендера:
                    <br/>
                    Предыдущее состояние инпута: {prevVal.current}
                </p>
            </div>
            <div>

            </div>
        </>
    )
}
