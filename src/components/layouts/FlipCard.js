import React, { useState } from 'react';

import './FlipCard.css';

const FlipCard = (props) => {
    const[flipToggleClass, setFlipToggleClass] = useState("");
    const[hideFrontFlipIconToggle, setHideFrontFlipIconToggle] = useState("");
    // const[hideBackFlipIconToggle, setHideBackFlipIconToggle] = useState("");

    let imgUrlFront = props.cardObject.card_faces[0].image_uris.normal;
    let imgUrlBack = props.cardObject.card_faces[1].image_uris.normal;
    
    // let flipToggleClass = "";
    const toggleFlipAnimation = () => {
        console.log(`toggleFlipAnimation function called`);
        // console.log(`hideFrontFlipIconToggle1: ${hideFrontFlipIconToggle}`);
        // console.log(`hideBackFlipIconToggle1: ${hideBackFlipIconToggle}`);
        // var beverage = (age >= 21) ? "Beer" : "Juice";
        (flipToggleClass === "flip-toggle") ? setFlipToggleClass("") : setFlipToggleClass("flip-toggle");
        (hideFrontFlipIconToggle === "hideFlipIcon") ? setHideFrontFlipIconToggle("") : setHideFrontFlipIconToggle("hideFlipIcon");
        // (hideBackFlipIconToggle === "") ? setHideBackFlipIconToggle("hideFlipIcon") : setHideFrontFlipIconToggle("");
        // (hideBackFlipIconToggle === "hideFlipIcon") ? setHideBackFlipIconToggle("") : setHideFrontFlipIconToggle("hideFlipIcon");


        // setHideFlipIconToggle("hideFlipIcon");
        // setTimeout(() => {
        //     setFlipToggleClass("");
        // }, 5000);
    }
    return (
        <>
            <div className="flip-card">
                <div className={`flip-card-inner ${flipToggleClass}`}>
                    <div className="flip-card-front">
                        {/* <div className="flipCardContainer"> */}
                            <img className="flipCardImg" src={imgUrlFront} alt="Avatar"></img>
                            <div onClick={toggleFlipAnimation}>
                                <span className={`fa-stack fa-2x frontFlipIcon ${hideFrontFlipIconToggle}`}>
                                    <i className="fas fa-circle fa-stack-1x"></i>
                                    <i className="fab fa-creative-commons-share fa-stack-1x"></i>
                                </span>
                            </div>
                            {/* <div onClick={onClickTest}> */}
                                {/* <i className="fas fa-sync" onClick={onClickTest}></i> */}
                                {/* <i className="fas fa-sync" onClick={onClickTest}></i> */}
                                {/* <i className="fab fa-creative-commons-share" onClick={onClickTest}></i> */}
                            {/* </div> */}
                            {/* <i className="fas fa-sync" id="refresh"></i> */}
                        {/* </div> */}

                    </div>
                    <div className="flip-card-back">
                        <img className="flipCardImg" src={imgUrlBack} alt="Avatar"></img>
                        <div onClick={toggleFlipAnimation}>
                                {/* <i className="fab fa-creative-commons-share"></i> */}
                                {/* <span className={`fa-stack fa-2x backFlipIcon ${hideBackFlipIconToggle}`}> */}
                                <span className={`fa-stack fa-2x backFlipIcon`}>
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
