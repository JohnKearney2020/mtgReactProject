// import {Jumbotron, Navbar, Nav, Form, Button, FormControl, NavDropdown, Row, Col, ToggleButton } from 'react-bootstrap';
import { Navbar, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import HeaderBackground from './HeaderBackground';

import * as actionCreators from '../../store/actions/masterActionExporter';
import './Header.css';

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
        let switchName = e.target.name;
        let targetValue = e.target.value;
        //=============================
        //If the user clicked a color
        //=============================
        //Check to see if lands or colorless have been selected previously. If they have, unselect them
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
                    console.log('current local state:');
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
                    console.log('current local state:');
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
            <Navbar collapseOnSelect id="mainNavbar" expand="lg" sticky="top" variant="dark">
                {/* <Navbar.Brand href="#home"> */}
                <Navbar.Brand href="#home">
                    <img 
                        src="/images/setSymbol/THB.png" alt="" height="42" width="42">
                    </img>
                    Theros - Beyond Death
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Form onSubmit={this.handleSubmit}>
                            <Row >
                                <Col className="justify-content-center text-center">
                                    <Nav.Link value={'1'}>White</Nav.Link>
                                    {/* <ToggleButton type="radio" name="radio" defaultChecked value="1">White</ToggleButton> */}
                                    <Form.Check className="switch" type="switch" id="custom-switch1" name="whiteSwitch" label="" value="W" onChange={this.handleCheckBoxClick} checked={this.state.whiteSwitch.checked}/>
                                </Col>
                                <Col className="justify-content-center text-center">
                                    <Nav.Link value={'2'}>Blue</Nav.Link>
                                    <Form.Check className="switch" type="switch" id="custom-switch2" name="blueSwitch" label="" value="U" onChange={this.handleCheckBoxClick} checked={this.state.blueSwitch.checked}/>
                                </Col>  
                                <Col className="justify-content-center text-center">
                                    <Nav.Link value={'3'}>Black</Nav.Link>
                                    <Form.Check className="switch" type="switch" id="custom-switch3" name="blackSwitch" label="" value="B" onChange={this.handleCheckBoxClick} checked={this.state.blackSwitch.checked}/>
                                </Col>                                
                                <Col className="justify-content-center text-center">
                                    <Nav.Link value={'4'}>Red</Nav.Link>
                                    <Form.Check className="switch" type="switch" id="custom-switch4" name="redSwitch" label="" value="R" onChange={this.handleCheckBoxClick} checked={this.state.redSwitch.checked}/>
                                </Col>                                
                                <Col className="justify-content-center text-center">
                                    <Nav.Link value={'5'}>Green</Nav.Link>
                                    <Form.Check className="switch" type="switch" id="custom-switch5" name="greenSwitch" label="" value="G" onChange={this.handleCheckBoxClick} checked={this.state.greenSwitch.checked}/>
                                </Col>                                
                                <Col className="justify-content-center text-center">
                                    <Nav.Link value={'6'}>Colorless</Nav.Link>
                                    <Form.Check className="switch" type="switch" id="custom-switch6" name="colorlessSwitch" label="" value="C" onChange={this.handleCheckBoxClick} checked={this.state.colorlessSwitch.checked}/>
                                </Col>                               
                                <Col className="justify-content-center text-center">
                                    <Nav.Link value={'7'}>Lands</Nav.Link>
                                    <Form.Check className="switch" type="switch" id="custom-switch7" name="landsSwitch" label="" value="L" onChange={this.handleCheckBoxClick} 
                                    checked={this.state.landsSwitch.checked}/>
                                </Col>
                                {/* <Col className="m-auto">
                                    <Button variant="john" as="input" type="submit" value="Find Cards" readOnly onClick={() => this.props.findCards(this.state.colorsForAPI)}></Button>
                                </Col> */}
                                <Col className="m-auto">
                                    <Button variant="john" as="input" type="submit" value="Find Cards" readOnly onClick={(event) => this.handleSubmit(event)}></Button>
                                </Col>
                            </Row>
                        </Form>                        




                        {/* <Nav.Link href="" onClick={this.colorClickHandler} value={'1'}>White</Nav.Link> */}
                        {/* <Nav.Link href="" onClick={this.props.selectWhite}>White</Nav.Link> */}
                        {/* <Nav.Link href="" onClick={this.props.selectBlue} value={this.props.colorsSelectedByUser.push('blue')}>Blue</Nav.Link> */}
                        {/* <Nav.Link href="" onClick={this.colorClickHandler} value ={'2'}>Blue</Nav.Link>
                        <Nav.Link href="" onClick={this.colorClickHandler} value ={'3'}>Black</Nav.Link>
                        <Nav.Link href="" onClick={this.colorClickHandler} value ={'4'}>Red</Nav.Link>
                        <Nav.Link href="" onClick={this.colorClickHandler} value ={'5'}>Green</Nav.Link>
                        <Nav.Link href="" onClick={this.colorClickHandler} value ={'6'}>Multi</Nav.Link>
                        <Nav.Link href="" onClick={this.colorClickHandler} value ={'7'}>Colorless</Nav.Link>
                        <Nav.Link href="" onClick={this.colorClickHandler} value ={'8'}>Lands</Nav.Link>
                        <Button as="input" type="submit" value="submit"></Button> */}
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    {/* <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav> */}
                </Navbar.Collapse>
            </Navbar>
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

