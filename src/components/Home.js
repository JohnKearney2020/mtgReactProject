import React, { Component } from 'react';
import { connect } from 'react-redux';

import Backdrop from './layouts/Modals/Backdrop';
import Modal from './layouts/Modals/Modal';
import './cardLayout.css'

class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            cardClicked: false,
            yOffset: 0,
            artist: "",
            card_name: "",
            cmc: "",
            flavor_text: "",
            image_url: "",
            mana_cost: "",
            oracle_text: "",
            rarity: "",
            set_name: "",
            power: "",
            toughness: "",
            edh_rec_link: "",
            gatherer_link: "",
            card_type_line: ""
        };
    }

    changeScroll = () => { 
        const style = document.body.style.overflow; 
        document.body.style.overflow = (style === 'hidden') ? 'auto':'hidden';
    }

    closeCardInfo = (event) => {
        event.preventDefault();
        console.log('close overlay clicked!');
        this.setState({ 
            cardClicked: false,
            card_name: "",
            artist: "",
            cmc: "",
            flavor_text: "",
            image_url: "",
            mana_cost: "",
            oracle_text: "",
            rarity: "",
            set_name: "",
            power: "",
            toughness: "",
            edh_rec_link: "",
            gatherer_link: "",
            card_type_line: ""
        });
        this.changeScroll(); // re-enable mouse scrollinh
    }

    onCardClick = (event) => {
        console.log('card is clicked!');
        // find out how far the user has scrolled down in the Y direction
        const yAmountScrolled = window.scrollY;
        // const card_name = event.target.title;
        console.log(`Amount scrolled in Y direction: ${yAmountScrolled}`);
        console.log(`Card name pulled from the card image element is ${event.target.dataset.card_name}`);
        this.setState({  
            cardClicked: true,
            yOffset: yAmountScrolled, 
            artist: event.target.dataset.artist,
            card_name: event.target.dataset.card_name,
            cmc: event.target.dataset.cmc,
            flavor_text: event.target.dataset.flavor_text,
            // image_url: event.target.image_url,
            image_url: event.target.src,
            mana_cost: event.target.dataset.mana_cost,
            oracle_text: event.target.dataset.oracle_text,
            rarity: event.target.dataset.rarity,
            set_name: event.target.dataset.set_name,
            power: event.target.dataset.power,
            toughness: event.target.dataset.toughness,
            edh_rec_link: event.target.dataset.edh_rec_link,
            gatherer_link: event.target.dataset.gatherer_link,
            card_type_line: event.target.dataset.card_type_line,

        });
        console.log(`Card Name is: ${this.state.card_name}`)
        this.changeScroll(); //stop mouse scrolling
    }

    

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

        // const [cardIsClicked, setCardIsClicked] = useState(false);

        // const openCardInfo = () => {
        //     setCardIsClicked(true);
        //     console.log('card clicked!');
        // } 

        // const closeCardInfo = () => {
        //     setCardIsClicked(false);
        // } 

        let noCards = false;
        let filteredCards = this.props.cardsFromAPI.map((eachCardObj,index) => {
            // console.log(`cardsFromApi Object is: ${this.props.cardsFromAPI}`);
            // console.log(`cardsFromApi Object is: ${eachCardObj}`);
            // if(noCards === true) break;
            // if(eachCardObj.name === "No Cards Found"){
            //     noCards = true;
            //     return <img src={eachCardObj.image_uris.border_crop} alt=""></img>;
            // }
            if(eachCardObj.name != "No Cards Found"){
                return <img 
                    className="card" 
                    key={index} 
                    src={eachCardObj.image_uris.border_crop} 
                    title={eachCardObj.name} 
                    alt=""
                    data-artist={eachCardObj.artist}
                    data-card_name={eachCardObj.name}
                    data-cmc={eachCardObj.cmc}
                    data-flavor_text={eachCardObj.flavor_text}
                    data-image_url={eachCardObj.image_uris.border_crop}
                    data-mana_cost={eachCardObj.mana_cost}
                    data-data-card_name={eachCardObj.name}
                    data-oracle_text={eachCardObj.oracle_text}
                    data-rarity={eachCardObj.rarity}
                    data-set_name={eachCardObj.set_name}
                    data-power={eachCardObj.power}
                    data-toughness={eachCardObj.toughness}
                    data-edh_rec_link={eachCardObj.related_uris.edhrec}
                    data-gatherer_link={eachCardObj.related_uris.gatherer}
                    data-card_type_line={eachCardObj.type_line}
                    
                    onClick={this.onCardClick}
                    loading="lazy">
                </img>
            } else {
                return <img className="card" src={eachCardObj.image_uris.border_crop} alt=""></img>;
            }

            
        });

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
            
            
            {/* <div className="container-fluid m-0 p-0"> */}
                {/* <div className="row justify-content-center mx-2 mx-md-3 my-1 my-md-2 my-lg-4"> */}
                    {this.state.cardClicked && 
                        <React.Fragment>
                            <Backdrop yOffSetValue={this.state.yOffset} onClick={this.closeCardInfo}/>
                            <Modal 
                                show={this.state.cardClicked}
                                onCancel={this.closeCardInfo}
                                header={this.state.card_name}
                                contentClass="card-item__modal-content"
                                footerClass="card-item__modal-actions"
                                footer={<button onClick={this.closeCardInfo}>CLOSE</button>}
                                yOffSetValue={this.state.yOffset}
                                image_url__for_card_modal={this.state.image_url}
                                cardFlavorText={this.state.oracle_text}
                                card_rarity={this.state.rarity}
                            >
                                {/* <div className="card-container">
                                    <h2>THE CARD AND INFO</h2>
                                    <img src={this.state.image_url} alt=""></img>
                                </div> */}
                            </Modal>
                        </React.Fragment>
                    }
                    <div className="flex-container">
                        {filteredCards}
                    </div>
                {/* </div> */}
            {/* </div> */}
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