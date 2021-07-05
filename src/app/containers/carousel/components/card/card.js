import React from 'react';
import './card.css';

const CardComponent = (props) => {
    // console.log(props)
    const getCoords = (axis, angle, radius) => {
        const coords = {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        }
        return axis === 'x' ? props.center[axis] + coords[axis] : props.center[axis] - coords[axis]
    };



    return (
        <div
            className='carousel-card'
            style={{ ...props.style}}
        >
            {props.text}
        </div>
    );
}

export const Card =  React.memo(CardComponent);
