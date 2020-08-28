import React from 'react';
import { useSelector } from 'react-redux';

import Switch from './Switch';
import './NavLinks.css';
import loadingWheel from '../../images/loading.svg';
// import '../../images/'

const NavLinks = (props) => {
    // const[isLoading, setIsLoading] = useState("hideLoading")
    // if we are on mobile, we want to run mobileSubmit which does exactly what props.onSubmit does PLUS it closes the
    // navbar after a user hits sumbit
    let localOnSubmit = "";
    if(props.show === true){
        localOnSubmit = props.onMobileSubmit;
    } else {
        localOnSubmit = props.onSubmit;
    }
    const isLoadingToggle = useSelector(state => state.isLoading);

    return (
        <ul className="nav-links">
        <li>
            <div className="selectorText">White</div>
            <Switch onColorSelection={props.onColorSelection} color="W" checkedState={props.whiteSwitch.checked} nameForName="whiteSwitch"/>
        </li>
        <li>
            <div className="selectorText">Blue</div>
            <Switch onColorSelection={props.onColorSelection} color="U" checkedState={props.blueSwitch.checked} nameForName="blueSwitch"/>
        </li>
        <li>
            <div className="selectorText">Black</div>
            <Switch onColorSelection={props.onColorSelection} color="B" checkedState={props.blackSwitch.checked} nameForName="blackSwitch"/>
        </li>
        <li>
            <div className="selectorText">Red</div>
            <Switch onColorSelection={props.onColorSelection} color="R" checkedState={props.redSwitch.checked} nameForName="redSwitch"/>
        </li>
        <li>
            <div className="selectorText">Green</div>
            <Switch onColorSelection={props.onColorSelection} color="G" checkedState={props.greenSwitch.checked} nameForName="greenSwitch"/>
        </li>
        <li>
            <div className="selectorText">Colorless</div>
            <Switch onColorSelection={props.onColorSelection} color="C" checkedState={props.colorlessSwitch.checked} nameForName="colorlessSwitch"/>
        </li>
        <li>
            <div className="selectorText">Lands</div>
            <Switch onColorSelection={props.onColorSelection} color="L" checkedState={props.landsSwitch.checked} nameForName="landsSwitch"/>
        </li>
        <li>
            <div>
                <img src={loadingWheel} alt="" id="loadingWheel" className={isLoadingToggle}></img>
            </div>
        </li>
        <li>
            <button 
                id="submitButton" 
                type="submit" 
                value="Find Cards" 
                onClick={localOnSubmit}>
                    <span>Find Cards</span>
            </button>
        </li>
    </ul>
    )
}

export default NavLinks;
