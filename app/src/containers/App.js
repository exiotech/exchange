import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

import actions from '../actions';
import logo from '../exio.png';
import { tokens } from '../data.json';
import TokenContainer from "./TokenContainer";
import Baner from "../components/menu/Baner";
import Balances from "../components/Balances";
import Transaction from "../components/Transaction";
import Orders from "../components/Orders";

class App extends Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  constructor(props, context) {
    super(props)
    this.state = {
      isLoading: false,
      drizzleState: null,
      tokenAddress: tokens[0].address
    };

    this.props.setTokenAddress(tokens[0].address);
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
    this.props.setTokenAddress(address);
    this.setState({tokenAddress: address});
  }

  render() {
    return (
      <div className="App">
        <TokenContainer />
        <Baner logo={logo} onSelectToken={this.handleTokenAddress} />
        <br />
        <section>
          <Balances />
        </section>
        <br />
        <section>
          <Orders />
        </section>
        <br />
        <section>
          <Transaction />
        </section>
        <script src="https://unpkg.com/react/umd/react.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentToken: state.currentToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTokenAddress: (address) => dispatch(actions.setTokenAddress(address)),
  };
};

export default drizzleConnect(
  withRouter(App),
  mapStateToProps,
  mapDispatchToProps,
);
