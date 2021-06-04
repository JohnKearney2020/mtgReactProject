import * as actionTypes from '../actions/actionTypes';

const intitialState = {
    cards: [],
    setForBackgrounds: "DEFAULT",
    isLoading: "hideLoading",
    showContentPolicy: "showContentPolicy"
}

const reducer = (state = intitialState, action) => {

    switch (action.type){
        case actionTypes.GETCARDS:
            return {
                ...state,
                cards: action.cardsToPassToGlobalState,
                setForBackgrounds: action.setShorthandForBackgrounds,
                isLoading: action.isLoading
            }
        case actionTypes.NORESULTS:
            return {
                ...state,
                cards: action.fakeCardObjectNoResults,
                isLoading: action.isLoading
            }
        case actionTypes.ISLOADING:
            return {
                ...state,
                isLoading: "showLoading"
            }
        case actionTypes.SHOWCONTENTPOLICY:
            return {
                ...state,
                showContentPolicy: "hideContentPolicy"
            }
        default:
            return state;
    }
}

export default reducer;



















// const reducer = (state = intitialState, action) => {
//     let concatColorTest = '';
//     // let lastColors = [];
//     switch (action.type){
//         case actionTypes.WHITE:
//             // lastColors = lastColors.concat(state.colorsSelected); //the colors pre click
//             // lastColors = lastColors.concat(action.colorClicked); //plus the color post click
//             // console.log('last colors + new clicked color:');
//             // console.log(lastColors);
//             // console.log('cards sent to the reducer:');
//             // console.log(action.cards);
//             // console.log('cards in the current state');
//             // console.log(state.cards);
//             // concatColorTest = colorTest(action.colorClicked, state.colorsSelected);
            
//             return {
//                 ...state,
//                 // colorsSelected: state.colorsSelected.concat('white'),
//                 // colorsSelected: state.colorsSelected.concat(action.colorsForState),
//                 colorsSelected: action.colorsForState,
//                 // cards: state.cards.concat(testArray)
//                 // cards: state.cards.concat(action.cards)
//                 cards: action.cards
//             }
//         case actionTypes.BLUE:
//             // concatColorTest = colorTest(action.colorsForState, state.colorsSelected);
//             console.log('blue case triggered');
//             return {
//                 ...state,
//                 // colorsSelected: state.colorsSelected.concat('white'),
//                 // colorsSelected: state.colorsSelected.concat(action.colorsForState),
//                 colorsSelected: action.colorsForState,
//                 // cards: state.cards.concat(testArray)
//                 // cards: state.cards.concat(action.cards)
//                 cards: action.cards
//             }

//         default:
//             return state;
//     }
// }

// export default reducer;

// function colorTest(colorClicked, currentColorState){
//     // console.log(`see if this executes asynchronously: ${color}`);
//     let checkColorStateArray = [...currentColorState];
//     for (let eachColor of checkColorStateArray){
//         if(eachColor.includes(colorClicked)){
//             // console.log(`${colorClicked} is in the current color state`);
//         }
//     }

//     let newColorStateArray = checkColorStateArray.filter((eachColor) => {
//         // console.log(`eachColor: ${eachColor}, colorClicked: ${colorClicked}`);
//         return eachColor != colorClicked;
//     })
//     // console.log('checkColorStateArray:');
//     // console.log(checkColorStateArray);
//     // console.log('newColorStateArray');
//     // console.log(newColorStateArray);
//     // return 'green';
//     return colorClicked;

// }


// async function determineColorState(color, dispatch, cards) {
//     try{
//         let response = await fetch('https://api.scryfall.com/cards/search?&q=set%3Athb+c%3Awhite');
//         let cardObjects = await response.json();
//         console.log('card objects pulled from API:');
//         console.log(cardObjects);
//         cards = cards.concat(cardObjects.data)
//         dispatch(executeDispatch(color, cards));
//         return cardObjects;
//     } catch(err){
//         console.log('Fetch call to Scryfall API failed :(');
//         console.error(err);
//     }
// }