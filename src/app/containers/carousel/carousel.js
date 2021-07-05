import React from 'react';
import { Wheel } from './components/wheel/wheel';
import './carousel.css';

export const Carousel = (props) => {

    return (
        <div className='circle-carousel'>
            Carousel
            <Wheel />
        </div>
    );
}
