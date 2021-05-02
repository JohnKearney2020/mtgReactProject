import * as actionTypes from './actionTypes';

//=================================================
            //Action Creators
//=================================================           

let cards = [];

//==========================================================================
//                          Main Dispatch Function
//==========================================================================
export const executeDispatch = (actionType, cards, setStringForApiCall, setShorthandForBackgrounds) => {
    return {
        type: actionType,
        cardsToPassToGlobalState: cards,
        setShorthandForBackgrounds: setShorthandForBackgrounds,
        isLoading: "hideLoading"
    };
}

//==========================================================================
//                          Dispatch for No Results
//==========================================================================
export const noResultsDispatch = (noResultsCardObject) => {
    // console.log('sucessfully called no results dispatch');
    let actionType = actionTypes.NORESULTS;
    return {
        type: actionType,
        fakeCardObjectNoResults: noResultsCardObject,
        isLoading: "hideLoading"
    };
}

export const showLoadingWheelDispatch = () => {
    let actionType = actionTypes.ISLOADING;
    return {
        type: actionType
    }
}
export const showContentPolicyDispatch = () => {
    let actionType = actionTypes.SHOWCONTENTPOLICY;
    return {
        type: actionType
    }
}



export const getCards = (colors,sets,setShorthand) => {
    let actionType = actionTypes.GETCARDS;
    let colorsArrayForAPICall = colors;
    let setsStringForAPICall = sets;
        // Make a function call to find what the set shorthand value(s) should be
    // let setShorthandForBackgrounds = getSetShorthand(setShorthand)
    let setShorthandForBackgrounds = setShorthand;
    return (dispatch) => {
        getCardData(colorsArrayForAPICall, setsStringForAPICall, setShorthandForBackgrounds, dispatch, actionType);
    }
};

const findSymbol = (char) => {
  switch (char) {
    //Colored Mana
    case 'W':
      return `<img className='testStringImage' src='../../images/manaSymbols/white.jpg'></img>`
    case 'U':
      return `<img className='testStringImage' src='../../images/manaSymbols/blue.jpg'></img>`
    case 'B':
      return `<img className='testStringImage' src='../../images/manaSymbols/black.jpg'></img>`
    case 'R':
      return `<img className='testStringImage' src='../../images/manaSymbols/red.jpg'></img>`
    case 'G':
      return `<img className='testStringImage' src='../../images/manaSymbols/green.jpg'></img>`

    // ColorLess Mana
    case 'C':
      return `<img className='testStringImage' src='../../images/manaSymbols/colorless.jpg'></img>`

    // Snow Mana
    case 'S':
      return `<img className='testStringImage' src='../../images/manaSymbols/snow.jpg'></img>`

    // Generic Mana
    case '0':
      return `<img className='testStringImage' src='../../images/manaSymbols/zeroGeneric.jpg'></img>`
    case '1':
      return `<img className='testStringImage' src='../../images/manaSymbols/oneGeneric.jpg'></img>`
    case '2':
      return `<img className='testStringImage' src='../../images/manaSymbols/twoGeneric.jpg'></img>`
    case '3': 
      return `<img className='testStringImage' src='../../images/manaSymbols/threeGeneric.jpg'></img>`
    case '4':
      return `<img className='testStringImage' src='../../images/manaSymbols/fourGeneric.jpg'></img>`
    case '5':
      return `<img className='testStringImage' src='../../images/manaSymbols/fiveGeneric.jpg'></img>`
    case '6':
      return `<img className='testStringImage' src='../../images/manaSymbols/sixGeneric.jpg'></img>`
    case '7':
      return `<img className='testStringImage' src='../../images/manaSymbols/sevenGeneric.jpg'></img>`
    case '8':
      return `<img className='testStringImage' src='../../images/manaSymbols/eightGeneric.jpg'></img>`
    case 'X':
      return `<img className='testStringImage' src='../../images/manaSymbols/xGeneric.jpg'></img>`
    case '/': //For Hybrid Mana Symbols & Phyrexian Mana Symbols
      return `/`

    //Phyrexian Mana
    case 'W/P': //White 
      return `<img className='testStringImage' src='../../images/manaSymbols/phyrexianWhite.jpg'></img>`
    case 'U/P': //Blue
      return `<img className='testStringImage' src='../../images/manaSymbols/phyrexianBlue.jpg'></img>`
    case 'B/P': //Black
      return `<img className='testStringImage' src='../../images/manaSymbols/phyrexianBlack.jpg'></img>`
    case 'R/P': //Red
      return `<img className='testStringImage' src='../../images/manaSymbols/phyrexianRed.jpg'></img>`
    case 'G/P': //Red
      return `<img className='testStringImage' src='../../images/manaSymbols/phyrexianGreen.jpg'></img>`

    //Regular Hybrid Mana
    case 'W/U': //White/Blue
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridWhiteBlue.jpg'></img>`
    case 'U/B': //Blue/Black
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridBlueBlack.jpg'></img>`
    case 'B/R': //Black/Red
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridBlackRed.jpg'></img>`
    case 'R/G': //Red/Green
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridRedGreen.jpg'></img>`
    case 'G/W': //Green/White
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridGreenWhite.jpg'></img>`
    case 'W/B': //White/Black
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridWhiteBlack.jpg'></img>`
    case 'U/R': //Blue/Red
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridBlueRed.jpg'></img>`
    case 'B/G': //Black/Green
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridBlackGreen.jpg'></img>`
    case 'R/W': //Red/White
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridRedWhite.jpg'></img>`
    case 'G/U': //Green/Blue
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridGreenBlue.jpg'></img>`

    //Hybrid Mana with Generic
    case '2/W': //White
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridGenericWhite.jpg'></img>`
    case '2/U': //Blue
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridGenericBlue.jpg'></img>`
    case '2/B': //Black
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridGenericBlack.jpg'></img>`
    case '2/R': //Red
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridGenericRed.jpg'></img>`
    case '2/G': //Green
      return `<img className='testStringImage' src='../../images/manaSymbols/hybridGenericGreen.jpg'></img>`


    //General Symbols
    case 'T': //Tap Symbol
      return `<img className='testStringImage' src='../../images/manaSymbols/tapSymbol.jpg'></img>`
    case 'Q': //Untap Symbol
      return `<img className='testStringImage' src='../../images/manaSymbols/untapSymbol.jpg'></img>`
    default:
      return '';
  }
}

