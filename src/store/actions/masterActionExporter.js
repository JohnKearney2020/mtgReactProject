//whenever an action is dispatched, we can point it to this file
//this will be done mostly in various 'mapDispatchToProps' functions in each container 
export {
    getCards,
    noResultsDispatch,
    showLoadingWheelDispatch
    // showContentPolicyDispatch //this doesn't seem to work b/c it's dispatched is called in a functional component, unlike the clas
    // based components the others are called in using mapDispatchToProps
} from './actions';