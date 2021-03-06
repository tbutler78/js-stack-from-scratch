// @flow

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
// thunkMiddleWare, {thunk} and { thunkMiddleware } didn't work}
import thunk from 'redux-thunk';

import Immutable from 'immutable';
import $ from 'jquery';
import Tether from 'tether';
import setUpSocket from './socket';

import App from '../shared/app';
import helloReducer from '../shared/reducer/hello';
import { APP_CONTAINER_SELECTOR, JSS_SSR_SELECTOR } from '../shared/config';
import { isProd } from '../shared/util';

window.jQuery = $;
window.Tether = Tether;
require('bootstrap');

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const preloadedState = window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */
const store = createStore(
  combineReducers({ hello: helloReducer }),
  { hello: Immutable.fromJS(preloadedState.hello) },

  composeEnhancers(applyMiddleware(thunk)),
);
// flow-disable-next-line
const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);
const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
);

// flow-disable-next-line
ReactDOM.render(wrapApp(App, store), rootEl);

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/app').default;
    // flow-disable-next-line
    ReactDOM.render(wrapApp(NextApp, store), rootEl);
  });
}

const jssServerSide = document.querySelector(JSS_SSR_SELECTOR);
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide);
/**
 * Before adding hot-loader
 * ReactDOM.render(<App />, document.querySelector(APP_CONTAINER_SELECTOR));

 Before introducing React
 document.querySelector(APP_CONTAINER_SELECTOR).innerHTML =
 '<h1>Hello Webpack! Love, nodejs</h1>';
 */
setUpSocket(store);
