import React from 'react';
import ReactDom from 'react-dom';

import './Backdrop.css'

// The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.
const Backdrop = (props) => {
    return ReactDom.createPortal(
        <div className="backdrop" onClick={props.onClick} style={props.style}></div>,
        document.getElementById('backdrop-hook')
    )
}

export default Backdrop;
