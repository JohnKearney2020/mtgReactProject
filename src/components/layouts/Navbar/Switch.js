// import React from 'react';
import React from 'react';

import './switch.css';

const Switch = (props) => {
    // console.log(`state passed down through props:`);
    // console.log(`${props.checkedState}`);


    return (
        <label className="switch">
            {/* <input type="checkbox" value={props.color} onClick={props.onColorSelection} checked={switchIsChecked} onChange={() => setWitchIsChecked(!switchIsChecked)}></input> */}
            {/* <input type="checkbox" value={props.color} onClick={props.onColorSelection} checked={switchIsChecked} onChange={checkedHandler}></input> */}
            {/* <input type="checkbox" value={props.color} onClick={props.onColorSelection} checked={props.checkedState}></input> */}
            <input type="checkbox" value={props.color} onChange={props.onColorSelection} checked={props.checkedState} name={props.nameForName}></input>
            <span className="slider round" value={props.color}></span>
        </label>
    )
}

export default Switch;
