import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReadOwner from "./ReadOwner";
import SetOwner from "./SetOwner";
import Deposit from "./components/Deposit";

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
      </div>
    );
  }
}

export default App;
