import React from "react";
import { Table } from 'react-bootstrap';

import { tokens } from '../../data.json';
import Balance from "../Balance";
import Deposit from "../Deposit";
import DepositToken from "../DepositToken";
import Withdraw from "../Withdraw";
import WithdrawToken from "../WithdrawToken";

class Content extends React.Component {
  state = { dataKey: null, balance: 0, tokenBalanceKey: null, tokenBalance: null };

  findTokenName = (address) => {
    return tokens.find(token => {
      return token.address === address;
    }).name
  }

  getBalance = async (address) => {
    const { web3 } = this.props.drizzle;
    const { drizzleState } = this.props;

    const balance = await web3.eth.getBalance(drizzleState.accounts[0]);

    return balance;
  }

  getTokenBalance = async (key) => {
    if(this.props.drizzleState.contracts.TokenContract) {
      const balanceInterval = setInterval(async () => {
        let bal = this.props.drizzleState.contracts.TokenContract.balanceOf[key];

        if(bal) {
          this.setState({ tokenBalance: bal.value });
          clearInterval(balanceInterval);
        }
      }, 100);
    }
  }

  componentDidMount() {
    this.getBalance(this.props.tokenAddress).then(bal => {
      this.setState({balance: (bal / 1000000000000000000).toFixed(2)});
    });

    const intervalID = setInterval(async () => {
      if(this.props.drizzle.contracts.TokenContract) {
        const contract = this.props.drizzle.contracts.TokenContract;
        const balance = contract.methods["balanceOf"].cacheCall(this.props.drizzleState.accounts[0]);

        this.setState({ tokenBalanceKey: balance });
        await this.getTokenBalance(balance);
        clearInterval(intervalID);
      }
    }, 100);

  }

  componentDidUpdate(prevProps) {
    const { drizzle, drizzleState, tokenAddress } = this.props;
    if ((tokenAddress !== prevProps.tokenAddress)) {
      const contract = drizzle.contracts.TokenContract;

      const balance = contract.methods["balanceOf"].cacheCall(drizzleState.accounts[0]);
      // let drizzle know we want to watch the `myString` method

      // save the `dataKey` to local component state for later reference
      this.setState({ tokenBalanceKey: balance });
      this.getTokenBalance(balance);
    }
    return;
  }

  render() {
    const {drizzle, tokenAddress, tab } = this.props;
    let input1, input2;

    if(tab === 'deposit') {
      input1 = <DepositToken drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} address={tokenAddress} />;
      input2 = <Deposit drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />;
    } else if(tab === 'withdraw') {
      input1 = <WithdrawToken drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} address={tokenAddress} />;
      input2 = <Withdraw drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />;
    } else {
      console.log(tab);
    }

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Token</th>
            <th>Wallet</th>
            <th>ExioExChange</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.findTokenName(tokenAddress)}</td>
            <td>{this.state.tokenBalance}</td>
            <td><Balance drizzle={drizzle} drizzleState={this.props.drizzleState} address={tokenAddress} /></td>
          </tr>
          <tr>
            <td colSpan="3">{input1}</td>
          </tr>
          <tr>
            <td>ETH</td>
            <td>{this.state.balance}</td>
            <td><Balance drizzle={drizzle} drizzleState={this.props.drizzleState} address='0x0' /></td>
          </tr>
          <tr>
            <td colSpan="3">{input2}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default Content;
