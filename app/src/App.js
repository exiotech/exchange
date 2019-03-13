import React, { Component } from 'react';
import logo from './exio.png';
import './App.css';

import { tokens } from './data.json';
// import ReadOwner from "./ReadOwner";
// import SetOwner from "./SetOwner";
import Baner from "./components/menu/Baner";
import Balances from "./components/Balances";
import Transaction from "./components/Transaction";
import Orders from "./components/Orders";
// import Table from "./components/Balance/Table";

class App extends Component {
  state = {
    loading: true,
    drizzleState: null,
    tokenAddress: tokens[0].address
  };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
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
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <Baner drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} logo={logo} onSelectToken={this.handleTokenAddress} />
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
        </section>
        <script src="https://unpkg.com/react/umd/react.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true" />
      </div>
    );
  }
}

export default App;
