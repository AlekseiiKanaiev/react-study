import React, { useState } from 'react';

export const Time = () => {
    const [time, setTime] = useState(new Date());

    setInterval(() => setTime(new Date()), 1000);

    return <h3 className='centred'><strong>{time.toLocaleString()}</strong></h3>
}
