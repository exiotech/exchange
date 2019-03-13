import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
// import { Drizzle, generateStore } from "drizzle";
import { generateContractsInitialState } from 'drizzle'

import Root from './containers/Root'
import configureStore from './store/configureStore'

// import App from './App';
import drizzleOption from './drizzleOptions.js'

// setup the drizzle store and drizzle
// const drizzleStore = generateStore(drizzleOption);
// const drizzle = new Drizzle(drizzleOption, drizzleStore);

const preloadedState = {
   contracts: generateContractsInitialState(drizzleOption)
 }

const store = configureStore(preloadedState)

ReactDOM.render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);
