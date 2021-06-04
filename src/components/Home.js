import React, { Component } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';

import Backdrop from './layouts/Modals/Backdrop';
import Modal from './layouts/Modals/Modal';
import Cards from './layouts/Cards';
import FlipCard from './layouts/FlipCard';

class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            cardClicked: false,
            type_of_card: "",
            // renderAllCards: true,
            yOffset: 0,
            artist: "",
            card_name: "",
            cmc: "",
            flavor_text: "",
            front_flavor_text: "",
            back_flavor_text: "",
            image_url: "",
            front_image_url: "",
            back_image_url: "",
            mana_cost: "",
            oracle_text: "",
            front_oracle_text: "",
            back_oracle_text: "",
            price: "",
            price_foil: "",
            card_rarity: "",
            set_name: "",
            power: "",
            toughness: "",
            front_power: "",
            front_toughness: "",
            back_power: "",
            back_toughness: "",
            edh_rec_link: "",
            gatherer_link: "",
            tcg_player_link: "",
            card_type_line: ""
        };
    }

    closeCardModal = (event) => {
        event.preventDefault();
        this.setState({
            cardClicked: false,
            type_of_card: "",
        })
    }

    onCardClick = (event) => {
        // find out how far the user has scrolled down in the Y direction
        const yAmountScrolled = window.scrollY;
        this.setState({ 
            cardClicked: true,
            type_of_card: event.target.dataset.card_type,
            // renderAllCards: true,
            yOffset: yAmountScrolled,
            artist: event.target.dataset.artist,
            card_name: event.target.dataset.card_name,
            cmc: event.target.dataset.cmc,
            flavor_text: event.target.dataset.flavor_text,
            front_flavor_text: event.target.dataset.front_flavor_text,
            back_flavor_text: event.target.dataset.back_flavor_text,
            image_url: event.target.src,
            front_image_url: event.target.dataset.front_image_url,
            back_image_url: event.target.dataset.back_image_url,
            mana_cost: event.target.dataset.mana_cost,
            oracle_text: event.target.dataset.oracle_text,
            front_oracle_text: event.target.dataset.front_oracle_text,
            back_oracle_text: event.target.dataset.back_oracle_text,
            price: event.target.dataset.price,
            price_foil: event.target.dataset.price_foil,
            card_rarity: event.target.dataset.rarity,
            set_name: event.target.dataset.set_name,
            power: event.target.dataset.power,
            toughness: event.target.dataset.toughness,
            front_power: event.target.dataset.front_power,
            front_toughness: event.target.dataset.front_toughness,
            back_power: event.target.dataset.back_power,
            back_toughness: event.target.dataset.back_toughness,
            edh_rec_link: event.target.dataset.edh_rec_link,
            gatherer_link: event.target.dataset.gatherer_link,
            tcg_player_link: event.target.dataset.tcg_player_link,
            card_type_line: event.target.dataset.card_type_line          
        }, () => {
            // console.log(`Type of card for Modal: ${this.state.type_of_card}`);
            // console.log(`normal card setState called`);
        });
        // this.changeScroll(); //stop mouse scrolling
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
        // console.log(this.props.cardsFromAPI);
        let filteredCards = this.props.cardsFromAPI.map((eachCardObj,index) => {
            // console.log(`cardsFromApi Object is: ${this.props.cardsFromAPI}`);
            // console.log(`cardsFromApi Object is: ${eachCardObj}`);
            //=========================================================================
            //                             Normal Cards
            //=========================================================================
            if(eachCardObj.name !== "No Cards Found" && eachCardObj.image_uris){
                return (
                    <LazyLoad
                        offsetVertical={200}
                        debounce={false}
                        height={480}
                        width={345}
                        key={index}
                        >
                        <img 
                            className="card" 
                            key={index}  
                            src={eachCardObj.image_uris.normal} 
                            title={eachCardObj.name} 
                            alt=""
                            data-card_type="normal"
                            data-artist={eachCardObj.artist}
                            data-card_name={eachCardObj.name}
                            data-cmc={eachCardObj.cmc}
                            data-flavor_text={eachCardObj.flavor_text}
                            data-image_url={eachCardObj.image_uris.border_crop}
                            data-mana_cost={eachCardObj.mana_cost}
                            data-oracle_text={eachCardObj.oracle_text}
                            data-rarity={eachCardObj.rarity}
                            data-set_name={eachCardObj.set_name}
                            data-power={eachCardObj.power}
                            data-toughness={eachCardObj.toughness}
                            data-price={eachCardObj.prices.usd}
                            data-price_foil={eachCardObj.prices.usd_foil}
                            data-edh_rec_link={eachCardObj.related_uris.edhrec}
                            data-gatherer_link={eachCardObj.related_uris.gatherer}
                            data-tcg_player_link={eachCardObj.purchase_uris.tcgplayer}
                            data-card_type_line={eachCardObj.type_line}
                            onClick={this.onCardClick}
                            >
                        </img>
                    </LazyLoad>
                )
            //=========================================================================
            //                          If no cards are found
            //=========================================================================
            } else if(eachCardObj.name === "No Cards Found") {
                return (
                    <img id="noCardFound" src={eachCardObj.image_uris.border_crop} alt="" key={index}></img>
                )
            //=========================================================================
            //                             Flip Cards
            //=========================================================================
            } else if (eachCardObj.card_faces){
                return (
                    <LazyLoad
                    offsetVertical={200}
                    debounce={false}
                    height={480}
                    width={345}
                    key={index}
                    >
                        <FlipCard cardObject={eachCardObj} onCardClick={this.onCardClick}/>
                    </LazyLoad>
                )
            } else {
                return (
                    <div>failed</div>
                )
            }
        });

        return (
            <>  
                {/* // Modal - Appears when users click on a card */}
                {this.state.cardClicked && 
                    <React.Fragment>
                        <Backdrop yOffSetValue={this.state.yOffset} onClick={this.closeCardModal} style={{zIndex:1000}}/>    
                    </React.Fragment>
                }
                <Modal 
                    typeOfCard={this.state.type_of_card}
                    onCloseModal={this.closeCardModal}
                    {...this.state}
                >
                </Modal>
                <Cards cardsToRender={filteredCards} cardClicked={this.state.cardClicked} />
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