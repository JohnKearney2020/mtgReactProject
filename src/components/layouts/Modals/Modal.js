import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import BackDrop from './Backdrop';
import './Modal.css';

const ModalOverlay = (props) => {
    const content = (
        // we've set up this modal so we can pass down dynamic class names and in-line styles if need be
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={ props.onSubmit ? props.onSubmit : event => event.preventDefault() }>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
    // Animation Library - npm install --save react-transition-group
    const styleTop = {
        top: props.yOffSetValue
    }
    return (
        <React.Fragment>
            {/* {props.show && <Backdrop onClick={props.onCancel} />} */}
            {/* remember the CSSTransition component takes classNames, plural, instead of className */}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
                {/* the ...props forwards all props sent to our exported component, Modal, to the ModalOverlay */}
                {/* the spread operator takes all the key: value pairs on the props object and puts them as attributes on ModalOverlay */}
                <ModalOverlay {...props} style={styleTop}/>
            </CSSTransition>
        </React.Fragment>
    )
}

export default Modal;
