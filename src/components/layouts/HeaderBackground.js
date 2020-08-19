import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HeaderBackground.css';

export class HeaderBackground extends Component {
    constructor(props){
        super(props);
        this.state = {
            filename: "DEFAULT"
        }
    }

    render() {
        let backgroundImgPath = require(`../images/banner/${this.props.setForBannerBackground}.jpg`);
        return (
            // <div id="headerBackgroundImage" style={{ backgroundImage: `url(${backgroundImgPath})`, height: `400px` }}>
            <div id="headerBackgroundImage" style={{ backgroundImage: `url(${backgroundImgPath})`}}>
            </div>
        )
    }
}


//========================================================
                    //mapStateToProps
//========================================================
// 'state' below is the global state stored in Redux
const mapStateToProps = state => {
    // Here we are saying "Give me the value of 'cards' stored in our global state, and store it as a property called 'cardsFromAPI' that we can then use here in the Home component"
    return {
        setForBannerBackground: state.setForBackgrounds //the value after 'state.' must match the value in our reducer
    }

}

export default connect(mapStateToProps, null)(HeaderBackground);
