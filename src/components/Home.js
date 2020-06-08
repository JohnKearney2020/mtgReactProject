import React, { Component } from 'react';
import { connect } from 'react-redux';
import './cardLayout.css'

class Home extends Component {
    
    render() {

        //=======================================================================
        //                          Image Link Options
        //=======================================================================
        //eachCardObj.image_uris.art_crop
        //eachCardObj.image_uris.border_crop
        //eachCardObj.image_uris.large
        //eachCardObj.image_uris.normal
        //eachCardObj.image_uris.png
        //eachCardObj.image_uris.small
        // more info w/ examples at https://scryfall.com/docs/api/images
        // *** Make sure to update the no response object that gets sent here on no results ***

        let filteredCards = this.props.cardsFromAPI.map((eachCardObj,index) => {
            return <img className="card my-2 my-lg-3 mx-1 mx-lg-2 img-fluid" key={index} src={eachCardObj.image_uris.border_crop} title={eachCardObj.name} alt=""></img>

        })

        return (
            <>
            {/* API Call Test <br /> */}
            {/* <div class="landing">
			    <div class="home-wrap">
                    <div class="home-inner">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                {filteredCards}
                            </div>
                        </div>
                    </div>
			    </div>
		    </div> */}
            
            
            <div className="container-fluid m-0 p-0">
                <div className="row justify-content-center mx-2 mx-md-3 my-1 my-md-2 my-lg-4">
                    {filteredCards}
                </div>
            </div>
            </>
        )
    }
}

//========================================================
                    //mapStateToProps
//========================================================
// 'state' below is the state stored in Redux
const mapStateToProps = state => {
    // Here we are saying "Give me the value of 'cards' stored in our global state, and store it as a property called 'cardsFromAPI' that we can then use here in the Home component"
    return {
        cardsFromAPI: state.cards //the value after 'state.' must match the value in our reducer
    }

}

export default connect(mapStateToProps, null)(Home);