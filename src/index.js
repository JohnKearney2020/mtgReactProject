import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware,  compose} from 'redux';
import thunk from 'redux-thunk'; //for executing asyncronous API calls
import reducer from './store/reducers/reducer';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//import layouts
import BaseLayout from './components/layouts/BaseLayout';

import Home from './components/Home';

import './index.css';

//compose lets us use multiple enhances
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BaseLayout>
          <Switch>
                <Route path="/" component={Home} />
                <Redirect to="/" />
          </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


