import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

import actions from '../../actions';
import { tokens } from '../../data.json';

class TokenContainer extends Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  constructor(props, context) {
    super(props)
    this.state = {

    };
  }

  componentDidMount() {
    this.addTokenContract();
    this.props.setTokenName(this.findTokenName(this.props.currentToken.address));
  }

  componentDidUpdate(oldProps) {
    if (this.props.currentToken.address === oldProps.currentToken.address) {
      return;
    }

    this.deleteTokenContract();
    this.addTokenContract();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getABI = (address) => {
    return tokens.find(token => {
      return token.address === address;
    }).abi;
  }

  findTokenName = (address) => {
    return tokens.find(token => {
      return token.address === address;
    }).name
  }

  addTokenContract = () => {
    const abi = this.getABI(this.props.currentToken.address);

    const contractConfig = {
      contractName: 'TokenContract',
      web3Contract: new this.context.drizzle.web3.eth.Contract(abi, this.props.currentToken.address)
    }
    const events = ['Transfer', 'Approval'];
    this.context.drizzle.addContract(contractConfig, events);
  }

  deleteTokenContract = () => {
    this.context.drizzle.deleteContract('TokenContract');
  }

  render() {
    console.log('ACTIONS', actions)
    console.log('THIS.PROPS', this.props)
    console.log('THIS.CONTEXT.DRIZZLE', this.context.drizzle)
    return (<span></span>);
  }
}

const mapStateToProps = (state) => {
    return {
      currentToken: state.currentToken,
      accounts: state.accounts,
      contracts: state.contracts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setTokenName: (name) => dispatch(actions.setTokenName(name)),
    };
};

export default drizzleConnect(
    withRouter(TokenContainer),
    mapStateToProps,
    mapDispatchToProps,
);
