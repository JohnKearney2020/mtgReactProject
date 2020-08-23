import React, { useState } from 'react';

import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './Navbar.css';
import SetDropDown from './SetDropDown';

const Navbar = (props) => {

    const [navbarIsExpanded, setNavbarIsExpanded] = useState(false);

    const expandNavbarHandler = (event) => {
        if(navbarIsExpanded ? setNavbarIsExpanded(false) : setNavbarIsExpanded(true));
    }
    //Here, we want to call two functions with the onSubmit of the "Find Cards" button, but only on mobile
    //So, we wrap them both into a new function and pass it via the onMobileSubmit below in the <SideDrawer> component
    const mobileSubmit = (e) => {
        console.log(`mobile submit pressed.`);
        props.onSubmit(e); //first function call, expects 'e' as an argument b/c it's first line it e.preventDefault();
        expandNavbarHandler(); //second function call
    }

    return (
        <React.Fragment>
            <SideDrawer show={navbarIsExpanded}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks onSubmit={props.onSubmit} onMobileSubmit={mobileSubmit} onColorSelection={props.onColorSelection} show={navbarIsExpanded} {...props}/>
                </nav>
            </SideDrawer>
            <div id="semanticUIOverride">
                <nav>
                    {/* ...props passes down the props we sent to <Navbar /> from <Header /> */}
                    {/* <DropDown {...props} onSetSelection={props.onSetSelection}/> */}
                    <div id="dropDownContainer">
                        <SetDropDown onSetSelection={props.onSetSelection}/>
                    </div>
                    <div className="mainNavLinks">
                        <NavLinks onSubmit={props.onSubmit} onMobileSubmit={mobileSubmit} onColorSelection={props.onColorSelection} show={navbarIsExpanded} {...props}/>
                    </div>
                    <div onClick={expandNavbarHandler} className={navbarIsExpanded ? "burger toggle" : "burger"}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default Navbar;
