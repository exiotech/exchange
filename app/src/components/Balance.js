import React from "react";

class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKey: null
    };
  }

  componentDidMount() {
    const { drizzle, drizzleState, address } = this.props;
    const contract = drizzle.contracts.ExioExChange;
    
    const dataKey = contract.methods["balanceOf"].cacheCall(address, drizzleState.accounts[0]);
    // let drizzle know we want to watch the `myString` method

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  componentDidUpdate(oldProps) {
    const { drizzle, drizzleState, address } = this.props;
    if (address === oldProps.address) {
      return;
    }
    const contract = drizzle.contracts.ExioExChange;

    const dataKey = contract.methods["balanceOf"].cacheCall(address, drizzleState.accounts[0]);
    // let drizzle know we want to watch the `myString` method

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { ExioExChange } = this.props.drizzleState.contracts;
    const { web3 } = this.props.drizzle;
    const { address } = this.props;

    // using the saved `dataKey`, get the variable we're interested in
    let balance = ExioExChange.balanceOf[this.state.dataKey];
    if(address === '0x0')
      balance = balance && web3.utils.fromWei(balance.value);
    else
      balance = balance && balance.value;
    // if it exists, then we display its value
    return <p>Account Deposit Token: {balance}</p>;
  }
}

export default Balance;
