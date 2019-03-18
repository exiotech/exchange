import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

import logo from '../exio.png';
import { tokens } from '../data.json';
import Baner from "../components/menu/Baner";
import Balances from "../components/Balances";
import Transaction from "../components/Transaction";
import Orders from "../components/Orders";

class App extends Component {
  state = {
    isLoading: false,
    drizzleState: null,
    tokenAddress: tokens[0].address
  };

  componentDidMount() {
    console.log(this.props, 'props');
    const { store } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = store.getState();
      console.log(drizzleState, 'drizzleState1');
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ isLoading: true, drizzleState });
        console.log(drizzleState, 'drizzleState');
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleTokenAddress = (address) => {
      this.setState({tokenAddress: address});
  }

  render() {
    console.log(this.state, 'state');
    if (!this.state.isLoading) return "Loading Drizzle...";
    return (
      <div className="App">
        {/*<Baner drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} logo={logo} onSelectToken={this.handleTokenAddress} />
        <br />
        <section>
          <Balances drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} tokenAddress={this.state.tokenAddress}/>
        </section>
        <br />
        <section>
          <Orders drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} tokenAddress={this.state.tokenAddress} />
        </section>
        <br />
        <section>
          <Transaction drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} tokenAddress={this.state.tokenAddress}/>
        </section>*/}
        <script src="https://unpkg.com/react/umd/react.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true" />
      </div>
    );
  }
}

export default drizzleConnect(
    withRouter(App),
);
