import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = (props) => {
    // NOTE - see notes about portals in MainNavigation.js
    // show: prop will tell CSSTransition when to activate. It's the state of the drawer being open in MainNavigation.js
    // timeout: the duration of the animation
    // *classNames*: *NOTE* the s on classNames. 'slide-in-left' is defined in the 'index.css' file
    // the mount and unmount properties tell it to add or remove the <aside> element from the DOM when it should be
    // visible or not, otherwise it's only animated
    // console.log(`props.show is ${props.show}`);
    const content = (
        <CSSTransition in={props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit>
            {/* we pass the aside an onClick function from the MainNavigation.js file */}
            <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
            {/* <aside className="side-drawer" onClick={props.onClick}><h1>TEST</h1></aside> */}
        </CSSTransition>
    );
    
    
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}

export default SideDrawer;
