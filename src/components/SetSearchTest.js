import React, { Component } from 'react';
import { connect } from 'react-redux';


class SetSearchTest extends Component {
    //we don't need to set up a state here because we are using the global state set up in Redux by our reducer
    render() {
        let filteredCards = this.props.cards.map((eachCardObj,index) => {
                return <div key={index}>
                    <h5>{eachCardObj.name}</h5> <br />
                    <img src={eachCardObj.image_uris.small} alt=""></img>
                    </div>;
        })
        return (
            <div>
                API Call Test
                {filteredCards}
            </div>
        )
    }
}

//========================================================
                    //mapStateToProps
//========================================================
// Here we are saying "Give me the value of 'cards' stored in our global state, and store it as a property called 'cards' that we can then use
// here in the Counter component"
const mapStateToProps = state => {
    return {
        colorsSelectedByUser: state.colorsSelected,
        cards: state.cards
    }
}

export default connect(mapStateToProps, null)(SetSearchTest);
