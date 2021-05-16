import React, { useState, useCallback, useEffect } from 'react';
import { ItemsList } from './itemsList';

export const useCallbackHook = (props) => {
    const [count, setCount] = useState(1);
    const [colored, setColored] = useState(false);

    const styles = {
        color: colored ? 'red' : 'black'
    };

    // const generateItems = () => {
    //     return new Array(count).fill('').map((item, index) => `Element ${index + 1}`)
    // };

    const generateItems = useCallback(() => {
        return new Array(count).fill('').map((item, index) => `Element ${index + 1}`)
    }, [count]);

    return (
        <>
            <div className='section header'>
                <h3>useCallback hook</h3>
            </div>
            <div>
                <p>
                    Позволяет оптимизировать компонент!
                    <br />
                    Вслучае, если рендеринг компонента занимает много времени из-за каких-либо вычислений, связанных с необязательными вызывами функций, то при изменении состояния любой переменной и следовательно вызова ререндеринга это может вызывать проблемы
                    <br />
                    В отличии от useMemo возвращает не результат функции, а саму фукнкцию
                </p>
                <p style={styles}>Elements count: {count}</p>
                <button type='button' className='btn btn-success' onClick={() => setCount(count+1)}>
                    Increas
                </button>
                <button type='button' className='btn btn-warning' onClick={() => setColored(!colored)}>
                    Warning
                </button>
            </div>
            <div>
                <ItemsList getItems={generateItems}/>
            </div>

        </>
    )
}
