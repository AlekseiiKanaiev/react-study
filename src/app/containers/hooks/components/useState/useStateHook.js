import React, { useState } from 'react';

function setState() {
    console.log('random');
    return Math.round(Math.random()*10);
}

export const UseStateHook = (props) => {
    const [count, setCount] = useState(() => setState());
    const example = useState(0);
    const [data, setData] = useState({
        title: 'Title',
        date: new Date(),
    })

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
        setCount(count - 1);
    };

    const fixedDecrement = () => {
        setCount((prevState) => {
            return prevState - 1;
        });
        setCount((prevState) => {
            return prevState - 1;
        });
    };

    return (
        <>
            <div className='section header'>
                <h3>useState hook</h3>
            </div>
            <div className='section'>

                <p>
                    useState возращает "кортеж"
                </p>
                <p>
                    {example.toString()}
                </p>
                <p>
                    В котором первое элемент - это текущее состояние, а второй - функция, позволяющая изменять текущее состояние
                </p>
                <p>Counter: {count}</p>
                <button type='button' className='btn btn-success' onClick={increment}>Increase</button>
                <button type='button' className='btn btn-danger' onClick={decrement}>Decrease</button>
                <button type='button' className='btn btn-danger' onClick={fixedDecrement}>Decrease (fixed)</button>
            </div>
            <div className='section'>
                <p>
                    Нажатие на кнопки вызывает функцию setCount, которая изменяет состояние нашей переменной
                </p>
            </div>
            <div className='section'>
                <p>Функция, позволяющая изменять текущее состояние работает асинхронно</p>
                <p>
                    Следовательно, если мы вызовем хук setCount несколько раз подряд, хук сработает только 1 раз,
                    так как при вызове setCount второй и следующие разы еще не будет отслежено предедущее изменение состояния, и следовательно мы в каждом вызове setCount будем менять начально состояние
                </p>
                <p>
                    Эта проблему можно решить следующим способом:
                    <br />
                    Функция setCount может принимать в себя колбэк-функцию, в которую мы можем передать параметр текущего состояния, следовательно при каждом вызове setCount, будет браться уже изменненое состояние.
                </p>
                <p>
                    В хук useState мы тоже можем передавать не только значение, но и колбэк функцию. В этом случае, при повторном рендеринге useState не будет вызываться, что может помочь производительности.
                </p>
            </div>
            <div>
                <p>Взаимодействие с объектами</p>
                <button type='button' className='btn btn-info' onClick={() => setData({...data, title: 'New title'})}>
                    Changed title
                </button>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </>
    )
}
