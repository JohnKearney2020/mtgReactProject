import React from 'react';
import ReactDom from 'react-dom';

import './Backdrop.css'


// The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.
const Backdrop = (props) => {
    console.log(`Y offset Value as a prop in Backdrop.js: ${props.yOffSetValue}`);
    console.log(typeof props.yOffSetValue);
    // let styleYOffsetValue = `--yOffset-val: ${props.yOffSetValue}`;
    // let styleYOffsetValue = {--yOffset-val: ${props.yOffSetValue}};
    // const stylered = {backgroundColor: 'red'}
    const styleTop = {top: props.yOffSetValue}
    console.log(`Object being sent with the "style" attribute:`);
    console.log(styleTop);

    // console.log(`string for styles: ${styleYOffsetValue}`);
    return ReactDom.createPortal(
        // <div className="backdrop" style={"--yOffset-val: " + props.yOffSetValue}></div>,
        // <div className="backdrop" style={`--yOffset-val: ${props.yOffSetValue}`}></div>,
        <div className="backdrop" style={styleTop}></div>,
        document.getElementById('backdrop-hook')
    )
}

export default Backdrop;
