import React, { useState } from 'react';
import { Multiselect } from 'react-widgets';

// default react widgets css
import 'react-widgets/dist/css/react-widgets.css';
// our css
import './DropDown.css';



// let { Multiselect } = ReactWidgets;
// let colors = ['orange', 'red', 'blue', 'purple']
let colors = [`Double Masters`, `Theros - Beyond Death` ]

const  DropDown = () => {

    const [setsForDropDown, setSetsForDropDown] = useState();
    let setsForDropDownHolder = []; //temporarily store all of our sets for the dropdown menu
    let filteredSets = [];
    const setApiCall = async () => {
        try {
            let response = await fetch(`https://api.scryfall.com/sets/`);
            // let setObjects = await response.json();
            let setObjects = await response.json();
            let setsFromApi = [];
            console.log(`json from the set api`);
            console.log(setObjects);
            console.log(`type of setObjects`);
            console.log(typeof setObjects);
            // secondHolder = JSON.parse(setObjects.data);
            setsFromApi = setObjects.data;
            // console.log(`.data added to the json`);
            // console.log(secondHolder);
            // console.log(`type of secondHolder`);
            // console.log(typeof secondHolder);

            // console.log(`Our Set Objects Look Like:`);
            // console.log(setObjects);
            // setsForDropDownHolder = JSON.parse(setObjects);
            // console.log(`using .data on the json:`);
            // console.log(setsForDropDownHolder);

            // // secondHolder = await setsForDropDownHolder.filter((eachSetObj,index) => {
            const filterSetObjects = (eachSetObj, index) => {
                return eachSetObj.digital === false;
            }

            filteredSets = setsFromApi.filter(filterSetObjects).map((eachSet, index) => {
                return eachSet.name;
            })
            console.log(`our set objects after filtering digital only out:`);
            console.log(filteredSets);

            setSetsForDropDown(filteredSets)
        } catch (error) {
            console.log(`Set API Call to Scryfall API Failed`);
            console.log(error);
        }
    }

    return (
        <>
            <div id="reactWidgetsOverride">
            <Multiselect
                data={setsForDropDown}
                // defaultValue={["orange", "blue"]}
                // disabled={["red", "purple"]}
            />
            </div>
            <button onClick={setApiCall}>API Test</button>
        </>
    )
}

export default DropDown;
