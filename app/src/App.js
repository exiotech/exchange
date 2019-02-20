import React, { Component } from 'react';
import logo from './exio.png';
import './App.css';

import { tokens } from './data.json';
import ReadOwner from "./ReadOwner";
import SetOwner from "./SetOwner";
import Baner from "./components/menu/Baner";
import Deposit from "./components/Deposit";
import Balance from "./components/Balance";
import Withdraw from "./components/Withdraw";
import DepositToken from "./components/DepositToken";
import WithdrawToken from "./components/WithdrawToken";
import Order from "./components/Order";

class App extends Component {
  state = { loading: true, drizzleState: null, tokenAddress: tokens[0].address };

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
        <ReadOwner
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <SetOwner
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <br />
        <section>
          <Deposit drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
        </section>
        <br />
        <section>
          <Balance drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} address="0x0"/>
        </section>
        <br />
        <section>
          <Withdraw drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
        </section>
        <br />
        <section>
          <DepositToken drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} address={this.state.tokenAddress} />
        </section>
        <br />
        <section>
          <Balance drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} address={this.state.tokenAddress} />
        </section>
        <br />
        <section>
          <WithdrawToken drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} address={this.state.tokenAddress} />
        </section>
        <br />
        <section>
          <Order drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} address={this.state.tokenAddress} />
        </section>
        <script src="https://unpkg.com/react/umd/react.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true" />
      </div>
    );
  }
}

export default App;
