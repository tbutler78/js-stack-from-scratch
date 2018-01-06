import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';
import { APP_CONTAINER_SELECTOR } from '../shared/config';

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);
const wrapApp = AppComponent => <AppContainer>
  <AppComponent />
</AppContainer>

ReactDOM.render(wrapApp(App), rootEl);

if (module.hot){
  // flow-disable-next-line
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    ReactDOM.render(wrapApp(NextApp), rootEl)
  })
}
/** 
* Before adding hot-loader 
* ReactDOM.render(<App />, document.querySelector(APP_CONTAINER_SELECTOR));

Before introducing React
document.querySelector(APP_CONTAINER_SELECTOR).innerHTML =
  '<h1>Hello Webpack! Love, nodejs</h1>';
*/
