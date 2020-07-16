import React from 'react';
// import { Jumbotron } from 'react-bootstrap';
import ReactDOM from 'react-dom';


import './HeaderBackground.css';

const HeaderBackground = () => {

    // const headerBackground = <Jumbotron fluid id="jumbotron" className="position-relative overflow-hidden d-none d-sm-block"></Jumbotron>;
    const headerBackground = <div id="headerBackgroundImage"></div>
    
    return ReactDOM.createPortal(headerBackground, document.getElementById('headerBackground-hook'));
}

export default HeaderBackground;
