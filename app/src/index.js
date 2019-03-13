import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
// import { Drizzle, generateStore } from "drizzle";
import { generateContractsInitialState } from 'drizzle'

import Root from './containers/Root'
import configureStore from './store/configureStore'
import drizzleOptions from './drizzleOptions.js'

const preloadedState = {
  contracts: generateContractsInitialState(drizzleOptions)
}

const store = configureStore(preloadedState)

ReactDOM.render(
  <Router>
    <Root drizzleOptions={drizzleOptions} store={store}/>
  </Router>,
  document.getElementById('root')
);
