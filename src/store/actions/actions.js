import * as actionTypes from './actionTypes';

//=================================================
            //Action Creators
//=================================================           

let cards = [];
//==========================================================================
//                          Main Dispatch Function
//==========================================================================
export const executeDispatch = (colorsArrayForAPICall, cards, actionType) => {
    // console.log(`${colorsArrayForAPICall} passed to dispatching action`);
    return {
        type: actionType,
        cardsToPassToGlobalState: cards
    };
}

//==========================================================================
//                          Dispatch for No Results
//==========================================================================
export const noResultsDispatch = (noResultsCardObject) => {
    console.log('sucessfully called no results dispatch');
    let actionType = actionTypes.NORESULTS;
    return {
        type: actionType,
        fakeCardObjectNoResults: noResultsCardObject
    };
}

export const getCards = (color,sets) => {
    let actionType = actionTypes.GETCARDS;
    // console.log('action Type:');
    // console.log(actionType);
    let colorsArrayForAPICall = color;
    let setsStringForAPICall = sets;
    // console.log(colorsArrayForAPICall);
    return (dispatch) => {
        getCardData(colorsArrayForAPICall, setsStringForAPICall, dispatch, actionType);
    }
};

//=========================================================================================
//                                      Sets for ApiPull
//=========================================================================================
//-----------------------------------
//          Single Set
//-----------------------------------
//%3A = ':', equivalent to 'set:thb'
// let setsForApiPull = '(set%3Athb)';
// let setsForApiPull = '(set:2xm or set:jmp or set:m21)';

//-----------------------------------
//          Multiple Sets
//-----------------------------------
//need equivalent to (set:thb or set:iko)
// %28 = '(', %20 = ' ', %29 = ')'
// '(set:thb or set:iko)'
// let setsForApiPull = '%28set%3Athb%20or%20set%3Aiko%29'; //thb and iko
// let setsForApiPull = '%28set%3Athb%20or%20set%3Aiko%20or%20set%3Aaer%20or%20set%3Akld%20or%20set%3Aakh%29'; //thb and iko and aer and kld


