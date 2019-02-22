import React from "react";
import { Table } from 'react-bootstrap';

import { tokens } from '../../data.json';
import Balance from "../Balance";
import Deposit from "../Deposit";
import DepositToken from "../DepositToken";
import Withdraw from "../Withdraw";
import WithdrawToken from "../WithdrawToken";

class Content extends React.Component {
  state = { dataKey: null, balance: 0 };

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

  componentDidMount() {
    this.getBalance(this.props.tokenAddress).then(bal => {
      this.setState({balance: (bal / 1000000000000000000).toFixed(2)});
    });

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
            <td>{this.state.balance}</td>
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
