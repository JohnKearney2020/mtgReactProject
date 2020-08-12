import React, { useState } from 'react';
import { Multiselect } from 'react-widgets';

// default react widgets css
import 'react-widgets/dist/css/react-widgets.css';
// our css
import './DropDown.css';

const  DropDown = () => {

    const [setObjectsFromAPI, setSetObjectsFromAPI] = useState([]);
    const [setNamesOnly, setSetNamesOnly] = useState([]);
    const [setNamesForCardFetch, setSetNamesForCardFetch] = useState("");
    let setsForDropDownList = []; //temporarily store all of our sets for the dropdown menu

    const setApiCall = async () => {
        try {
            let response = await fetch(`https://api.scryfall.com/sets/`);
            // let setObjects = await response.json();
            let setObjects = await response.json();
            let setsFromApi = [];

            setsFromApi = setObjects.data;
            // ******************************************
            //            Filter Function
            // ******************************************
            // this function filters the object of sets that is returned from the API. It filters out sets that are digital only sets
            const filterSetObjects = (eachSetObj, index) => {
                return eachSetObj.digital === false;
            }
            // here we do the filtering, then we extract the names of each set using .map()
            // filteredSets = setsFromApi.filter(filterSetObjects).map((eachSet, index) => {
            //     return eachSet.name;
            // })
            let filteredSetObjectsArray = setsFromApi.filter((eachSetObj, index) => {
                return eachSetObj.digital === false;
            });
            // console.log(`our set objects after filtering digital only out:`);
            // console.log(filteredSetObjectsArray);

            // Update our local state to contain all of our filtered sets
            setSetObjectsFromAPI(filteredSetObjectsArray);

            // Extract the set names and create an array of set names for our drop-down menu
            setsForDropDownList = filteredSetObjectsArray.map((eachSetObj, index) => {
                return eachSetObj.name;
            })
            // console.log(`Set names only:`);
            // console.log(setsForDropDownList);
            setSetNamesOnly(setsForDropDownList)
        } catch (error) {
            console.log(`Set API Call to Scryfall API Failed`);
            console.log(error);
        }
    }

    return (
        <>
            <div id="reactWidgetsOverride">
            <Multiselect
                data={setNamesOnly}
                // defaultValue={["orange", "blue"]}
                // disabled={["red", "purple"]}
            />
            </div>
            <button onClick={setApiCall}>API Test</button>
        </>
    )
}

export default DropDown;
