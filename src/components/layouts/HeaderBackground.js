import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HeaderBackground.css';

export class HeaderBackground extends Component {
    constructor(props){
        super(props);
        this.state = {
            filename: "DEFAULT",
            showOldHeader: false,
            showNewHeader: true,
            fadeInClassToggle: "",
            fadeOutClassToggle: "",
            prevImgFilePath: "DEFAULT"
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.setForBannerBackground !== prevProps.setForBannerBackground) {
            // console.log(`in the component did update`);
            this.setState({
                fadeOutClassToggle: "headerFadeOut",
                prevImgFilePath: prevProps.setForBannerBackground,
                showOldHeader: true,
                showNewHeader: false
            }, () => {
                setTimeout(() => {
                    this.setState({
                        fadeOutClassToggle: "",
                        showOldHeader: false,
                        showNewHeader: true,
                        fadeInClassToggle: "headerFadeIn",
                    })
                }, 1000);
            })
        }
    }

    render() {
        let backgroundImgPath = require(`../images/banner/${this.props.setForBannerBackground}.jpg`);
        let prevBackgroundImgPath = require(`../images/banner/${this.state.prevImgFilePath}.jpg`);
        return (
            <>
                {this.state.showOldHeader && 
                    <div className={`${this.state.fadeOutClassToggle} headerBackgroundImage`} style={{ backgroundImage: `url(${prevBackgroundImgPath})`}}>
                    </div>
                }
                {this.state.showNewHeader &&
                    <div className={`${this.state.fadeInClassToggle} headerBackgroundImage`} style={{ backgroundImage: `url(${backgroundImgPath})`}}>
                    </div>
                }
            </>
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
