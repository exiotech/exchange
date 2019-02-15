import React, { Component } from 'react';
import logo from './exio.png';
import './App.css';

import ReadOwner from "./ReadOwner";
import SetOwner from "./SetOwner";
import Baner from "./components/menu/Baner";
import Deposit from "./components/Deposit";
import Balance from "./components/Balance";
import Withdraw from "./components/Withdraw";
import DepositToken from "./components/DepositToken";
import WithdrawToken from "./components/WithdrawToken";

class App extends Component {
  state = { loading: true, drizzleState: null };

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

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <Baner logo={logo} />
        <img src={logo} with="30" height="30" alt="" />
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
          <DepositToken drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
        </section>
        <br />
        <section>
          <Balance drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} address="0xAFC5cd00b63Cea23973FA85CD72Ab50B17Be8592" />
        </section>
        <br />
        <section>
          <WithdrawToken drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} address="0xAFC5cd00b63Cea23973FA85CD72Ab50B17Be8592" />
        </section>
        <script src="https://unpkg.com/react/umd/react.production.js" crossorigin />
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" crossorigin />
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin />
      </div>
    );
  }
}

export default App;
