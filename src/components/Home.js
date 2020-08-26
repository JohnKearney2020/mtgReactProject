import React, { Component } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';

import Backdrop from './layouts/Modals/Backdrop';
import Modal from './layouts/Modals/Modal';
import Cards from './layouts/Cards';
import './cardLayout.css'
import FlipCard from './layouts/FlipCard';

class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            cardClicked: false,
            renderAllCards: true,
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
            tcgplayer_link: "",
            card_type_line: ""
        };
    }

    changeScroll = () => { 
        const style = document.body.style.overflow; 
        document.body.style.overflow = (style === 'hidden') ? 'auto':'hidden';
    }

    closeCardInfo = (event) => {
        event.preventDefault();
        // console.log('close overlay clicked!');
        this.setState({
            cardClicked: false,
            renderAllCards: true
        })
        this.changeScroll(); // re-enable mouse scrollinh
    }

    onCardClick = (event) => {
        // console.log('card is clicked!');
        // find out how far the user has scrolled down in the Y direction
        const yAmountScrolled = window.scrollY;
        // console.log(`Amount scrolled in Y direction: ${yAmountScrolled}`);
        // console.log(`Card name pulled from the card image element is ${event.target.dataset.card_name}`);
        this.setState({  
            cardClicked: true,
            // renderAllCards: false,
            yOffset: yAmountScrolled, 
            artist: event.target.dataset.artist,
            card_name: event.target.dataset.card_name,
            cmc: event.target.dataset.cmc,
            flavor_text: event.target.dataset.flavor_text,
            image_url: event.target.src,
            mana_cost: event.target.dataset.mana_cost,
            oracle_text: event.target.dataset.oracle_text,
            price: event.target.dataset.price,
            price_foil: event.target.dataset.price_foil,
            rarity: event.target.dataset.rarity,
            set_name: event.target.dataset.set_name,
            power: event.target.dataset.power,
            toughness: event.target.dataset.toughness,
            edh_rec_link: event.target.dataset.edh_rec_link,
            gatherer_link: event.target.dataset.gatherer_link,
            tcg_player_link: event.target.dataset.tcg_player_link,
            card_type_line: event.target.dataset.card_type_line,
        });
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
        console.log(this.props.cardsFromAPI);
        let filteredCards = this.props.cardsFromAPI.map((eachCardObj,index) => {
            // console.log(`cardsFromApi Object is: ${this.props.cardsFromAPI}`);
            // console.log(`cardsFromApi Object is: ${eachCardObj}`);
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
                            // src={eachCardObj.image_uris.border_crop} 
                            src={eachCardObj.image_uris.normal} 
                            title={eachCardObj.name} 
                            alt=""
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
            } else if(eachCardObj.name === "No Cards Found") {
                return (
                    <LazyLoad
                        offsetVertical={200}
                        debounce={false}
                        height={452}
                        width={616}
                        key={index}
                        >
                        <img id="noCardFound" src={eachCardObj.image_uris.border_crop} alt="" key={index}></img>
                    </LazyLoad>
                )
                // }
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
                        <Backdrop yOffSetValue={this.state.yOffset} onClick={this.closeCardInfo}/>    
                    </React.Fragment>
                }
                <Modal 
                    show={this.state.cardClicked}
                    onCloseModal={this.closeCardInfo}
                    header={this.state.card_name}
                    contentClass="card-item__modal-content"
                    footerClass="card-item__modal-actions"
                    // footer={<button onClick={this.closeCardInfo}>CLOSE</button>}
                    yOffSetValue={this.state.yOffset}
                    image_url__for_card_modal={this.state.image_url}
                    cardOracleText={this.state.oracle_text}
                    cardFlavorText={this.state.flavor_text}
                    cardPower={this.state.power}
                    cardToughness={this.state.toughness}
                    cardPriceNormal={this.state.price}
                    cardPriceFoil={this.state.price_foil}
                    edhRecLink={this.state.edh_rec_link}
                    gathererLink={this.state.gatherer_link}
                    tcgPlayerLink={this.state.tcg_player_link}
                    card_rarity={this.state.rarity}
                >
                </Modal>
                {/* End of Modal */}
                <Cards cardsToRender={filteredCards} cardClicked={this.state.cardClicked} />
                {/* <div className="cards-flex-container">
                    {filteredCards}
                </div> */}
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