import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';

// import Switch from './Switch';
import NavLinks from './NavLinks';
import './Navbar.css';

const Navbar = () => {

    const [navbarIsExpanded, setNavbarIsExpanded] = useState(false);

    const expandNavbarHandler = (event) => {
        if(navbarIsExpanded ? setNavbarIsExpanded(false) : setNavbarIsExpanded(true));
    }

    return (
        <nav className={navbarIsExpanded ? "nav-active" : ""}>
            <div className="logo">
                <img src="/images/setSymbol/THB.png" alt="" height="42" width="42"></img>
                <h4 id="setName">Theros - Beyond Death</h4>
            </div>
            <div className="mainNavLinks">
                <NavLinks />
            </div>
            <div onClick={expandNavbarHandler} className={navbarIsExpanded ? "burger toggle" : "burger"}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    )
}

export default Navbar;
