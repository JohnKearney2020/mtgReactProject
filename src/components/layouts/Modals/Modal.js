import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Row, Col, Container } from 'react-bootstrap';

// import BackDrop from './Backdrop';
import './Modal.css';

const ModalOverlay = (props) => {
    const content = (
        // we've set up this modal so we can pass down dynamic class names and in-line styles if need be
        // <div className={`modal ${props.className}`} style={props.style}>
        //     <header className={`modal__header ${props.headerClass}`}>
        //         <h2>{props.header}</h2>
        //     </header>
        //     <img className="modal-image" src={props.image_url__for_card_modal} alt=""/>
        //     <form onSubmit={ props.onSubmit ? props.onSubmit : event => event.preventDefault() }>
        //         <div className={`modal__content ${props.contentClass}`}>
        //             {props.children}
        //         </div>
        //         <footer className={`modal__footer ${props.footerClass}`}>
        //             {props.footer}
        //         </footer>
        //     </form>
        // </div>
        // <div className="container-fluid" style={props.style}>
        //     <div className="row">
        //         <h3>{props.header}</h3>
        //     </div>
        //     <div className="row">
        //         <div className="col-6">
        //             <img src={props.image_url__for_card_modal} alt=""/>
        //         </div>
        //         <div className="col-6">
        //             <p className="lead">
        //                 {props.cardFlavorText}
        //             </p>
        //         </div>
        //     </div>
        // </div>

        // <Container style={props.style} id="modal-container">
        //     <Row>
        //         <h3>{props.header}</h3>
        //     </Row>
        //     <Row>
        //         <Col>
        //             <img src={props.image_url__for_card_modal} alt=""/>
        //         </Col>
        //         <Col>
        //             <h5>{props.cardFlavorText}</h5>
        //         </Col>
        //     </Row>
        // </Container>
        <div id="modal-container2" style={props.style}>
            <div id="heading-container">
                <h3>{props.header}</h3>
                <div id="content-container">
                    <div>
                        <img src={props.image_url__for_card_modal} alt="" id="modal-image"/>
                    </div>
                    <div id="text-container">
                        <h5>{props.cardFlavorText}</h5>
                        <hr />
                        <h5>{props.cardFlavorText}</h5>
                        <hr />
                        <h5>{props.cardFlavorText}</h5>
                    </div>
                </div>
            </div> {/* end of heading-container */}
            
        </div>

    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
    // Animation Library - npm install --save react-transition-group
    // we want to offset the top of our modal by whatever the current y-offset is from scrolling + X% of the window height so it is
    // roughly centered in the screen
    console.log(`Height of the window is ${window.innerHeight}`);
    const yOffsetForModal = props.yOffSetValue + 0.18*window.innerHeight;
    console.log(`Y offset for Modal is: ${yOffsetForModal}`);
    const styleTop = {
        top: yOffsetForModal
    }
    return (
        <React.Fragment>
            {/* {props.show && <Backdrop onClick={props.onCancel} />} */}
            {/* remember the CSSTransition component takes classNames, plural, instead of className */}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={5000} classNames="modal-test">
                {/* the ...props forwards all props sent to our exported component, Modal, to the ModalOverlay */}
                {/* the spread operator takes all the key: value pairs on the props object and puts them as attributes on ModalOverlay */}
                <ModalOverlay {...props} style={styleTop}/>
            </CSSTransition>
            
        </React.Fragment>
    )
}

export default Modal;
