import React, { useState, useEffect } from 'react';

export const ItemsList = ({getItems}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const newItems = getItems();
        setItems(newItems);
        console.log('get items')
    }, [getItems])

    return (
        <>
            <ul>
                {items.map(item => <li key={item}>{item}</li>)}
            </ul>
        </>
    )
}
