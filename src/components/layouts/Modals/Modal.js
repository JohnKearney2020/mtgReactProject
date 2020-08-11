import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import '../../../index.css';
import './Modal.css';

const ModalOverlay = (props) => {

    const rarityCapitalized = props.card_rarity.charAt(0).toUpperCase() + props.card_rarity.slice(1);
    // console.log(`modal overlay clg`);
    // console.log(props.cardOracleText);

    let oracleText = (<>
        <h5>
            <span className="modal-span">Oracle Text: </span>
            <br/>
            {props.cardOracleText}
        </h5>
        <hr /></>
    );
    //if the card has Flavor Text
    let flavorText = "";
    if(props.cardFlavorText){
        flavorText = (
            <>
            <h5><span className="modal-span">Flavor Text: </span><em>{props.cardFlavorText}</em></h5>
            <hr />
            </>
        )
    };
    //if the card is a creature with power and toughness
    let powerAndToughness = "";
    if(props.cardPower){
        powerAndToughness = (
            <>
            <h5><span className="modal-span">Power/Toughness:</span> {props.cardPower}/{props.cardToughness}</h5>
            <hr />
            </>
        )
    };
    // Card Price
    let price = (<>
        <div id="price-container">
            <h5>
                <span className="modal-span">Price (USD): </span> 
                {/* <br/>
                <em>Normal</em> - ${props.cardPriceNormal}
                <br/>
                <em>Foil</em> - ${props.cardPriceFoil} */}
                <div id="priceListContainer">
                    <div>
                        <em>Normal</em> - ${props.cardPriceNormal}
                    </div>
                    <div>
                        <em>Foil</em> - ${props.cardPriceFoil}
                    </div>
                </div>
            </h5>

        </div>
        <hr />
    </>
    )

    // All the html content we created above goes here:
    const content = (
        <div id="modal-container" style={props.style}>
            <div id="heading-container">
                <h3>{props.header} - <em>{rarityCapitalized}</em></h3>
                {/* Modal Close Button */}
                <div onClick={props.onCloseModal}>
                    <i className="fas fa-times" id="modalCloseButton"></i>
                </div>
            </div> {/* end of heading-container */}
            <hr id="topHR"/>
            <div id="content-container">
                <div id="modal-image-container">
                    <img src={props.image_url__for_card_modal} alt="" id="modal-image"/>
                </div>
                <div id="text-container">
                    {oracleText}
                    {flavorText}
                    {powerAndToughness}
                    {price}
                    <div id="linkContainer">
                        {/* <button className="modalButton dark"><a href={props.edhRecLink} target="_blank" rel="noopener noreferrer"><i className="fab fa-searchengin"></i>View on EDHREC</a></button> */}
                        <a href={props.edhRecLink} target="_blank" rel="noopener noreferrer" className="modalButton dark"><i className="fab fa-searchengin"></i>View on EDHREC</a>
                        {/* <button className="modalButton dark"><a href={props.gathererLink} target="_blank" rel="noopener noreferrer"><i className="fab fa-wizards-of-the-coast"></i>View on Gatherer</a></button> */}
                        <a href={props.gathererLink} target="_blank" rel="noopener noreferrer" className="modalButton dark"><i className="fab fa-wizards-of-the-coast"></i>View on Gatherer</a>
                        {/* <button className="modalButton dark"><a href={props.gathererLink} target="_blank" rel="noopener noreferrer"><i className="fab fa-wizards-of-the-coast"></i>View on Gatherer</a></button> */}
                        {/* <i class="far fa-money-bill-alt"></i> */}
                        {/* <button className="modalButton light"><a href={props.tcgPlayerLink} target="_blank" rel="noopener noreferrer"><i className="fas fa-dollar-sign"></i>Buy on TCGPlayer</a></button> */}
                        <a href={props.tcgPlayerLink} target="_blank" rel="noopener noreferrer" className="modalButton light"><i className="fas fa-dollar-sign"></i>Buy on TCGPlayer</a>
                    </div>
                </div>
            </div> {/* end of content-container */}
        </div> // end of modal-container
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
    // Animation Library - npm install --save react-transition-group
    // we want to offset the top of our modal by whatever the current y-offset is from scrolling + X% of the window height so it is
    // roughly centered in the screen
    // console.log(`Height of the window is ${window.innerHeight}`);
    let yOffsetForModal  = "";
    let currentWindowWidth = window.innerWidth;
    let pixelsFromTopOnMobile = 0;
    console.log(`Scrolled Value from mouse click ${props.yOffSetValue}`);
    if(currentWindowWidth > 576) {
        // yOffsetForModal = props.yOffSetValue + 0.10*window.innerHeight;
        yOffsetForModal = 0.10*window.innerHeight;
        console.log(`Modified Y offset for modal: ${yOffsetForModal}`);
    } else if(currentWindowWidth > 360) {
        pixelsFromTopOnMobile = 25;
        // yOffsetForModal = props.yOffSetValue + pixelsFromTopOnMobile;
        yOffsetForModal = pixelsFromTopOnMobile;
        console.log(`Modified Y offset for modal: ${yOffsetForModal}`);
    } else {
        pixelsFromTopOnMobile = 8;
        // yOffsetForModal = props.yOffSetValue + pixelsFromTopOnMobile;
        yOffsetForModal = pixelsFromTopOnMobile;
        console.log(`Modified Y offset for modal: ${yOffsetForModal}`);
    }
    // console.log(`Y offset for Modal is: ${yOffsetForModal}`);
    const styleTop = {
        top: yOffsetForModal
    }
    // console.log(`props.show for Modal: ${props.show}`);
    return (
        <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="card-modal-animate">
        {/* the ...props forwards all props sent to our exported component, Modal, to the ModalOverlay */}
        {/* the spread operator takes all the key: value pairs on the props object and puts them as attributes on ModalOverlay */} 
            {/* <ModalOverlay {...props} style={styleTop} /> */}
            <ModalOverlay {...props} style={styleTop}/>
        </CSSTransition>
    )
}

export default Modal;
