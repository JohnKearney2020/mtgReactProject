import React from 'react';

import Switch from './Switch';
import './NavLinks.css';

const NavLinks = (props) => {
    return (
        <ul className="nav-links">
        <li>
            <div className="selectorText">White</div>
            <Switch onColorSelection={props.onColorSelection} color="W" checkedState={props.whiteSwitch.checked} nameForName="whiteSwitch"/>
        </li>
        <li>
            <div className="selectorText">Blue</div>
            <Switch onColorSelection={props.onColorSelection} color="U" checkedState={props.blueSwitch.checked} nameForName="blueSwitch"/>
        </li>
        <li>
            <div className="selectorText">Black</div>
            <Switch onColorSelection={props.onColorSelection} color="B" checkedState={props.blackSwitch.checked} nameForName="blackSwitch"/>
        </li>
        <li>
            <div className="selectorText">Red</div>
            <Switch onColorSelection={props.onColorSelection} color="R" checkedState={props.redSwitch.checked} nameForName="redSwitch"/>
        </li>
        <li>
            <div className="selectorText">Green</div>
            <Switch onColorSelection={props.onColorSelection} color="G" checkedState={props.greenSwitch.checked} nameForName="greenSwitch"/>
        </li>
        <li>
            <div className="selectorText">Colorless</div>
            <Switch onColorSelection={props.onColorSelection} color="C" checkedState={props.colorlessSwitch.checked} nameForName="colorlessSwitch"/>
        </li>
        <li>
            <div className="selectorText">Lands</div>
            <Switch onColorSelection={props.onColorSelection} color="L" checkedState={props.landsSwitch.checked} nameForName="landsSwitch"/>
        </li>
        <li>
            <button id="submitButton" type="submit" value="Find Cards" onClick={props.onSubmit} >Find Cards</button>
        </li>
    </ul>
    )
}

export default NavLinks;
