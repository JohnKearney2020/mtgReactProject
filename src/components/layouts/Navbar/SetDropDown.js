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
    //====================================================
    // Fill the set Dropdown menu by making an API call
    //====================================================
    componentDidMount = () => {
        this.setDropDownApiCall();
    }
    //====================================================
    // Our API call function
    //====================================================
    setDropDownApiCall = async () => {
        let setsFromApi = []; // This contains ALL sets returned from the API call. We filter this set later.
        let setsForDropDownList = []; //temporarily store all of our sets for the dropdown menu
        let filteredSetObjectsArray = []; //this will hold all the sets from the API that we actually want. We filter our initial response from
        //the API
        try {
            let response = await fetch(`https://api.scryfall.com/sets/`);
            let setObjects = await response.json();
            setsFromApi = setObjects.data;
            console.log(`set objects return from the API:`);
            console.log({setsFromApi});
            // ******************************************
            //            Filter Function
            // ******************************************
            // this function filters the object of sets that is returned from the API. It filters out sets that are digital only sets
            filteredSetObjectsArray = setsFromApi.filter((eachSetObj, index) => {
                return eachSetObj.digital === false;
            });
            // Extract the set names and set icons and create an array for our drop-down menu
            setsForDropDownList = filteredSetObjectsArray.map((eachSetObj, index) => {
                return {
                    key: eachSetObj.name,
                    text: eachSetObj.name, //The text value is what is displayed in the input field after a user selects an option
                    value: eachSetObj.code,
                    // setcode: eachSetObj.code,
                    content: (
                        // <div className="optionContainer" onClick={setHandler}>
                        <div className="optionContainer">
                            <span><img src={eachSetObj.icon_svg_uri} alt=""></img><span className="dropDownSetName">{eachSetObj.name}</span><em>New</em></span>
                        </div>
                    )
                };
            })
            this.setState({
                setDropDownIsLoading: false, // The DropDown menu is loaded, this turns off the loading symbol
                setsForDropDownMenu: setsForDropDownList
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
            console.log(`state after user selects a set`);
            console.log(this.state.value);
        })
    }

    render() {
        return (
            <Dropdown
            placeholder='Select a Set(s):'
            fluid
            // compact
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