import React from 'react';
import { Card } from '../card/card'
import './wheel.css'
export const Wheel = (props) => {

    const [radius, setRadius] = React.useState(250);
    // const [cards, setCards] = React.useState([]);
    const [angle, setAngle] = React.useState(0.0);
    const [center, setCenter] = React.useState(0.0);

    const wheelEl = React.useRef(null);
    const arr = [0, 1, 2, 3];
    const arr1 = [0, 1, 2, 3, 4, 5, 6]
    const arr2 = [0, 1, 2];
    const arr3 = [0]
    const savedData = arr1.slice();
    const [data, setData] = React.useState(arr1);

    React.useEffect(() => {
        if (wheelEl) {
            let center = {
                x: parseFloat(wheelEl.current.style.width) / 2.0,
                y: parseFloat(wheelEl.current.style.height) / 2.0
            };
            setCenter(center)
        }
    }, []);

    React.useEffect(() => {
        wheelEl.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        arrSlice();

    }, [angle]);

    const arrSlice = () => {
        let newDta = data;
        if (newDta.length === 4) return
        if (newDta.length < 4){
            while (newDta.length < 4){
                newDta = newDta.concat(newDta.slice(0, 4 - newDta.length))
            }
            setData(newDta);
        } else {
            if (!angle) return data.slice(0, 4);
            else {
                // return data.slice(0, 4);
                const newDta = data;
                console.log(newDta);
                const koef = (Math.abs(angle)/90);
                const i = ((koef-1)%4);
                console.log(koef, i, (savedData.length-(4 - koef))%savedData.length)
                const val = arr1[(savedData.length-(4 - koef))%savedData.length];
                // console.log(val)
                newDta[i] = val;
                console.log(newDta);
                setData(newDta);
            }
        }
    };

    const getCoords = (axis, index) => {
        const nAngle = (Math.PI / 2.0) * index;
        const coords = {
            x: Math.cos(nAngle) * radius,
            y: Math.sin(nAngle) * radius
        }
        return axis === 'x' ? center[axis] + coords[axis] : center[axis] - coords[axis]
    };

    const getActive = (index) => {
        return index === Math.abs((((angle) / 90)%4 + ((angle < 0 && ((angle / 90)%2) === 0) ? -1 : 1))%4)
    }

    console.log(angle)
    console.log('active >> ', Math.abs((((angle) / 90)%4 + ((angle < 0 && ((angle / 90)%2) === 0) ? -1 : 1))%4) )
    console.log(data)

    // console.log(arrSlice(data, (angle/90)%data.length))
    return (
        <>
            <button onClick={() => setAngle(angle - 90)}>-</button>
            <div
                className='carousel-wheel'
                ref={wheelEl}
                style={{width: 300, height: 300, visibility: true}}
            >
                {data.slice(0, 4).map((item, index) => (
                    <Card
                        key={(Math.PI / 2.0) * item + '_' + index}
                        text={item + ' ' + index}
                        style={{
                            transform: `translate(-50%, -50%) rotate(${angle * -1}deg)`,
                            opacity: index === ((angle/90)%4 + 3)%4  ? 0 : 1,
                            background: getActive(index) ? 'orange' : 'blue',
                            left: `${getCoords('x', index)}px`,
                            top: `${getCoords('y', index)}px`
                        }}
                    />
                ))}
            </div>
            {data.slice(0, 4).map((item, index) => (
                <div className='carousel-item-content' key={(Math.PI / 2.0) * item + '_' + index}>
                    {getActive(index) && (
                        <p className='item-cooment'>
                            {item}, {index}
                            `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint .`
                        </p>
                    )}
                </div>

            ))}
            <button onClick={() => setAngle(angle + 90)}>+</button>
        </>
    );
}
