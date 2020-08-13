import React, { useState, useEffect, setApiCall } from 'react';
import { Multiselect } from 'react-widgets';

// default react widgets css
import 'react-widgets/dist/css/react-widgets.css';
// our css
import './DropDown.css';

const  DropDown = (props) => {

    const [setObjectsFromAPI, setSetObjectsFromAPI] = useState([]);
    const [setNamesOnly, setSetNamesOnly] = useState([]);
    const [setNamesValues, setSetNamesValues] = useState([]);
    // const [setNamesForCardFetch, setSetNamesForCardFetch] = useState("");
    let setsForDropDownList = []; //temporarily store all of our sets for the dropdown menu
    let filteredSetObjectsArray = [];

    useEffect(() => {
        // code to run on component mount
        setApiCall()
        console.log(`called setApiCall() function via useEffect`);
    }, []); //leaving the second array argument blank will make this behave just like ComponentDidMount()


    
    // componentDidMount( setApiCall() );
    
    const setApiCall = async () => {
        try {
            let response = await fetch(`https://api.scryfall.com/sets/`);
            // let setObjects = await response.json();
            let setObjects = await response.json();
            let setsFromApi = [];

            setsFromApi = setObjects.data;
            console.log(`set objects return from the API:`);
            console.log({setsFromApi});
            // ******************************************
            //            Filter Function
            // ******************************************
            // this function filters the object of sets that is returned from the API. It filters out sets that are digital only sets
            // const filterSetObjects = (eachSetObj, index) => {
            //     return eachSetObj.digital === false;
            // }
            // here we do the filtering, then we extract the names of each set using .map()
            // filteredSets = setsFromApi.filter(filterSetObjects).map((eachSet, index) => {
            //     return eachSet.name;
            // })
            filteredSetObjectsArray = setsFromApi.filter((eachSetObj, index) => {
                return eachSetObj.digital === false;
            });
            // console.log(`our set objects after filtering digital only out:`);
            // console.log(filteredSetObjectsArray);

            // Update our local state to contain all of our filtered sets
            setSetObjectsFromAPI(filteredSetObjectsArray);
            console.log(`Our setObjectsFromAPI local state:`);
            console.log(setObjectsFromAPI);

            // Extract the set names and create an array of set names for our drop-down menu
            setsForDropDownList = filteredSetObjectsArray.map((eachSetObj, index) => {
                return {
                    setName: eachSetObj.name, 
                    setCode: eachSetObj.code
                };
            })
            // console.log(`Set names only:`);
            // console.log(setsForDropDownList);
            setSetNamesOnly(setsForDropDownList)
        } catch (error) {
            console.log(`Set API Call to Scryfall API Failed`);
            console.log(error);
        }
    }

    const onSetSelectHandler = (value) => {
        setSetNamesValues(value); //update the local state that will display in the input field
        // let setsURI = ""; //this will hold the string of set names in URI format for our get cards api call

        // const findSetShorthand = () => {
        //     console.log(`called findSetShortHand function`);
        //     console.log(`setNamesValues`);
        //     console.log({setNamesValues});
        //     for(let eachSetName of value) {
        //         console.log(`called outer loop`);
        //         for(let eachSetObj of setObjectsFromAPI) {
        //             console.log(`called inner loop`);
        //             if(eachSetName === eachSetObj.name) { //if we find the set object that matches the set name we are looking for
        //                 setsURI += eachSetObj.code;
        //                 console.log(`Found a matching set:`);
        //                 console.log(`set name from values: ${eachSetName}, set name from set object: ${eachSetObj.name}`);
        //                 console.log(`set code: ${eachSetObj.code}`);
        //             } 
        //         }
        //     }
        //     // setsURI = setObjectsFromAPI.
        //     // console.log('test clg ');
        // }
        // findSetShorthand();
        props.onSetSelection(value); //this function comes all the way to here via props from the <Header /> component
        // Here, make a function that updates the local state for the API Call

    }

    // let ListItem = ({ item }) => (
        // <span onClick={props.addSetForAPI} value={item.name}>{item.name}</span>
        // <span><strong>{item.name}</strong></span>
        // <span>{item}</span>
    // );

    let ListItem = ({ item }) => {
        // let itemName = JSON.stringify(item.name);
        // console.log(`type of item.setname`);
        // console.log(typeof item.setName);
    // return <span><strong>{item.setName}</strong> <span>{item.setCode}</span></span>;
    return <span>{item.setName}</span>;
    }

    return (
        <>
            <div id="reactWidgetsOverride">
                {/* <Multiselect
                    data={setNamesOnly}
                    // data={setObjectsFromAPI}
                    itemComponent={ListItem}

                    // defaultValue={["orange", "blue"]}
                    // disabled={["red", "purple"]}
                    value={setNamesValues} //value is what is displayed in the input feild as a user selects/deselects sets.
                    onChange={value => onSetSelectHandler(value)}
                /> */}
                <Multiselect
                    data={setNamesOnly} //this is the object with data we will work with to fill in our dropdown list
                    // textField={item => item.setName + ' ' + item.setCode}
                    textField={item => item.setName} //this is what will show up in the dropdown input field when a user selects a set
                    itemComponent={ListItem} //this determines what the items in the dropdown list look like
                    value={setNamesValues}
                    onChange={value => onSetSelectHandler(value)}
                />
            </div>
            {/* <button onClick={setApiCall}>API Test</button> */}
        </>
    )
}

export default DropDown;
