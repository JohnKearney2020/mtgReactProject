import React from 'react';
// import { NavLink } from 'react-router-dom';

import Switch from './Switch';
import './navbar.css';

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <h4>The Nav</h4>
            </div>
            <ul className="nav-links">
                <li>
                    <div>White</div>
                    <Switch />
                </li>
                <li>
                    <div>Blue</div>
                    <Switch />
                </li>
                <li>
                    <div>Black</div>
                    <Switch />
                </li>
                <li>
                    <div>Red</div>
                    <Switch />
                </li>
                <li>
                    <div>Red</div>
                    <Switch />
                </li>
                <li>
                    <div>Colorless</div>
                    <Switch />
                </li>
                <li>
                    <div>Lands</div>
                    <Switch />
                </li>
            </ul>
            <div className="burger">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    )
}

export default Navbar;

// {/* <Navbar collapseOnSelect id="mainNavbar" expand="lg" sticky="top" variant="dark">
// {/* <Navbar.Brand href="#home"> */}
// <Navbar.Brand href="#home">
//     <img 
//         src="/images/setSymbol/THB.png" alt="" height="42" width="42">
//     </img>
//     Theros - Beyond Death
// </Navbar.Brand>
// <Navbar.Toggle aria-controls="responsive-navbar-nav" />
// <Navbar.Collapse id="responsive-navbar-nav">
//     <Nav className="m-auto">
//         <Form onSubmit={this.handleSubmit}>
//             <Row >
//                 <Col className="justify-content-center text-center">
//                     <Nav.Link value={'1'}>White</Nav.Link>
//                     {/* <ToggleButton type="radio" name="radio" defaultChecked value="1">White</ToggleButton> */}
//                     <Form.Check className="switch" type="switch" id="custom-switch1" name="whiteSwitch" label="" value="W" onChange={this.handleCheckBoxClick} checked={this.state.whiteSwitch.checked}/>
//                 </Col>
//                 <Col className="justify-content-center text-center">
//                     <Nav.Link value={'2'}>Blue</Nav.Link>
//                     <Form.Check className="switch" type="switch" id="custom-switch2" name="blueSwitch" label="" value="U" onChange={this.handleCheckBoxClick} checked={this.state.blueSwitch.checked}/>
//                 </Col>  
//                 <Col className="justify-content-center text-center">
//                     <Nav.Link value={'3'}>Black</Nav.Link>
//                     <Form.Check className="switch" type="switch" id="custom-switch3" name="blackSwitch" label="" value="B" onChange={this.handleCheckBoxClick} checked={this.state.blackSwitch.checked}/>
//                 </Col>                                
//                 <Col className="justify-content-center text-center">
//                     <Nav.Link value={'4'}>Red</Nav.Link>
//                     <Form.Check className="switch" type="switch" id="custom-switch4" name="redSwitch" label="" value="R" onChange={this.handleCheckBoxClick} checked={this.state.redSwitch.checked}/>
//                 </Col>                                
//                 <Col className="justify-content-center text-center">
//                     <Nav.Link value={'5'}>Green</Nav.Link>
//                     <Form.Check className="switch" type="switch" id="custom-switch5" name="greenSwitch" label="" value="G" onChange={this.handleCheckBoxClick} checked={this.state.greenSwitch.checked}/>
//                 </Col>                                
//                 <Col className="justify-content-center text-center">
//                     <Nav.Link value={'6'}>Colorless</Nav.Link>
//                     <Form.Check className="switch" type="switch" id="custom-switch6" name="colorlessSwitch" label="" value="C" onChange={this.handleCheckBoxClick} checked={this.state.colorlessSwitch.checked}/>
//                 </Col>                               
//                 <Col className="justify-content-center text-center">
//                     <Nav.Link value={'7'}>Lands</Nav.Link>
//                     <Form.Check className="switch" type="switch" id="custom-switch7" name="landsSwitch" label="" value="L" onChange={this.handleCheckBoxClick} 
//                     checked={this.state.landsSwitch.checked}/>
//                 </Col>
//                 {/* <Col className="m-auto">
//                     <Button variant="john" as="input" type="submit" value="Find Cards" readOnly onClick={() => this.props.findCards(this.state.colorsForAPI)}></Button>
//                 </Col> */}
//                 <Col className="m-auto">
//                     <Button variant="john" as="input" type="submit" value="Find Cards" readOnly onClick={(event) => this.handleSubmit(event)}></Button>
//                 </Col>
//             </Row>
//         </Form>                        




//         {/* <Nav.Link href="" onClick={this.colorClickHandler} value={'1'}>White</Nav.Link> */}
//         {/* <Nav.Link href="" onClick={this.props.selectWhite}>White</Nav.Link> */}
//         {/* <Nav.Link href="" onClick={this.props.selectBlue} value={this.props.colorsSelectedByUser.push('blue')}>Blue</Nav.Link> */}
//         {/* <Nav.Link href="" onClick={this.colorClickHandler} value ={'2'}>Blue</Nav.Link>
//         <Nav.Link href="" onClick={this.colorClickHandler} value ={'3'}>Black</Nav.Link>
//         <Nav.Link href="" onClick={this.colorClickHandler} value ={'4'}>Red</Nav.Link>
//         <Nav.Link href="" onClick={this.colorClickHandler} value ={'5'}>Green</Nav.Link>
//         <Nav.Link href="" onClick={this.colorClickHandler} value ={'6'}>Multi</Nav.Link>
//         <Nav.Link href="" onClick={this.colorClickHandler} value ={'7'}>Colorless</Nav.Link>
//         <Nav.Link href="" onClick={this.colorClickHandler} value ={'8'}>Lands</Nav.Link>
//         <Button as="input" type="submit" value="submit"></Button> */}
//         {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//         </NavDropdown> */}
//     </Nav>
//     {/* <Nav>
//         <Nav.Link href="#deets">More deets</Nav.Link>
//         <Nav.Link eventKey={2} href="#memes">
//             Dank memes
//         </Nav.Link>
//     </Nav> */}
// </Navbar.Collapse>
// </Navbar> */}
