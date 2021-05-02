import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import '../../../index.css';
import './Modal.css';
import FlipCardForModal from './FlipCardForModal';
import parse from 'html-react-parser';

//============================================================================================================================
//                                          Modal for Normal Cards
//============================================================================================================================
let oracleText;
let rarityCapitalized;
let flavorText;
let powerAndToughness;
let price;
let normalPrice;
let foilPrice;
let content;

const ModalOverlayNormalCards = (props) => {

    oracleText="";
    rarityCapitalized="";
    flavorText="";
    powerAndToughness="";
    price="";
    normalPrice="";
    foilPrice="";
    content="";

    rarityCapitalized = props.card_rarity.charAt(0).toUpperCase() + props.card_rarity.slice(1);
    // console.log(`props sent to modal:`);
    // console.log(props);

    // oracleText = (<>
    //     <h5>
    //         <span className="modal-heading">Oracle Text: </span>
    //         <br/>
    //         {props.oracle_text}
    //     </h5>
    //     <hr /></>
    // );

    oracleText = (<>
      <h5 >
          <span className="modal-heading">Oracle Text: </span>
          <br/>
          {/* {props.oracle_text} */}
          {/* {curatedOracleText} */}
          {/* <div id="testString"></div> */}
          <span className='oracleTextContainer'>{parse(props.oracle_text)}</span>
      </h5>
      <hr /></>
    );
    //if the card has Flavor Text
    if(props.flavor_text){
        flavorText = (
            <>
            <h5><span className="modal-heading">Flavor Text: </span><em>{props.flavor_text}</em></h5>
            <hr />
            </>
        )
    };
    //if the card is a creature with power and toughness
    powerAndToughness = "";
    if(props.power){
        powerAndToughness = (
            <>
            <h5><span className="modal-heading">Power/Toughness:</span> {props.power}/{props.toughness}</h5>
            <hr />
            </>
        )
    };
    // Card Price
    normalPrice = props.price ? `$${props.price}` : " N/A";
    foilPrice = props.price_foil ?  `$${props.price_foil}` : " N/A";
    price = (<>
        <div id="price-container">
            <h5>
                <span className="modal-heading">Price (USD): </span><span id="normalPrice"><em>Normal</em> - {normalPrice},</span><span><em>Foil</em> - {foilPrice}</span>
            </h5>
        </div>
        <hr />
    </>
    )
    // All the html content we created above goes here:
    content = (
        <div id="modal-container" style={props.style}>
            <div id="heading-container">
                <h3>{props.card_name} - <em>{rarityCapitalized}</em></h3>
                <a href="/#" onClick={props.onCloseModal} id="modalCloseButton"><i className="fas fa-times" ></i></a>
            </div> {/* end of heading-container */}
            <hr id="topHR"/>
            <div id="content-container">
                <div id="modal-image-container">
                    <img src={props.image_url} alt="" id="modal-image"/>
                </div>
                <div id="text-container">
                    {oracleText}
                    {flavorText}
                    {powerAndToughness}
                    {price}
                    <div id="linkContainer">
                        <a href={props.edh_rec_link} target="_blank" rel="noopener noreferrer" className="modalButton dark"><i className="fab fa-searchengin"></i>View on EDHREC</a>
                        <a href={props.gatherer_link} target="_blank" rel="noopener noreferrer" className="modalButton dark"><i className="fab fa-wizards-of-the-coast"></i>View on Gatherer</a>
                        <a href={props.tcg_player_link} target="_blank" rel="noopener noreferrer" className="modalButton light"><i className="fas fa-dollar-sign"></i>Buy on TCGPlayer</a>
                    </div>
                </div>
            </div> {/* end of content-container */}
        </div> // end of modal-container
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};


//============================================================================================================================
//                                          Modal for Flip Cards
//============================================================================================================================
const ModalOverlayFlipCards = (props) => {

    oracleText="";
    rarityCapitalized="";
    flavorText="";
    powerAndToughness="";
    price="";
    normalPrice="";
    foilPrice="";
    content="";
    rarityCapitalized = props.card_rarity.charAt(0).toUpperCase() + props.card_rarity.slice(1);

    oracleText = (
        <>
            <h5>
                <div className="modal-heading">Oracle Text: </div>
                <div className="top-modal-text">
                    {props.front_oracle_text}
                </div>
                <div className="modal-heading">Oracle Text: </div>
                <div>
                    {props.back_oracle_text}
                </div>
            </h5>
            <hr />
        </>
    );

    // if the card has Flavor Text
    if(props.front_flavor_text !== undefined && props.back_flavor_text !== undefined ){
        flavorText = (
            <>
            <h5>
                {/* <span className="modal-heading">Flavor Text: </span><em>{props.front_flavor_text}</em> */}
                <div className="modal-heading">Flavor Text: </div>
                <div className="top-modal-text">
                    <em>{props.front_flavor_text}</em>
                </div>
                <div className="modal-heading">Flavor Text: </div>
                <div>
                    <em>{props.back_flavor_text}</em>
                </div>
            </h5>
            <hr />
            </>
        )
    // if the front card has flavor text but the back card does not
    } else if(props.front_flavor_text !== undefined && props.back_flavor_text === undefined){
        flavorText = (
            <>
            <h5>
                <div className="modal-heading">Flavor Text: </div>
                <div>
                    <em>{props.front_flavor_text}</em>
                </div>
            </h5>
            <hr />
            </>
        )
    // if the front card does not have flavor text, but the back card does
    } else if(props.front_flavor_text === undefined && props.back_flavor_text !== undefined){
        flavorText = (
            <>
            <h5>
                <div className="modal-heading">Flavor Text: </div>
                <div>
                    <em>{props.back_flavor_text}</em>
                </div>
            </h5>
            <hr />
            </>
        )
    // they are === undefined b/c there is no front or back flavor text
    };

    //if the card is a creature with power and toughness
    let frontPowerToughness;
    let backPowerToughness;
    let pTDivider;
    //if either the front or back card is a creature 
    if(props.front_power !== undefined || props.back_power !== undefined ){
        if(props.front_power !== undefined){
            frontPowerToughness = (
                <>
                    [{props.front_power}<strong>/</strong>{props.front_toughness}]
                </>
            )
        }
        if(props.back_power !== undefined){
            console.log(`back power toughness here: ${props.back_power} ${props.back_toughness}`);
            backPowerToughness = (
                <>
                    [{props.back_power}<strong>/</strong>{props.back_toughness}]
                </>
            )
        }
        // if both the front and back have power and toughness, we want a divider
        if(props.front_power !== undefined && props.back_power !== undefined ){
            pTDivider = `  /  `;
        } else {
            pTDivider = "";
        }
        powerAndToughness = (
            <>
                <h5>
                    <span><span className="modal-heading">Power/Toughness: </span>{frontPowerToughness}{pTDivider}{backPowerToughness}</span>
                </h5>
                <hr />
            </>
        )
    };
    // Card Price
    normalPrice = props.price ? `$${props.price}` : " N/A";
    foilPrice = props.price_foil ?  `$${props.price_foil}` : " N/A";
    price = (<>
        <div id="price-container">
            <h5>
                <span className="modal-heading">Price (USD): </span><span id="normalPrice"><em>Normal</em> - {normalPrice},</span><span><em>Foil</em> - {foilPrice}</span>
            </h5>
        </div>
        <hr />
    </>
    )
    
    // All the html content we created above goes here:
    content = (
        <div id="modal-container" style={props.style}>
            <div id="heading-container">
                <h3>{props.card_name} - <em>{rarityCapitalized}</em></h3>
                {/* Modal Close Button */}
                {/* <div onClick={props.onCloseModal}>
                    <i className="fas fa-times" id="modalCloseButton"></i>
                </div> */}
                <a href="/#" onClick={props.onCloseModal} id="modalCloseButton"><i className="fas fa-times" ></i></a>
            </div> {/* end of heading-container */}
            <hr id="topHR"/>
            <div id="content-container">
                <div id="modal-image-container">
                    {/* <img src={props.front_image_url} alt="" id="modal-image"/> */}
                    <FlipCardForModal {...props}/>
                </div>
                <div id="text-container">
                    {oracleText}
                    {flavorText}
                    {powerAndToughness}
                    {price}
                    <div id="linkContainer">
                        <a href={props.edh_rec_link} target="_blank" rel="noopener noreferrer" className="modalButton dark"><i className="fab fa-searchengin"></i>View on EDHREC</a>
                        <a href={props.gatherer_link} target="_blank" rel="noopener noreferrer" className="modalButton dark"><i className="fab fa-wizards-of-the-coast"></i>View on Gatherer</a>
                        <a href={props.tcg_player_link} target="_blank" rel="noopener noreferrer" className="modalButton light"><i className="fas fa-dollar-sign"></i>Buy on TCGPlayer</a>
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
    let yOffsetForModal  = "";
    let currentWindowWidth = window.innerWidth;
    let pixelsFromTopOnMobile = 0;
    if(currentWindowWidth > 576) {
        yOffsetForModal = 0.10*window.innerHeight;
    } else if(currentWindowWidth > 360) {
        pixelsFromTopOnMobile = 10;
        yOffsetForModal = pixelsFromTopOnMobile;
    } else {
        pixelsFromTopOnMobile = 0;
        yOffsetForModal = pixelsFromTopOnMobile;
    }
    const styleTop = {
        top: yOffsetForModal
    }

    return (
        <>
            <CSSTransition in={props.typeOfCard === "normal"} mountOnEnter unmountOnExit timeout={400} classNames="card-modal-animate">
            {/* the ...props forwards all props sent to our exported component, Modal, to the ModalOverlay */}
            {/* the spread operator takes all the key: value pairs on the props object and puts them as attributes on ModalOverlay  */}
                <ModalOverlayNormalCards {...props} style={styleTop}/>
            </CSSTransition>
            <CSSTransition in={props.typeOfCard === "flip"} mountOnEnter unmountOnExit timeout={400} classNames="card-modal-animate">
            {/* the ...props forwards all props sent to our exported component, Modal, to the ModalOverlay */}
            {/* the spread operator takes all the key: value pairs on the props object and puts them as attributes on ModalOverlay */} 
                <ModalOverlayFlipCards {...props} style={styleTop}/>
            </CSSTransition>
        </>
    )
}

// export default React.memo(Modal);
export default Modal;