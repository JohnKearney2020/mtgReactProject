import { connect } from 'react-redux';
import React, { Component } from 'react';
import HeaderBackground from './HeaderBackground';
import Navbar from './Navbar/Navbar';

import * as actionCreators from '../../store/actions/masterActionExporter';
import './Header.css';

class Header extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            colorsForAPI: [],
            setsForAPI: '',
            setShortHandForBackgrounds: 'DEFAULT',
            whiteSwitch: { checked: false },
            blueSwitch: { checked: false },
            blackSwitch: { checked: false },
            redSwitch: { checked: false },
            greenSwitch: { checked: false },
            colorlessSwitch: { checked: false },
            landsSwitch: { checked: false },
        }
    }
    
    //===========================================================================================================
    //                              Local Color State / Selected Switches on Navbar
    //===========================================================================================================
    // This method handles the navbar switches the user can select/deselect
    // Due to the way the Scryfall API is set up, users can choose any number of colors, HOWEVER, if they choose
    // 'Colorless' or 'Lands', those must be the only value chosen. This method automatically deselects any values that are
    // not compatible with that ruleset
    handleCheckBoxClick = (e) => {
        //Checkbox uncheck 4-17
        let oldColors = [...this.state.colorsForAPI];
        let targetCheckedState = e.target.checked;
        // console.log(`target checked state ${targetCheckedState}`);
        let switchName = e.target.name;
        // console.log(`switchname ${switchName}`);
        let targetValue = e.target.value;
        // console.log(`User checked: ${targetValue}`);
        //=============================
        //If the user clicked a color
        //=============================
        // Check to see if lands or colorless have been selected previously. If they have, unselect them
        if(e.target.value !== 'C' && e.target.value !== 'L'){
            if(this.state.colorlessSwitch.checked === true || this.state.landsSwitch.checked === true) {
                this.setState({
                    colorlessSwitch: {checked: false},
                    landsSwitch: { checked: false}
                });
            }
            //update the checked value in the local state for that switch
            this.setState({
                [switchName]: { checked: e.target.checked }
            }, () => {
                //update the colorsForAPI array in local state
                if(targetCheckedState === true){ //if the switched is turned 'on'
                    if(oldColors[0] === 'C' || oldColors[0] === 'L'){ //get rid of any existing C or L values
                        oldColors = [];
                    }
                    oldColors.push(targetValue); //add the new color selected
                    oldColors.sort(); //sort the array into smallest to larget numbers
                    this.setState({
                        colorsForAPI: oldColors
                    }, () => {
                        // console.log('current local state in Header.js:');
                        // console.log(this.state);
                        // console.log(this.state.colorsForAPI);
                    })
                } else { //if the switched is turned 'off'
                    let filteredColors = oldColors.filter((eachColor) => {
                        // return parseInt(eachColor) != parseInt(e.target.value); //remove the color that was deselected
                        return eachColor !== targetValue; //remove the color that was deselected
                    })
                    filteredColors.sort();
                    this.setState({
                        colorsForAPI: filteredColors
                    }, () => {
                        // console.log('current local state in Header.js:');
                        // console.log(this.state);
                        // console.log(this.state.colorsForAPI);
                    })
                }
            });

        } else { //if the user clicked 'Colorless' or 'Lands'
            //set all the colors' checked values to false
            if(switchName === 'colorlessSwitch'){
                console.log('e.target.checked value:', e.target.checked)
                if(e.target.checked === true){
                    oldColors = ['C'];
                } else {
                    oldColors = [];
                }
                this.setState({
                    colorlessSwitch: {checked: e.target.checked},
                    landsSwitch: { checked: false },
                    whiteSwitch: { checked: false },
                    blueSwitch: { checked: false },
                    blackSwitch: { checked: false },
                    redSwitch: { checked: false },
                    greenSwitch: { checked: false },
                    colorsForAPI: oldColors
                },() => {
                    // console.log('current local state in Header.js:');
                    // console.log(this.state);
                    // console.log(this.state.colorsForAPI);
                });
            } else {
                if(e.target.checked === true){
                    oldColors = ['L'];
                } else {
                    oldColors = [];
                }
                this.setState({
                    colorlessSwitch: { checked: false },
                    landsSwitch: {checked: e.target.checked},
                    whiteSwitch: { checked: false },
                    blueSwitch: { checked: false },
                    blackSwitch: { checked: false },
                    redSwitch: { checked: false },
                    greenSwitch: { checked: false },
                    colorsForAPI: oldColors
                },() => {
                    // console.log('current local state in Header.js:');
                    // console.log(this.state);
                    // console.log(this.state.colorsForAPI);
                });
            }
        }
    } // End of Local Color State / Selected Switches on Navbar

    //===========================================================================================================
    //                                    User Selects a Set From Dropdown list
    //===========================================================================================================
    setsForAPIHandler = (sets) => { //this is passed down via props to the DropDown component
        console.log(`This is the set value but in our <Header />`);
        console.log(sets);
        console.log(`Number of Sets User has selected: ${sets.length}`);

        if(sets.length > 0){ //if the user has selected at least one set
            //==========================================
            //take care of the shorthand first
            //==========================================
            if(sets.length === 1){
                this.setState({
                    setShortHandForBackgrounds: sets[0].setCode.toUpperCase()
                },() => {
                    console.log(`header local state for background ${this.state.setShortHandForBackgrounds}`);
                });
            } else {
                this.setState({
                    setShortHandForBackgrounds: 'DEFAULT'
                },() => {
                });
            }

            //==================================================
            // Now take care os the set portion of the api URL
            //==================================================
            let newSetsForAPI = '(';
            let firstSetTextCreated = false;
            for(let eachSetObject of sets){
                if(sets.length === 1){ //if we only have one set
                    // newSetsForAPI += 'set:' + eachSetObject.setCode;
                    newSetsForAPI += `set:${eachSetObject.setCode}`;
                }
                else if(firstSetTextCreated === false) { //if we have multiple sets, but are working on the first of those sets
                    // '(set:thb or set:iko)'
                    firstSetTextCreated = true;
                    newSetsForAPI += `set:${eachSetObject.setCode}`;
                } else { // any sets after the first set
                    newSetsForAPI = newSetsForAPI + ` or set:${eachSetObject.setCode}`;
                }
            }
            newSetsForAPI += ')'; // add the closing parenthesis
            this.setState({
                setsForAPI: newSetsForAPI
            },() => {
                console.log(`Local State in Header Updated with new set string for API call`);
                console.log(this.state.setsForAPI);
                // console.log('current local state in Header.js:');
                // console.log(this.state);
                // console.log(this.state.colorsForAPI);
            });  
            
        }

    }

    //===========================================================================================================
    //                                      Dispatch on Submit
    //===========================================================================================================
    handleSubmit = (e) => {
        // This gets passed down via props to:
        // 1. <Navbar />
        //      a. <Navlinks />
        e.preventDefault(); //prefent default behavior of a form navigating somewhere else
        //send out a dispatch if the user has made any selections, otherwise do nothing
        if(this.state.colorsForAPI.length > 0 && this.state.setsForAPI.length > 0){
            this.props.findCards(this.state.colorsForAPI, this.state.setsForAPI, this.state.setShortHandForBackgrounds)
        } else {
            console.log(`Choose a color or set`);
        }
    }

    render() {

        return (
        <>
            <HeaderBackground />
            <Navbar onSubmit={this.handleSubmit} onColorSelection={this.handleCheckBoxClick} {...this.state} onSetSelection={this.setsForAPIHandler}/>
        </>                
        )
    }
}

//========================================================
                    //mapStateToProps
//========================================================
//***we ended up only using a local state in this container, not the global state, and sending the information off, so no need for mapStateToProps */

//========================================================
                    //mapDispatchToProps
//========================================================
//here we define what actions we want to use in this container
//findCards is a property that will allow us to make API calls
//we can call this action with 'this.props.findCards' in the code above
const mapDispatchToProps = dispatch => {
    return {
        //this is called in our handleSubmit function
        findCards: (colorArray, setsStringForApi, setShorthandForBackgrounds) => dispatch(actionCreators.getCards(colorArray,setsStringForApi, setShorthandForBackgrounds))
    }
}

export default connect(null, mapDispatchToProps)(Header);

