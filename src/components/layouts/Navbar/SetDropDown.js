import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './SetDropDown.css';

class SetDropDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            setDropDownIsLoading: true,
            setsForDropDownMenu: [],
            value: []
        }
    }
    //=========================================================================================
    // Fill the set Dropdown menu by making an API call OR using data stored in local storage
    //=========================================================================================
    componentDidMount = () => {
        this.checkForSetsInLocalStorage();
    }

    //this function checks to see if we have sets for the set dropdown menu stored in local storage. If we do, and they are < 24 hours olds, we use them
    //if we do, and they are > 24 hrs old, we delete the local storage and do an api call for sets again
    //if we have nothing in local storage for the set dropdown menu we do an api call for new sets data
    checkForSetsInLocalStorage = () => {
        let localSetsFromApiAsString = localStorage.getItem("setsForDropDown");
        if(localSetsFromApiAsString !== null){ //if we have any api data stored locally
            let localSetsFromApiAsObject = JSON.parse(localSetsFromApiAsString); //convert local storage from a string to an object we can use
            let currentDateTime = new Date(); // Get the current time
            console.log(`Current date and time: ${currentDateTime}`);
            console.log('type of time from local storage:');
            let timeStampFromLocalStorage = new Date(localSetsFromApiAsObject.time_created)
            console.log(typeof timeStampFromLocalStorage);
            let dateDifference = currentDateTime - timeStampFromLocalStorage; //in milliseconds
            let hoursOld = Math.floor(dateDifference/(1000*60*60)) //in hours
            console.log(`Hours old: ${hoursOld}`);
            if(hoursOld >= 24){
                //delete local storage
                console.log(`Local storage > 24 hours old, deleting and doing an api call for set dropdown`);
                localStorage.removeItem("setsForDropDown");
                //do a new api call
                this.setDropDownApiCall();
            } else {
                //set state equal to local storage sets object
                console.log(`setting state equal to local storage and skipping api call`);
                let filteredSetsForDropDown = this.filterSetsForDropDown(localSetsFromApiAsObject.data);
                this.setState({
                    setDropDownIsLoading: false, // The DropDown menu is loaded, this turns off the loading symbol
                    setsForDropDownMenu: filteredSetsForDropDown
                })
            }
        } else { //if we do not have any set data stored locally
            console.log(`no sets stored locally, doing an api call for new sets`);
            this.setDropDownApiCall();
        }
    }

    filterSetsForDropDown = (setsObjectToFilter) => {
        //this function first filters out the digital only sets, then it creates a new array using .map that will contain all the components
        //that will be displayed in the set dropdown
        let filteredSetObjectsArray = setsObjectToFilter.filter((eachSetObj, index) => {
            return eachSetObj.digital === false;
        });
        // Extract the set names and set icons and create an array for our drop-down menu
        let currentDate = new Date();
        let setsForDropDownList = filteredSetObjectsArray.map((eachSetObj, index) => {
            let releaseDateOfSet = eachSetObj.released_at; //get the date of release string
            releaseDateOfSet = new Date(releaseDateOfSet); //convert the string to a date object
            let dateDifference = currentDate - releaseDateOfSet; // in milliseconds
            let daysSinceRelease = Math.floor(dateDifference/(1000*60*60*24)); // converted to days
            // negative daysSinceRelease are sets that will release in the future
            let newValue = daysSinceRelease <= 28 ? "New" : "";
            return {
                key: eachSetObj.name,
                text: eachSetObj.name, //The text value is what is displayed in the input field after a user selects an option
                value: eachSetObj.code,
                content: (
                    <div className="optionContainer">
                        <span><img src={eachSetObj.icon_svg_uri} alt=""></img><span className="dropDownSetName">{eachSetObj.name}</span><em>{newValue}</em></span>
                    </div>
                )
            };
        })
        return setsForDropDownList;
    }

    //====================================================
    // Our API call function
    //====================================================
    setDropDownApiCall = async () => {
        console.log(`Making API call for sets`);
        let filteredSetsForDropDownMenu = []; // This contains ALL sets returned from the API call. We filter this set later.
        try {
            let response = await fetch(`https://api.scryfall.com/sets/`);
            let setObjects = await response.json();

            //Local Storage:
            let currentTimeAndDate = new Date(); // get the current date and time
            console.log(`date/time test: ${currentTimeAndDate}`);
            setObjects.time_created = currentTimeAndDate; // add the "time_created" key and current date and time value to the setObjects object return from the api
            localStorage.setItem("setsForDropDown", JSON.stringify(setObjects)); //convert the setObjects object to a string and store in 
            
            filteredSetsForDropDownMenu = this.filterSetsForDropDown(setObjects.data);
            this.setState({
                setDropDownIsLoading: false, // The DropDown menu is loaded, this turns off the loading symbol
                setsForDropDownMenu: filteredSetsForDropDownMenu
            })
        } catch (error) {
            console.log(`Set API Call to Scryfall API Failed`);
            console.log(error);
        }
    }    
    
    handleChange = (e, { value }) => {
        this.props.onSetSelection(value); //this function comes all the way to here via props from the <Header /> component
        this.setState({ 
            value: value
        }, () => {
            // console.log(`state after user selects a set`);
            // console.log(this.state.value);
        })
    }

    render() {
        return (
            <Dropdown
            placeholder='Select a Set(s):'
            fluid
            multiple
            search
            selection
            loading={this.state.setDropDownIsLoading}
            options={this.state.setsForDropDownMenu}
            value={this.state.value}
            onChange={this.handleChange}
        />
        )
    }
}

export default SetDropDown;