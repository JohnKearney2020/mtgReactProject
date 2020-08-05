// import {Jumbotron, Navbar, Nav, Form, Button, FormControl, NavDropdown, Row, Col, ToggleButton } from 'react-bootstrap';
// import { Navbar, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import HeaderBackground from './HeaderBackground';
import Navbar from './Navbar/Navbar';

import * as actionCreators from '../../store/actions/masterActionExporter';
import './header.css';

class Header extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            colorsForAPI: [],
            whiteSwitch: { checked: false},
            blueSwitch: { checked: false},
            blackSwitch: { checked: false},
            redSwitch: { checked: false},
            greenSwitch: { checked: false},
            colorlessSwitch: { checked: false},
            landsSwitch: { checked: false}
        }
    }
    
    //===========================================================================================================
    //                                      Local Color State
    //===========================================================================================================
    handleCheckBoxClick = (e) => {
        //Checkbox uncheck 4-17
        let oldColors = [...this.state.colorsForAPI];
        let targetCheckedState = e.target.checked;
        console.log(`target checked state ${targetCheckedState}`);
        let switchName = e.target.name;
        console.log(`switchname ${switchName}`);
        let targetValue = e.target.value;
        console.log(`User checked: ${targetValue}`);
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
                        console.log('current local state in Header.js:');
                        console.log(this.state);
                        console.log(this.state.colorsForAPI);
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
                        console.log('current local state in Header.js:');
                        console.log(this.state);
                        console.log(this.state.colorsForAPI);
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
                    console.log('current local state in Header.js:');
                    console.log(this.state);
                    console.log(this.state.colorsForAPI);
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
                    console.log('current local state in Header.js:');
                    console.log(this.state);
                    console.log(this.state.colorsForAPI);
                });
            }
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
        console.log('form submitted');
        //send out a dispatch if the user has made any selections, otherwise do nothing
        if(this.state.colorsForAPI.length > 0){
            this.props.findCards(this.state.colorsForAPI)
        }
    }

    //===========================================================================================================
    //                                      Portal for Jumbotron
    //===========================================================================================================


    render() {

        return (
        <>
            {/* ---------------------------------- HEADER -------------------------------------------------------------------------- */}
            {/* <Jumbotron fluid id="jumbotron" className="position-relative overflow-hidden d-none d-sm-block"></Jumbotron> */}
            {/* ---------------------------------------------------- End of Header ----------------------------------------------------- --> */}
            <HeaderBackground />
            {/* <Navbar onSubmit={this.handleSubmit} onColorSelection={this.handleCheckBoxClick} checkedState={...this.state}/> */}
            <Navbar onSubmit={this.handleSubmit} onColorSelection={this.handleCheckBoxClick} {...this.state}/>

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
        findCards: (colorArray) => dispatch(actionCreators.getCards(colorArray))
    }
}

export default connect(null, mapDispatchToProps)(Header);

            // {/* <Navbar 
            // onSubmit={this.handleSubmit} 
            // onColorSelection={this.handleCheckBoxClick} 
            // whiteState={this.state.whiteSwitch}
            // blueState={this.state.blueSwitch}
            // blackState={this.state.blackSwitch}
            // redState={this.state.redSwitch}
            // greenState={this.state.greenSwitch}
            // colorlessState={this.state.colorlessSwitch}
            // landsState={this.state.landsSwitch}
            // /> */}
