import React from 'react'
import PropTypes from 'prop-types'
import { DrizzleProvider } from 'drizzle'
// import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route } from 'react-router-dom'

import App from './App'
import UserPage from './UserPage'
import RepoPage from './RepoPage'

const Root = ({ store }) => (
  <DrizzleProvider store={store}>
    <div>
      <Route path="/" component={App} />
      <Route path="/:login/:name"
             component={RepoPage} />
      <Route path="/:login"
             component={UserPage} />
      <DevTools />
    </div>
  </DrizzleProvider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
