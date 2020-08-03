import React from 'react';

import './Switch.css';

const Switch = () => {
    return (
        <label className="switch">
            <input type="checkbox"></input>
            <span className="slider round"></span>
        </label>
    )
}

export default Switch;
