import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Cards.css';

export class Cards extends Component {
    constructor(props){
        super(props);
        this.state = {
            filename: "DEFAULT",
            showOldCards: false,
            showNewCards: true,
            oldCardsToRender: "",
            fadeInClassToggle: "",
            fadeOutClassToggle: "",
            prevImgFileName: "DEFAULT"
        }
    }
    
    componentDidUpdate(prevProps){
        // if the user has selected a new set
        if(this.props.setForCardBackground !== prevProps.setForCardBackground) {
            console.log(`in the component did update: 1st part`);
            this.setState({
                fadeOutClassToggle: "headerFadeOutCards",
                prevImgFileName: prevProps.setForCardBackground,
                oldCardsToRender: prevProps.cardsToRender,
                showOldCards: true,
                showNewCards: false
            }, () => {
                setTimeout(() => {
                    console.log(`in the component did update: 2nd part`);
                    this.setState({
                        fadeOutClassToggle: "",
                        showOldCards: false,
                        showNewCards: true,
                        fadeInClassToggle: "headerFadeInCards",
                    })
                }, 1000);
            })
        } else if(this.props.cardsToRender !== prevProps.cardsToRender) { //if they didn't change sets, but did request new cards
            console.log(`in the component did update: 1st part`);
            this.setState({
                fadeOutClassToggle: "headerFadeOutCards",
                prevImgFileName: prevProps.setForCardBackground,
                oldCardsToRender: prevProps.cardsToRender,
                showOldCards: true,
                showNewCards: false
            }, () => {
                setTimeout(() => {
                    console.log(`in the component did update: 2nd part`);
                    this.setState({
                        fadeOutClassToggle: "",
                        showOldCards: false,
                        showNewCards: true,
                        fadeInClassToggle: "headerFadeInCards",
                    })
                }, 1000);
            })
        }
    }
    
    
    render() {
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

        // let filename = ``;
        let backgroundImgPath = require(`../../components/images/background/${this.props.setForCardBackground}.jpg`);
        let prevBackgroundImgPath = require(`../../components/images/background/${this.state.prevImgFileName}.jpg`);
        // let prevBackgroundImgPath = require(`../images/banner/${this.state.prevImgFileName}.jpg`);
        return (
            <>
                {this.state.showOldCards && 
                    <div className={`${this.state.fadeOutClassToggle} cards-flex-container`} style={{ backgroundImage: `url(${prevBackgroundImgPath})` }} >
                        {this.state.oldCardsToRender}
                    </div>
                }
                {this.state.showNewCards &&
                    <div className={`${this.state.fadeInClassToggle} cards-flex-container`} style={{ backgroundImage: `url(${backgroundImgPath})` }} >
                        {this.props.cardsToRender}
                    </div>
                }
            </>
        )
    }
}

// export default Cards;









// import React from 'react';
// import { connect } from 'react-redux';

// import './Cards.css';

// import Pic from '../../../public/images/background/indexBackground.png'

// const Cards = (props) => {

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

//     let filename = `${props.setForBackground}.jpg`;

//     let backgroundImgPath = require(`../../components/images/background/${filename}`);


//     return (
//         <div className="cards-flex-container" style={{ backgroundImage: `url(${backgroundImgPath})` }} >
//             {props.cardsToRender}
//         </div>
//     )
// }

// export default Cards;










//========================================================
                    //mapStateToProps
//========================================================
// 'state' below is the state stored in Redux
const mapStateToProps = state => {
    // Here we are saying "Give me the value of 'cards' stored in our global state, and store it as a property called 'cardsFromAPI' that we can then use here in the Home component"
    return {
        setForCardBackground: state.setForBackgrounds //the value after 'state.' must match the value in our reducer
    }

}

export default connect(mapStateToProps, null)(Cards);