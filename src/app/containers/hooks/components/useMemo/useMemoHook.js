import React, { useState, useMemo, useEffect } from 'react';

// let renderCount = 1;

export const useMemoHook = (props) => {
    const [num, setNum] = useState(1);
    const [colored, setColored] = useState(false)

    const complexCompute = (num) => {
        let i = 0;
        while(i !== 1000000000){
            i++;
        }
        return num*2
    };

    // const styles = {
    //     color: colored ? 'red' : 'black'
    // }

    const styles = useMemo(() => ({
        color: colored ? 'red' : 'black'
    }), [colored])

    // const computed = complexCompute(num);
    const computed = useMemo(() => {
        return complexCompute(num)
    }, [num]);

    useEffect(() => {
        console.log('changed styles');
    }, [styles])

    return (
        <>
            <div className='section header'>
                <h3>useMemo hook</h3>
            </div>
            <div>
                <p>
                    Позволяет оптимизировать компонент!
                    <br />
                    Вслучае, если рендеринг компонента занимает много времени из-за каких-либо вычислений, связанных с "созданием" переменных, то при изменении состояния любой переменной и следовательно вызова ререндеринга это может вызывать проблемы
                </p>
                <p style={styles}>Number: {computed}</p>
                <button type='button' className='btn btn-success' onClick={() => setNum(num+1)}>
                    Increas
                </button>
                <button type='button' className='btn btn-danger' onClick={() => setNum(num-1)}>
                    Decrease
                </button>
                <button type='button' className='btn btn-warning' onClick={() => setColored(!colored)}>
                    Warning
                </button>
            </div>

        </>
    )
}
