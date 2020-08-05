import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';

// import Switch from './Switch';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './navbar.css';

const Navbar = (props) => {

    const [navbarIsExpanded, setNavbarIsExpanded] = useState(false);

    const expandNavbarHandler = (event) => {
        if(navbarIsExpanded ? setNavbarIsExpanded(false) : setNavbarIsExpanded(true));
    }

    return (
        <React.Fragment>
            <SideDrawer show={navbarIsExpanded} onClick={expandNavbarHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks onSubmit={props.onSubmit} onColorSelection={props.onColorSelection} {...props}/>
                    {/* <h1>Test</h1> */}
                </nav>
            </SideDrawer>
            {/* <nav className={navbarIsExpanded ? "nav-active" : ""}> */}
            <nav>
                <div className="logo">
                    <img src="/images/setSymbol/THB.png" alt="" height="42" width="42"></img>
                    <h4 id="setName">Theros - Beyond Death</h4>
                </div>

                <div className="mainNavLinks">
                    <NavLinks onSubmit={props.onSubmit} onColorSelection={props.onColorSelection} {...props}/>
                </div>
                    {/* <NavLinks /> */}

                <div onClick={expandNavbarHandler} className={navbarIsExpanded ? "burger toggle" : "burger"}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar;
