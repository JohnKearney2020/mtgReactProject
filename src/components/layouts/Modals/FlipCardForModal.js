import React, { useState } from 'react';

const FlipCardForModal = (props) => {
    const[flipToggleClass, setFlipToggleClass] = useState("");
    const[hideFrontFlipIconToggle, setHideFrontFlipIconToggle] = useState("");

    const toggleFlipAnimation = () => {
        (flipToggleClass === "flip-toggle") ? setFlipToggleClass("") : setFlipToggleClass("flip-toggle");
        (hideFrontFlipIconToggle === "hideFlipIcon") ? setHideFrontFlipIconToggle("") : setHideFrontFlipIconToggle("hideFlipIcon");
    }

    return (
        <>
            <div className="flip-card-modal">
                <div className={`flip-card-inner ${flipToggleClass}`}>
                    <div className="flip-card-front">
                        <img className="flipCardImg" src={props.front_image_url}
                            alt=""
                            data-card_type="flip"
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
                        <img className="flipCardImg" src={props.back_image_url}
                            alt=""
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

export default FlipCardForModal;

// incoming props:

// cardClicked: false,
// type_of_card: "",
// // renderAllCards: true,
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