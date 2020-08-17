import React from 'react';

import './Cards.css';

// import Pic from '../../../public/images/background/indexBackground.png'

const Cards = (props) => {

    //==================================================
    //      For web hosted Image, below works
    //==================================================
    // let backgroundImg = "https://i.imgur.com/hIvW0Ns.jpg";
    // <div className="cards-flex-container" style={ {backgroundImage: `url(${backgroundImg})`} } ></div>

    //==================================================
    //      For a local image, below works
    //==================================================
    // let backgroundImgPath = require("../../components/images/background/indexBackground.png");
    // <div className="cards-flex-container" style={{ backgroundImage: `url(${backgroundImgPath})` }} ></div>

    
    // let filename = "indexBackground.png";
    let filename = "2XM.jpg";

    // let backgroundImgPath = require("../../components/images/background/indexBackground.png");
    let backgroundImgPath = require(`../../components/images/background/${filename}`);


    return (
        <div className="cards-flex-container" style={{ backgroundImage: `url(${backgroundImgPath})` }} >
            {props.cardsToRender}
        </div>
    )
}

export default Cards;
