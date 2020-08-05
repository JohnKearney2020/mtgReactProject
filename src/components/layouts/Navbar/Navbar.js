import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';

// import Switch from './Switch';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './Navbar.css';

const Navbar = (props) => {

    const [navbarIsExpanded, setNavbarIsExpanded] = useState(false);

    const expandNavbarHandler = (event) => {
        if(navbarIsExpanded ? setNavbarIsExpanded(false) : setNavbarIsExpanded(true));
    }
    //Here, we want to call two functions with the onSubmit of the "Find Cards" button, but only on mobile
    //So, we wrap them both into a new function and pass it via the onSubmit below
    const mobileSubmit = (e) => {
        props.onSubmit(e); //first function call, expects 'e' as an argument b/c it's first line it e.preventDefault();
        expandNavbarHandler(); //second function call
    }

    return (
        <React.Fragment>
            {/* <SideDrawer show={navbarIsExpanded} onClick={expandNavbarHandler}> */}
            <SideDrawer show={navbarIsExpanded}>
                <nav className="main-navigation__drawer-nav">
                    {/* <NavLinks onSubmit={props.onSubmit} onColorSelection={props.onColorSelection} {...props}/> */}
                    <NavLinks onSubmit={props.onSubmit} onMobileSubmit={mobileSubmit} onColorSelection={props.onColorSelection} show={navbarIsExpanded} {...props}/>
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
                    <NavLinks onSubmit={props.onSubmit} onMobileSubmit={mobileSubmit} onColorSelection={props.onColorSelection} show={navbarIsExpanded} {...props}/>
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
