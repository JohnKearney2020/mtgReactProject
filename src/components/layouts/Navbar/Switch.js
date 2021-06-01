// import React from 'react';
import React from 'react';

import './Switch.css';

const Switch = (props) => {
    return (
        <label className="switch">
            <input type="checkbox" value={props.color} onChange={props.onColorSelection} checked={props.checkedState} name={props.nameForName}></input>
            <span className="slider round" value={props.color}></span>
        </label>
    )
}

export default Switch;
