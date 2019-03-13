import React from 'react';
import ReactDOM from 'react-dom';
import { Drizzle, generateStore } from "drizzle";

import App from './App';
import drizzleOption from './drizzleOptions.js'

// setup the drizzle store and drizzle
const drizzleStore = generateStore(drizzleOption);
const drizzle = new Drizzle(drizzleOption, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));
