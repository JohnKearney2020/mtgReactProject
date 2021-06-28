import React, { useState } from 'react';

import './FlipCard.css';

const FlipCard = (props) => {
    const[flipToggleClass, setFlipToggleClass] = useState("");
    const[hideFrontFlipIconToggle, setHideFrontFlipIconToggle] = useState("");
    // let imgUrlFront = props.cardObject.card_faces[0].image_uris.normal || "https://i.imgur.com/Qx6AMQQ.jpg";
    let imgUrlFront = props.cardObject.card_faces[0].hasOwnProperty('image_uris') ? props.cardObject.card_faces[0].image_uris.normal : "https://i.imgur.com/Qx6AMQQ.jpg";
    
    // let imgUrlFront = props.cardObject.card_faces[0].image_uris.normal ? props.cardObject.card_faces[0].image_uris.normal : "https://i.imgur.com/Qx6AMQQ.jpg";
    // let imgUrlBack = props.cardObject.card_faces[1].image_uris.normal || "https://i.imgur.com/Qx6AMQQ.jpg";
    let imgUrlBack = props.cardObject.card_faces[1].hasOwnProperty('image_uris') ? props.cardObject.card_faces[1].image_uris.normal : "https://i.imgur.com/Qx6AMQQ.jpg";
    
    const toggleFlipAnimation = () => {
        (flipToggleClass === "flip-toggle") ? setFlipToggleClass("") : setFlipToggleClass("flip-toggle");
        (hideFrontFlipIconToggle === "hideFlipIcon") ? setHideFrontFlipIconToggle("") : setHideFrontFlipIconToggle("hideFlipIcon");
    }

    return (
        <>
            <div className="flip-card">
                <div className={`flip-card-inner ${flipToggleClass}`}>
                    <div className="flip-card-front">
                        <img className="flipCardImg" src={imgUrlFront}
                            title={props.cardObject.name} 
                            alt=""
                            data-card_type="flip"
                            data-artist={props.cardObject.artist}
                            data-card_name={props.cardObject.name}
                            data-cmc={props.cardObject.cmc}
                            data-front_flavor_text={props.cardObject.card_faces[0].flavor_text}
                            data-back_flavor_text={props.cardObject.card_faces[1].flavor_text}
                            // data-front_image_url={props.cardObject.card_faces[0].image_uris.border_crop}
                            data-front_image_url={imgUrlFront}
                            // data-back_image_url={props.cardObject.card_faces[1].image_uris.border_crop}
                            data-back_image_url={imgUrlBack}
                            data-mana_cost={props.cardObject.card_faces[0].mana_cost}
                            data-front_oracle_text={props.cardObject.card_faces[0].oracle_text}
                            data-back_oracle_text={props.cardObject.card_faces[1].oracle_text}
                            data-rarity={props.cardObject.rarity}
                            data-set_name={props.cardObject.set_name}
                            data-front_power={props.cardObject.card_faces[0].power}
                            data-front_toughness={props.cardObject.card_faces[0].toughness}
                            data-back_power={props.cardObject.card_faces[1].power}
                            data-back_toughness={props.cardObject.card_faces[1].toughness}
                            data-price={props.cardObject.prices.usd}
                            data-price_foil={props.cardObject.prices.usd_foil}
                            data-edh_rec_link={props.cardObject.related_uris.edhrec}
                            data-gatherer_link={props.cardObject.related_uris.gatherer}
                            data-tcg_player_link={props.cardObject.purchase_uris.tcgplayer}
                            data-card_type_line={props.cardObject.type_line}
                            onClick={props.onCardClick}
                        >
                        </img>
                        <div onClick={toggleFlipAnimation}>
                            <span className={`fa-stack fa-2x frontFlipIcon ${hideFrontFlipIconToggle}`}>
                                <i className="fas fa-circle fa-stack-1x"></i>
                                <i className="fab fa-creative-commons-share fa-stack-1x"></i>
                            </span>
                        </div>
                    </div>
                    <div className="flip-card-back">
                        <img className="flipCardImg" src={imgUrlBack}
                            title={props.cardObject.name} 
                            alt=""
                            data-card_type="flip"
                            data-artist={props.cardObject.artist}
                            data-card_name={props.cardObject.name}
                            data-cmc={props.cardObject.cmc}
                            data-front_flavor_text={props.cardObject.card_faces[0].flavor_text}
                            data-back_flavor_text={props.cardObject.card_faces[1].flavor_text}
                            // data-front_image_url={props.cardObject.card_faces[0].image_uris.border_crop}
                            data-front_image_url={imgUrlFront}
                            // data-back_image_url={props.cardObject.card_faces[1].image_uris.border_crop}
                            data-back_image_url={imgUrlBack}
                            data-mana_cost={props.cardObject.card_faces[0].mana_cost}
                            data-front_oracle_text={props.cardObject.card_faces[0].oracle_text}
                            data-back_oracle_text={props.cardObject.card_faces[1].oracle_text}
                            data-rarity={props.cardObject.rarity}
                            data-set_name={props.cardObject.set_name}
                            data-front_power={props.cardObject.card_faces[0].power}
                            data-front_toughness={props.cardObject.card_faces[0].toughness}
                            data-back_power={props.cardObject.card_faces[1].power}
                            data-back_toughness={props.cardObject.card_faces[1].toughness}
                            data-price={props.cardObject.prices.usd}
                            data-price_foil={props.cardObject.prices.usd_foil}
                            data-edh_rec_link={props.cardObject.related_uris.edhrec}
                            data-gatherer_link={props.cardObject.related_uris.gatherer}
                            data-tcg_player_link={props.cardObject.purchase_uris.tcgplayer}
                            data-card_type_line={props.cardObject.type_line}
                            onClick={props.onCardClick}
                        ></img>
                        <div onClick={toggleFlipAnimation}>
                                <span className="fa-stack fa-2x backFlipIcon">
                                    <i className="fas fa-circle fa-stack-1x"></i>
                                    <i className="fab fa-creative-commons-share fa-stack-1x"></i>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlipCard;

// className="card" 
// key={index} 
// src={props.cardObject.image_uris.border_crop} 
// src={props.cardObject.image_uris.normal} 
// title={props.cardObject.name} 
// alt=""
// data-artist={props.cardObject.artist}
// data-card_name={props.cardObject.name}
// data-cmc={props.cardObject.cmc}
// data-flavor_text={props.cardObject.flavor_text}
// data-image_url={props.cardObject.image_uris.border_crop}
// data-mana_cost={props.cardObject.mana_cost}
// data-oracle_text={props.cardObject.oracle_text}
// data-rarity={props.cardObject.rarity}
// data-set_name={props.cardObject.set_name}
// data-power={props.cardObject.power}
// data-toughness={props.cardObject.toughness}
// data-price={props.cardObject.prices.usd}
// data-price_foil={props.cardObject.prices.usd_foil}
// data-edh_rec_link={props.cardObject.related_uris.edhrec}
// data-gatherer_link={props.cardObject.related_uris.gatherer}
// data-tcg_player_link={props.cardObject.purchase_uris.tcgplayer}
// data-card_type_line={props.cardObject.type_line}
// onClick={this.onCardClick}
