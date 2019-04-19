import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';
import { withRouter } from 'react-router-dom';

import actions from '../actions';
// import logo from '../exio.png';
import { tokens } from '../consts/data.json';
import TokenContainer from "./TokenContainer";
// import ExioExChangeContainer from "./ExioExChangeContainer";
// import Baner from "../components/menu/Baner";
// import Balances from "../components/Balances";
// import Transaction from "../components/Transaction";
// import Orders from "../components/Orders";

class App extends Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  constructor(props, context) {
    super(props)
    this.state = {
      isLoading: false,
      drizzleState: null,
    };

    this.props.setErc20TokenAddress(tokens[0].address);
  }

  componentWillMount() {
    // this.props.setErc20TokenAddress('0xA63B377BA262c0C0708AbbE125b1b345a9391Cd7');
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
        {/*<ExioExChangeContainer />
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
        </section>*/}
        <script src="https://unpkg.com/react/umd/react.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" crossOrigin="true" />
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentToken: state.currentToken,
    erc20Token: state.erc20Token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setErc20TokenAddress: (address) => dispatch(actions.setErc20TokenAddress(address)),
    setTokenAddress: (address) => dispatch(actions.setTokenAddress(address)),
  };
};

export default drizzleConnect(
  withRouter(App),
  mapStateToProps,
  mapDispatchToProps,
);
