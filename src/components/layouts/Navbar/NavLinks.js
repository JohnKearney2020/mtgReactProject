import React from 'react';

import Switch from './Switch';
import './NavLinks.css';

const NavLinks = () => {
    return (
        <ul className="nav-links">
        <li>
            <div className="selectorText">White</div>
            <Switch />
        </li>
        <li>
            <div className="selectorText">Blue</div>
            <Switch />
        </li>
        <li>
            <div className="selectorText">Black</div>
            <Switch />
        </li>
        <li>
            <div className="selectorText">Red</div>
            <Switch />
        </li>
        <li>
            <div className="selectorText">Green</div>
            <Switch />
        </li>
        <li>
            <div className="selectorText">Colorless</div>
            <Switch />
        </li>
        <li>
            <div className="selectorText">Lands</div>
            <Switch />
        </li>
        <li>
            <button id="submitButton" type="submit" value="Find Cards" >Find Cards</button>
        </li>
    </ul>
    )
}

export default NavLinks;
