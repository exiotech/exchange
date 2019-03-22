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
      balanceOfKey: null,
    };
  }

  componentDidMount() {
    this.addTokenContract();
    this.props.setTokenName(this.findTokenName(this.props.currentToken.address));

    const intervalID = setInterval(async () => {
      if(this.context.drizzle.contracts.TokenContract) {
        const { TokenContract } = this.context.drizzle.contracts;
        const balanceOfKey = TokenContract.methods["balanceOf"].cacheCall(this.props.accounts[0]);

        this.setState({ balanceOfKey });

        await this.getTokenBalance(balanceOfKey);

        clearInterval(intervalID);
      }
    }, 1);
  }

  componentDidUpdate(oldProps) {
    if (this.props.currentToken.address === oldProps.currentToken.address) {
      return;
    }

    this.deleteTokenContract();
    this.addTokenContract();

    const { TokenContract } = this.context.drizzle.contracts;
    const balanceOfKey = TokenContract.methods["balanceOf"].cacheCall(this.props.accounts[0]);

    this.setState({ balanceOfKey });
    this.getTokenBalance(balanceOfKey);
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

  getTokenBalance = async (key) => {
    if(this.props.contracts.TokenContract) {
      const balanceInterval = setInterval(async () => {
        let bal = this.props.contracts.TokenContract.balanceOf[key];

        if(bal) {
          this.props.setBalanceOfToken(parseInt(bal.value))
          clearInterval(balanceInterval);
        }
      }, 100);
    }
  }

  render() {
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
      setBalanceOfToken: (balance) => dispatch(actions.setBalanceOfToken(balance)),
    };
};

export default drizzleConnect(
    withRouter(TokenContainer),
    mapStateToProps,
    mapDispatchToProps,
);
