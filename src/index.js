import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware,  compose} from 'redux';
import thunk from 'redux-thunk'; //for executing asyncronous API calls
import reducer from './store/reducers/reducer';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//import layouts
import BaseLayout from './components/layouts/BaseLayout';

// import TestComponent from './components/SetSearchTest'
// import TestComponent from './components/ApiTest';
import Home from './components/Home'

//compose lets us use multiple enhances
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BaseLayout>
          <Switch>
                <Route path="/" component={Home} />
          </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


