import React from "react";

class Balance extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ExioExChange;

    const dataKey = contract.methods["balanceOf"].cacheCall('0x0', drizzleState.accounts[0]);
    // let drizzle know we want to watch the `myString` method

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { ExioExChange } = this.props.drizzleState.contracts;
    const { web3 } = this.props.drizzle;

    // using the saved `dataKey`, get the variable we're interested in
    let eth = ExioExChange.balanceOf[this.state.dataKey];
    eth = eth && web3.utils.fromWei(eth.value);
    // if it exists, then we display its value
    return <p>Account Deposit ETH: {eth}</p>;
  }
}

export default Balance;
