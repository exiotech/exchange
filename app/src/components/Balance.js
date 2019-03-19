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
    const { drizzle, address, accounts } = this.props;
    const contract = drizzle.contracts.ExioExChange;

    const dataKey = contract.methods["balanceOf"].cacheCall(address, accounts[0]);
    // let drizzle know we want to watch the `myString` method

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  componentDidUpdate(oldProps) {
    const { drizzle, address, accounts } = this.props;
    if (address === oldProps.address) {
      return;
    }
    const contract = drizzle.contracts.ExioExChange;

    const dataKey = contract.methods["balanceOf"].cacheCall(address, accounts[0]);
    // let drizzle know we want to watch the `myString` method

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { ExioExChange } = this.props.contracts;
    const { web3 } = this.props.drizzle;
    const { address } = this.props;

    // using the saved `dataKey`, get the variable we're interested in
    let balance = ExioExChange.balanceOf[this.state.dataKey];
    if(address === '0x0') {
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