const curateOracleText = (oracleText) => {
  let newString = '';
  for(let i=0; i<oracleText.length; i++){
    if(oracleText[i] === '{'){ //We find an opening bracket
      // currentIndex++;
      let nextCharSymbol = findSymbol(oracleText[i + 1]); //Look at the next char and see what symbol it is
      let charSymbolAfterThat = findSymbol(oracleText[i + 2]) //Check for Hybrid Mana and Phyrexian Mana
      if(charSymbolAfterThat !== '/'){ //It's a standard symbol, not hybrid or Phyrexian
        newString += nextCharSymbol;
        i = i + 1; //Increment i by 1 since we skipped the '{' character
        continue;
      } else { //It is Hybrid or Phyrexian
        let finalCharSymbol = findSymbol(`${oracleText[i + 1]}${oracleText[i + 2]}${oracleText[i + 3]}`); //This would be the 'P' in {B/P} for black phyrexian mana
        newString += finalCharSymbol;
        i = i + 3;
        continue;
      }
      //Put conditionals here for hybrid mana
    } else if(oracleText[i] === '}'){ //We find a closing bracket
      continue; //move on to the next character
    }
    //If we aren't looking at '{' or '}' characters or the characters in between those
    newString += oracleText[i];
  }
  // setFrontOracleText(newString);
  return newString;
}


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
async function getCardData(colorsArrayForAPICall, setsStringForAPICall, setShortHand, dispatch, actionType) {
    // console.log('colorsArrayForAPICall from click:');
    // console.log(colorsArrayForAPICall);
    // console.log(`dispatch variable in actions.js line 75: ${dispatch}`);
    console.log(`card API in progress`);
    let apiURLInsert = createApiURL(colorsArrayForAPICall);
    try{
        let response = await fetch(`https://api.scryfall.com/cards/search?&q=${setsStringForAPICall}+${apiURLInsert}`);
        //=========================================
        //          More API call Examples
        //=========================================
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=set%3Athb+${apiURLInsert}`);
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=${setsForApiPull}+c%3AC+-t%3AL`);
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=c%3AC+${setsForApiPull}+-t%3Aland`);
        
        //below: purely white cards, no boros etc.
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=set%3Athb+c%3Aw+-c%3Au+-c%3Ab+-c%3Ar+-c%3Ag`);
        
        //below: Colorless, type not equal to lands.
        // let response = await fetch(`https://api.scryfall.com/cards/search?&q=set%3Athb+id%3A${apiURLInsert}+-t%3AL`);
        //End of examples

        let cardObjects = await response.json();

        //=====================================================
        //                      If no Results
        //=====================================================
        //if we sucessfully connect to and hear back from the API, but it didn't have any results for us, we need to do a special dispatch
        //the returned object will look like below and mimics what we'd normally return so as to not cause errors with the .filter() array in the render() function of our Home.js component
        /* {object: "error", code: "not_found", status: 404, details: "Your query didn’t match any cards. Adjust your sea…ntax guide at https://scryfall.com/docs/reference"} */
        if(cardObjects.object === 'error') {
            // console.log('sucessfully triggered an error response from API');
            let errorCardObject =
                [
                    {
                    name: "No Cards Found",
                    image_uris: { border_crop: "https://i.imgur.com/Qx6AMQQ.jpg" },
                    }
                ]
            dispatch(noResultsDispatch(errorCardObject, actionType))
        } else {
            cards = cardObjects.data;
            if(cardObjects.has_more === true) { //if there are more than 175 results
                setTimeout(() => {
                    let pagURL = cardObjects.next_page;
                    getCardDataPagination(dispatch, actionType, pagURL, setsStringForAPICall, setShortHand) //call the API fetch() function 
                }, 100); //Scryfall API documentation asks for 100 ms break between calls
            } else {
                //Loop thru the cards objects and parse the card text
                for(let eachCard of cards){
                  if(eachCard.oracle_text){
                    eachCard.oracle_text = curateOracleText(eachCard.oracle_text);
                  }
                  if(eachCard.card_faces){ //If it's a flip card
                    for(let eachFace of eachCard.card_faces){
                      if(eachFace.oracle_text){
                        eachFace.oracle_text = curateOracleText(eachFace.oracle_text);
                      }
                    }
                  }
                }
                // if(props.oracle_text){
                //   console.log('in first conditional')
                //   curateOracleText(props.oracle_text, setFrontOracleText);
                // }

                console.log('cards before final dispatch:');
                console.log(cards);
                //We are done calling the Api for cards, now we can look at setsStringForAPICall and determine what string we need to update 
                //the global state with for the header and card container backgrounds.
                dispatch(executeDispatch(actionType, cards, setsStringForAPICall, setShortHand));
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
async function getCardDataPagination(dispatch, actionType, pagURL, setsStringForAPICall, setShortHand, isLoading) {
    try{
        let response = await fetch(pagURL);
        let cardObjects = await response.json();
        // console.log('card objects sucessfully pulled from API:');
        // console.log(cardObjects);
        cards = cards.concat(cardObjects.data); //this is at minimum our 2nd call for cards so we need to concat onto earlier array
        if(cardObjects.has_more === true) {
            setTimeout(() => {
            let pagURL = cardObjects.next_page;
            getCardDataPagination(dispatch, actionType, pagURL, setsStringForAPICall, setShortHand) //call the API fetch() function 
            }, 100);
        } else {
            // console.log('cards before final dispatch:');
            // console.log(cards);
            dispatch(executeDispatch(actionType, cards, setsStringForAPICall, setShortHand));
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

function createApiURL(arrayOfColors){
    let stringForAPIURL = '';
    let wubrgArray = ['W', 'U', 'B', 'R', 'G'];
    if(arrayOfColors[0] !== 'C' || arrayOfColors[0] !== 'L'){
        stringForAPIURL = 'c%3A'; //set this up to pull colors
        for (let eachColorToPull of arrayOfColors){
            stringForAPIURL = stringForAPIURL + `${eachColorToPull}`; //add each color the user selected
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
    }

    //=============================================
    //             Lands and Colorless
    //=============================================
    if(arrayOfColors[0] === 'C'){
        stringForAPIURL = 'c%3Ac+-t%3Aland'; //set this up to pull colorless cards minus lands that produce colorless mana
    }
    if(arrayOfColors[0] === 'L'){
        stringForAPIURL = 't%3Aland';
    }
    return stringForAPIURL;
}


// function getSetShorthand(setStringFromUsers) {
//     console.log(`In our getSetShortHandFunction: ${setStringFromUsers}`);
//     return setStringFromUsers;
// }

