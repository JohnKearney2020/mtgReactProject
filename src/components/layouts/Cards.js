import React from 'react';
import { connect } from 'react-redux';

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
    // let filename = "2XM.jpg";
    let filename = `${props.setForBackground}.jpg`;
    // console.log(`Set name for background from props: ${props.setForBackground}.jpg`);

    // let backgroundImgPath = require("../../components/images/background/indexBackground.png");
    let backgroundImgPath = require(`../../components/images/background/${filename}`);


    return (
        <div className="cards-flex-container" style={{ backgroundImage: `url(${backgroundImgPath})` }} >
            {props.cardsToRender}
        </div>
    )
}

// export default Cards;


//========================================================
                    //mapStateToProps
//========================================================
// 'state' below is the state stored in Redux
const mapStateToProps = state => {
    // Here we are saying "Give me the value of 'cards' stored in our global state, and store it as a property called 'cardsFromAPI' that we can then use here in the Home component"
    return {
        setForBackground: state.setForBackgrounds //the value after 'state.' must match the value in our reducer
    }

}

export default connect(mapStateToProps, null)(Cards);