//=========================================================================================
//                            Main API Call function
//=========================================================================================
async function getCardData(colorsArrayForAPICall,setsStringForAPICall, dispatch, actionType) {
    console.log('colorsArrayForAPICall from click:');
    console.log(colorsArrayForAPICall);
    let apiURLInsert = createApiURL(colorsArrayForAPICall, setsStringForAPICall);
    try{
        let response = await fetch(`https://api.scryfall.com/cards/search?&q=${setsStringForAPICall}+${apiURLInsert}`);
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=set%3Athb+${apiURLInsert}`);
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=${setsForApiPull}+c%3AC+-t%3AL`);
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=c%3AC+${setsForApiPull}+-t%3Aland`);
        
        //below: purely white cards, no boros etc.
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=set%3Athb+c%3Aw+-c%3Au+-c%3Ab+-c%3Ar+-c%3Ag`);
        
        //below: Colorless, type not equal to lands.
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=set%3Athb+id%3A${apiURLInsert}+-t%3AL`);
        let cardObjects = await response.json();
        //=====================================================
        //                      If no Results
        //=====================================================
        //if we sucessfully connect to and hear back from the API, but it didn't have any results for us, we need to do a special dispatch
        //the returned object will look like below and mimics what we'd normally return so as to not cause errors with the .filter() array in the render() function of our Home.js component
        /* {object: "error", code: "not_found", status: 404, details: "Your query didn’t match any cards. Adjust your sea…ntax guide at https://scryfall.com/docs/reference"} */
        if(cardObjects.object === 'error') {
            console.log('sucessfully triggered an error response from API');
            let errorCardObject =
                [
                    {
                    name: "No Cards Found",
                    image_uris: { border_crop: "https://i.imgur.com/Qx6AMQQ.jpg" },
                    }
                ]
            // console.log('image object test:');
            // console.log(errorCardObject[0].name);
            // console.log(errorCardObject[0].image_uris.normal);
            dispatch(noResultsDispatch(errorCardObject, actionType))
        } else {
            console.log('card objects sucessfully pulled from API:');
            console.log(cardObjects);
            cards = cardObjects.data
            if(cardObjects.has_more === true) { //if there are more than 175 results
                setTimeout(() => {
                    let pagURL = cardObjects.next_page;
                    getCardDataPagination(colorsArrayForAPICall, dispatch, actionType, pagURL) //call the API fetch() function 
                }, 100); //Scryfall API documentation asks for 100 ms break between calls
            } else {
                console.log('cards before final dispatch:');
                console.log(cards);
                dispatch(executeDispatch(colorsArrayForAPICall, cards, actionType));
                return cardObjects;
            }
        }
    } catch(err)
    {
        console.log('Fetch call to Scryfall API failed :(');
        console.error(err);
    }
}

//=========================================================================================
//                          API Call function for cases with Pagination
//=========================================================================================
async function getCardDataPagination(colorsArrayForAPICall, dispatch, actionType, pagURL) {
    try{
        let response = await fetch(pagURL);
        let cardObjects = await response.json();
        // console.log('card objects sucessfully pulled from API:');
        // console.log(cardObjects);
        cards = cards.concat(cardObjects.data); //this is at minimum our 2nd call for cards so we need to concat onto earlier array
        if(cardObjects.has_more === true) {
            setTimeout(() => {
            let pagURL = cardObjects.next_page;
            getCardDataPagination(colorsArrayForAPICall, dispatch, actionType, pagURL) //call the API fetch() function 
            }, 100);
        } else {
            // console.log('cards before final dispatch:');
            // console.log(cards);
            dispatch(executeDispatch(colorsArrayForAPICall, cards, actionType));
            return cardObjects;
        }
    } catch(err) {
        console.log('Fetch call to Scryfall API failed :(');
        console.error(err);
    }
}

//=========================================================================================
//                            Api call URL generator Function
//=========================================================================================

function createApiURL(arrayOfColors, setsStringForAPICall){
    let stringForAPIURL = '';
    let wubrgArray = ['W', 'U', 'B', 'R', 'G'];
    // console.log('arrayOfColors just before creating stringForAPIURL:');
    // console.log(arrayOfColors);
    if(arrayOfColors[0] !== 'C' || arrayOfColors[0] !== 'L'){
        stringForAPIURL = 'c%3A'; //set this up to pull colors
        for (let eachColorToPull of arrayOfColors){
            // console.log('test 1 triggered');
            // console.log('eachColorToPull: ',  eachColorToPull)
            // console.log('arrayOfColors[0]: ',  arrayOfColors[0])
            stringForAPIURL = stringForAPIURL + `${eachColorToPull}`; //add each color the user selected
            // console.log('string after concat: ', stringForAPIURL);
        }
        for(let eachColorToExclude of wubrgArray){
            if(arrayOfColors.includes(eachColorToExclude) === false){
                stringForAPIURL = stringForAPIURL + `+-c%3A${eachColorToExclude}`;
                //this ensures cards of colors not selected by the user
                //are not included. For example, if the user selects 'white', only purely white cards and white cards that also
                //have a generic mana symbol will be returned. If we don't take this step, we will get purely white cards along
                //with other color combinations that include white, like Boros (white and red)
            }
        }
        // console.log('Final string sent for API call: ', stringForAPIURL)

    }

    //=============================================
    //             Lands and Colorless
    //=============================================
    if(arrayOfColors[0] === 'C'){
        stringForAPIURL = 'c%3Ac+-t%3Aland'; //set this up to pull colorless cards minus lands that produce colorless mana
        //stringForAPIURL = stringForAPIURL + '+-t%3AL'; //eliminates lands that produce colorless mana
        // console.log('stringForAPIURL after additions we made to it: ', stringForAPIURL);
    }
    if(arrayOfColors[0] === 'L'){
        stringForAPIURL = 't%3Aland';
        // console.log('stringForAPIURL after additions we made to it: ', stringForAPIURL);
    }

    // console.log('Final string sent for API call: ', stringForAPIURL)
    return stringForAPIURL;
}




//=========================================================================================
//                            Original, non-paginated Api call Function
//=========================================================================================
// async function getCardData(colorsArrayForAPICall, dispatch, actionType) {
//     console.log('colorsArrayForAPICall from click:');
//     console.log(colorsArrayForAPICall);
//     let apiURLInsert = createApiURL(colorsArrayForAPICall)
//     try{
//         let response = await fetch(`https://api.scryfall.com/cards/search?&q=${setsForApiPull}+${apiURLInsert}`);
        
//         //below: purely white cards, no boros etc.
//         // let response = await fetch(`https://api.scryfall.com/cards/search?&q=set%3Athb+c%3Aw+-c%3Au+-c%3Ab+-c%3Ar+-c%3Ag`);
        
//         //below: Colorless, type not equal to lands.
//         // let response = await fetch(`https://api.scryfall.com/cards/search?&q=set%3Athb+id%3A${apiURLInsert}+-t%3AL`);
//         let cardObjects = await response.json();
//         //=====================================================
//                                 //If no Results
//         //=====================================================
//         //if we sucessfully connect to and hear back from the API, but it didn't have any results for us, we need to do a special dispatch
//         //the returned object will look like below and mimics what we'd normally return so as to not cause errors with the .filter() array in the render() function of our Home.js component
//         /* {object: "error", code: "not_found", status: 404, details: "Your query didn’t match any cards. Adjust your sea…ntax guide at https://scryfall.com/docs/reference"} */
//         if(cardObjects.object === 'error') {
//             console.log('sucessfully triggered an error response from API');
//             let errorCardObject =
//                 [
//                     {
//                     name: "No Cards Found",
//                     image_uris: { normal: "https://i.imgur.com/Qx6AMQQ.jpg" },
//                     }
//                 ]
//             console.log('image object test:');
//             console.log(errorCardObject[0].name);
//             console.log(errorCardObject[0].image_uris.normal);
//             dispatch(noResultsDispatch(errorCardObject, actionType))
//         }else {
//             console.log('card objects sucessfully pulled from API:');
//             console.log(cardObjects);
//             cards = cardObjects.data
//             console.log('cards right before dispatch:');
//             console.log(cards);
//             dispatch(executeDispatch(colorsArrayForAPICall, cards, actionType));
//             return cardObjects;
//         }
//     } catch(err)
//     {
//         console.log('Fetch call to Scryfall API failed :(');
//         console.error(err);
//     }
// }



