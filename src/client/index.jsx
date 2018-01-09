// @flow

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import setUpSocket from './socket';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// thunkMiddleWare, {thunk} and { thunkMiddleware } didn't work}
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import Immutable from 'immutable';
import App from '../shared/app';
import helloReducer from '../shared/reducer/hello';
import { APP_CONTAINER_SELECTOR } from '../shared/config';
import { isProd } from '../shared/util';

const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(combineReducers(
  { hello: helloReducer }),
  { hello: Immutable.fromJS(preloadedState.hello)},

  composeEnhancers(applyMiddleware(thunk)))

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);
const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={reduxStore}>
  <BrowserRouter>
  <AppContainer>
    <AppComponent />
  </AppContainer>
  </BrowserRouter>
  </Provider>

ReactDOM.render(wrapApp(App, store), rootEl);

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/app', () => {

    const NextApp = require('../shared/app').default;
    ReactDOM.render(wrapApp(NextApp, store), rootEl);
  });
}
/**
 * Before adding hot-loader
 * ReactDOM.render(<App />, document.querySelector(APP_CONTAINER_SELECTOR));

 Before introducing React
 document.querySelector(APP_CONTAINER_SELECTOR).innerHTML =
 '<h1>Hello Webpack! Love, nodejs</h1>';
 */
setUpSocket(store);