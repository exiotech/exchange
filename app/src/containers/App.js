/* eslint-disable no-undef */

import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        alo
      </div>
    )
  }
}

export default drizzleConnect(
    withRouter(App),
);
