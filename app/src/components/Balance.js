import React from "react";
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKey: null
    };
  }

  componentDidMount() {
    const { drizzle, tokenAddress, accounts } = this.props;
    const { ExioExChange } = drizzle.contracts;

    const dataKey = ExioExChange.methods["balanceOf"].cacheCall(tokenAddress, accounts[0]);
    // let drizzle know we want to watch the `myString` method

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  componentDidUpdate(oldProps) {
    const { drizzle, tokenAddress, accounts } = this.props;
    if (tokenAddress === oldProps.tokenAddress) {
      return;
    }
    const { ExioExChange } = drizzle.contracts;

    const dataKey = ExioExChange.methods["balanceOf"].cacheCall(tokenAddress, accounts[0]);
    // let drizzle know we want to watch the `myString` method

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { ExioExChange } = this.props.contracts;
    const { web3 } = this.props.drizzle;
    const { tokenAddress } = this.props;

    // using the saved `dataKey`, get the variable we're interested in
    let balance = ExioExChange.balanceOf[this.state.dataKey];
    if(tokenAddress === '0x0') {
      balance = balance && parseInt(web3.utils.fromWei(balance.value)).toFixed(2);
    }
    else
      balance = balance && balance.value;
    // if it exists, then we display its value
    return (<span>{balance}</span>);
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    contracts: state.contracts,
  }
}
export default drizzleConnect(
    withRouter(Balance),
    mapStateToProps,
);
