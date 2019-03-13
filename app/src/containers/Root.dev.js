import React from 'react'
import PropTypes from 'prop-types'
import { DrizzleProvider } from 'drizzle-react'
import { Route } from 'react-router-dom'

import App from './App'

const Root = ({ store, drizzleOptions }) => (
  <DrizzleProvider options={drizzleOptions} store={store}>
    <div>
      <Route path="/" component={App} />
    </div>
  </DrizzleProvider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
