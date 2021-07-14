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
    
    componentDidUpdate(prevProps,prevState){

        // IMPORTANT - when users click the cards, a modal pops up. For some reason, that causes this component to update, causing all the cards to
        // animate fading in and out, both when the modal first appears and when it is closed. The logic below prevents that by looking at the previous
        // prop value for cardClicked and the current prop value for cardClicked. If those values don't match, it's because a modal either popped up or
        // was closed, so we should NOT animate on those updates. This boolean is used below in the else if() statement.
        let stopAnimationsForCardModal = false;
        if(prevProps.cardClicked !== this.props.cardClicked){
            stopAnimationsForCardModal = true;
        }
        // If the user changed sets, requiring us to change the backgrounds
        if(this.props.setForCardBackground !== prevProps.setForCardBackground) {
            // console.log(`in the component did update: 1st part`);
            this.setState({
                fadeOutClassToggle: "headerFadeOutCards",
                prevImgFileName: prevProps.setForCardBackground,
                oldCardsToRender: prevProps.cardsToRender,
                showOldCards: true,
                showNewCards: false
            }, () => {
                setTimeout(() => {
                    // console.log(`in the component did update: 2nd part`);
                    this.setState({
                        fadeOutClassToggle: "",
                        showOldCards: false,
                        showNewCards: true,
                        fadeInClassToggle: "headerFadeInCards",
                    })
                }, 1000);
            })
        // if the user did not change sets, but did choose new colored cards, causing the cards to rerender. stopAnimation boolean is described above where it's declared.
        } else if(this.props.cardsToRender !== prevProps.cardsToRender && stopAnimationsForCardModal === false) {
            this.setState({
                fadeOutClassToggle: "headerFadeOutCards",
                fadeInClassToggle: "",
                prevImgFileName: prevProps.setForCardBackground,
                oldCardsToRender: prevProps.cardsToRender,
                showOldCards: true,
                showNewCards: false
            }, () => {
                setTimeout(() => {
                    // console.log(`in the component did update: 2nd part`);
                    this.setState({
                        fadeOutClassToggle: "",
                        showOldCards: false,
                        showNewCards: true,
                        fadeInClassToggle: "headerFadeInCards"
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
        return (
            <>
              <div className="cardsOuterContainer">
                {this.state.showOldCards && 
                <>
                  {this.state.oldCardsToRender}
                </>
                }
                {this.state.showNewCards && 
                  <>
                  {this.props.cardsToRender}
                  </>
                }
              </div>
              <div className="cardsWrap">
                  <div className="cardsBackground" style={{ backgroundImage: `url(${prevBackgroundImgPath})` }}></div>
              </div>
            </>
        )
    }
}


// {this.state.showOldCards && 
//   <div className={`${this.state.fadeOutClassToggle} cards-flex-container`} style={{ backgroundImage: `url(${prevBackgroundImgPath})` }} >
//       {this.state.oldCardsToRender}
//   </div>
// }
// {this.state.showNewCards &&
//   <div className={`${this.state.fadeInClassToggle} cards-flex-container`} style={{ backgroundImage: `url(${backgroundImgPath})` }} >
//       {this.props.cardsToRender}
//   </div>
// }

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