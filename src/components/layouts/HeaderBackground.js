import React from 'react';
import ReactDOM from 'react-dom';

import './HeaderBackground.css';

const HeaderBackground = () => {

    const headerBackground = <div id="headerBackgroundImage"></div>
    
    return ReactDOM.createPortal(headerBackground, document.getElementById('headerBackground-hook'));
}

export default HeaderBackground;
