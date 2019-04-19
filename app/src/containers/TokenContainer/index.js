import { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

import actions from '../../actions';

class TokenContainer extends Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  constructor(props, context) {
    super(props)
    this.state = {
      keys: {
        name: null,
      }
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentDidUpdate(oldProps) {
    if (this.props.erc20Token.abi !== oldProps.erc20Token.abi && oldProps.erc20Token.abi == null) {
      this._addTokenContract();
    }

    if (this.props.erc20Token.abi !== oldProps.erc20Token.abi && oldProps.erc20Token.abi != null) {
      this._deleteTokenContract();
      this._addTokenContract();
    }

    if(!this.context.drizzle.contracts.hasOwnProperty('ERC20Token'))
      return;

    let totalSupply = this.context.drizzle.contracts.ERC20Token.methods.totalSupply.cacheCall();
    let symbol = this.context.drizzle.contracts.ERC20Token.methods.symbol.cacheCall();
    let name = this.context.drizzle.contracts.ERC20Token.methods.name.cacheCall();
    let decimals = this.context.drizzle.contracts.ERC20Token.methods.decimals.cacheCall();
    totalSupply = this.props.contracts.ERC20Token.totalSupply[totalSupply] ? this.props.contracts.ERC20Token.totalSupply[totalSupply].value : null;
    symbol = this.props.contracts.ERC20Token.symbol[symbol] ? this.props.contracts.ERC20Token.symbol[symbol].value : null;
    name = this.props.contracts.ERC20Token.name[name] ? this.props.contracts.ERC20Token.name[name].value : null;
    decimals = this.props.contracts.ERC20Token.decimals[decimals] ? this.props.contracts.ERC20Token.decimals[decimals].value : null;

    if(this.props.erc20Token.totalSupply !== totalSupply)
      this.props.setErc20TokenTotalSupply(totalSupply);

    if(this.props.erc20Token.symbol !== symbol)
      this.props.setErc20TokenSymbol(symbol);

    if(this.props.erc20Token.name !== name)
      this.props.setErc20TokenName(name);

    if(this.props.erc20Token.decimals !== decimals)
      this.props.setErc20TokenDecimals(decimals);

    return;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _addTokenContract = () => {
    const { erc20Token } = this.props;

    const contractConfig = {
      contractName: 'ERC20Token',
      web3Contract: new this.context.drizzle.web3.eth.Contract(JSON.parse(erc20Token.abi), erc20Token.address)
    }
    const events = ['Transfer', 'Approval'];
    this.context.drizzle.addContract(contractConfig, events);
  }

  _deleteTokenContract = () => {
    this.context.drizzle.deleteContract('ERC20Token');
  }

  render() {
    return (null);
  }
}

const mapStateToProps = (state) => {
    return {
      accounts: state.accounts,
      contracts: state.contracts,
      erc20Token: state.erc20Token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setErc20TokenTotalSupply: (totalSupply) => dispatch(actions.setErc20TokenTotalSupply(totalSupply)),
      setErc20TokenSymbol: (symbol) => dispatch(actions.setErc20TokenSymbol(symbol)),
      setErc20TokenName: (name) => dispatch(actions.setErc20TokenName(name)),
      setErc20TokenDecimals: (decimals) => dispatch(actions.setErc20TokenDecimals(decimals)),
    };
};

export default drizzleConnect(
    withRouter(TokenContainer),
    mapStateToProps,
    mapDispatchToProps,
);
