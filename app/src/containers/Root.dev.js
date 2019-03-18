import React from 'react'
import { DrizzleProvider } from 'drizzle-react'
import { BrowserRouter } from 'react-router-dom'
import { generateContractsInitialState } from 'drizzle'

import App from './App'
import configureStore from '../store/configureStore'
import drizzleOptions from '../drizzleOptions.js'

const preloadedState = {
  contracts: generateContractsInitialState(drizzleOptions)
}

const store = configureStore(preloadedState)

const Root = () => (
  <DrizzleProvider options={drizzleOptions} store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DrizzleProvider>
)

export default Root
