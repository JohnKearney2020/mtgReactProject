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

    changeScroll = () => { 
        const style = document.body.style.overflow; 
        document.body.style.overflow = (style === 'hidden') ? 'auto':'hidden';
    }

    closeCardInfo = (event) => {
        event.preventDefault();
        // this.setState({
        //     type_of_card: ""
        // })
        // setTimeout(() => {
            this.setState({
                cardClicked: false,
                type_of_card: "",
                // renderAllCards: true,
                // yOffset: 0,
                // artist: "",
                // card_name: "",
                // cmc: "",
                // flavor_text: "",
                // front_flavor_text: "",
                // back_flavor_text: "",
                // image_url: "",
                // front_image_url: "",
                // back_image_url: "",
                // mana_cost: "",
                // oracle_text: "",
                // front_oracle_text: "",
                // back_oracle_text: "",
                // price: "",
                // price_foil: "",
                // card_rarity: "",
                // set_name: "",
                // power: "",
                // toughness: "",
                // front_power: "",
                // front_toughness: "",
                // back_power: "",
                // back_toughness: "",
                // edh_rec_link: "",
                // gatherer_link: "",
                // tcg_player_link: "",
                // card_type_line: ""
            })
        // }, 400);
        
        this.changeScroll(); // re-enable mouse scrolling
    }

    onCardClick = (event) => {
        console.log('card is clicked!');
        // find out how far the user has scrolled down in the Y direction
        const yAmountScrolled = window.scrollY;
        let cardType = event.target.dataset.card_type;
        // console.log(`test for Bruna:`);
        // console.log(`card type: ${cardType}`);
        // console.log(`oracle text: ${event.target.dataset.oracle_text}`);
        if(cardType === "normal") {
            this.setState({ 
                cardClicked: true,
                type_of_card: event.target.dataset.card_type,
                // renderAllCards: true,
                yOffset: yAmountScrolled,
                artist: event.target.dataset.artist,
                card_name: event.target.dataset.card_name,
                cmc: event.target.dataset.cmc,
                flavor_text: event.target.dataset.flavor_text,
                front_flavor_text: "",
                back_flavor_text: "",
                image_url: event.target.src,
                front_image_url: "",
                back_image_url: "",
                mana_cost: event.target.dataset.mana_cost,
                oracle_text: event.target.dataset.oracle_text,
                front_oracle_text: "",
                back_oracle_text: "",
                price: event.target.dataset.price,
                price_foil: event.target.dataset.price_foil,
                card_rarity: event.target.dataset.rarity,
                set_name: event.target.dataset.set_name,
                power: event.target.dataset.power,
                toughness: event.target.dataset.toughness,
                front_power: "",
                front_toughness: "",
                back_power: "",
                back_toughness: "",
                edh_rec_link: event.target.dataset.edh_rec_link,
                gatherer_link: event.target.dataset.gatherer_link,
                tcg_player_link: event.target.dataset.tcg_player_link,
                card_type_line: event.target.dataset.card_type_line          
                
                // cardClicked: true,
                // type_of_card: event.target.dataset.card_type,
                // renderAllCards: false,
                // yOffset: yAmountScrolled, 
                // artist: event.target.dataset.artist,
                // card_name: event.target.dataset.card_name,
                // cmc: event.target.dataset.cmc,
                // flavor_text: event.target.dataset.flavor_text,
                // image_url: event.target.src,
                // mana_cost: event.target.dataset.mana_cost,
                // oracle_text: event.target.dataset.oracle_text,
                // price: event.target.dataset.price,
                // price_foil: event.target.dataset.price_foil,
                // card_rarity: event.target.dataset.rarity,
                // set_name: event.target.dataset.set_name,
                // power: event.target.dataset.power,
                // toughness: event.target.dataset.toughness,
                // edh_rec_link: event.target.dataset.edh_rec_link,
                // gatherer_link: event.target.dataset.gatherer_link,
                // tcg_player_link: event.target.dataset.tcg_player_link,
                // card_type_line: event.target.dataset.card_type_line,
            }, () => {
                // console.log(`Type of card for Modal: ${this.state.type_of_card}`);
                console.log(`normal card setState called`);
            });
            this.changeScroll(); //stop mouse scrolling
        } else {
            // console.log(`in the card clicked function for flip cards:`);
            // console.log(`front flavor text: ${event.target.dataset.front_flavor_text}`);
            // console.log(`back flavor text: ${event.target.dataset.back_flavor_text}`);
            // console.log(`front oracle text: ${event.target.dataset.front_oracle_text}`);
            // console.log(`back oracle text: ${event.target.dataset.back_oracle_text}`);
            this.setState({ 
                cardClicked: true,
                type_of_card: event.target.dataset.card_type,
                yOffset: yAmountScrolled,
                artist: event.target.dataset.artist,
                card_name: event.target.dataset.card_name,
                cmc: event.target.dataset.cmc,
                flavor_text: "",
                front_flavor_text: event.target.dataset.front_flavor_text,
                back_flavor_text: event.target.dataset.back_flavor_text,
                image_url: "",
                front_image_url: event.target.dataset.front_image_url,
                back_image_url: event.target.dataset.back_image_url,
                mana_cost: event.target.dataset.mana_cost,
                oracle_text: "",
                front_oracle_text: event.target.dataset.front_oracle_text,
                back_oracle_text: event.target.dataset.back_oracle_text,
                price: event.target.dataset.price,
                price_foil: event.target.dataset.price_foil,
                card_rarity: event.target.dataset.rarity,
                set_name: event.target.dataset.set_name,
                power: "",
                toughness: "",
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
                console.log(`flip card setState called`);
            });
            this.changeScroll(); //stop mouse scrolling
        }

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
                            
                            // src={eachCardObj.image_uris.border_crop} 
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
                        <Backdrop yOffSetValue={this.state.yOffset} onClick={this.closeCardInfo}/>    
                    </React.Fragment>
                }
                {/* <Modal 
                    show={this.state.cardClicked}
                    typeOfCard={this.state.type_of_card}
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
                    {...this.state}
                > */}
                <Modal 
                    show={this.state.cardClicked}
                    typeOfCard={this.state.type_of_card}
                    onCloseModal={this.closeCardInfo}
                    {...this.state}
                >
                </Modal>
                {/* <Modal 
                    show={this.state.cardClicked}
                    typeOfCard={this.state.type_of_card}
                    onCloseModal={this.closeCardInfo}
                    card_rarity={this.state.card_rarity}
                    oracle_text={this.state.oracle_text}
                    front_oracle_text={this.state.front_oracle_text}
                    back_oracle_text={this.state.back_oracle_text}
                    flavor_text={this.state.flavor_text}
                    front_flavor_text={this.state.front_flavor_text}
                    back_flavor_text={this.state.back_flavor_text}
                    power={this.state.power}
                    toughness={this.state.toughness}
                    front_power={this.state.front_power}
                    front_toughness={this.state.front_toughness}
                    back_power={this.state.back_power}
                    back_toughness={this.state.back_toughness}
                    price={this.state.price}
                    price_foil={this.state.price_foil}
                    card_name={this.state.card_name}
                    image_url={this.state.image_url}
                    front_image_url={this.state.front_image_url}
                    edh_rec_link={this.state.edh_rec_link}
                    gatherer_link={this.state.gatherer_link}
                    tcg_player_link={this.state.tcg_player_link}
                >
                </Modal> */}
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