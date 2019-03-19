import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

import logo from '../exio.png';
import { tokens } from '../data.json';
import Baner from "../components/menu/Baner";
import Balances from "../components/Balances";
import Transaction from "../components/Transaction";
import Orders from "../components/Orders";

class App extends Component {
  static contextTypes = {
    drizzle: PropTypes.object
  }

  constructor(props, context) {
    super(props)
    this.state = {
      isLoading: false,
      drizzleState: null,
      tokenAddress: tokens[0].address
    };
  }

  componentDidMount() {
    const { store } = this.props;

    this.unsubscribe = store.subscribe(() => {
      const drizzleState = store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ isLoading: true, drizzleState });
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
    if(!this.state.isLoading) return 'Loading...'
    return (
      <div className="App">
        <Baner drizzle={this.context.drizzle} logo={logo} onSelectToken={this.handleTokenAddress} />
        <br />
        <section>
          <Balances drizzle={this.context.drizzle} tokenAddress={this.state.tokenAddress}/>
        </section>
        {/*<br />
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

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
  }
}

export default drizzleConnect(
    withRouter(App),
    mapStateToProps,
);
