import React from "react";
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap';

import { precisionRound } from '../../utils';
import Balance from "../Balance";
import Deposit from "../Deposit";
import DepositToken from "../DepositToken";
import Withdraw from "../Withdraw";
import WithdrawToken from "../WithdrawToken";

class Content extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  static propTypes = {
    accounts: PropTypes.object.isRequired,
    contracts: PropTypes.object.isRequired,
    currentToken: PropTypes.object.isRequired,
  }

  state = { dataKey: null, balance: 0, };

  componentDidMount() {
    this.getBalance(this.props.tokenAddress).then(bal => {
      this.setState({balance: (bal / 1000000000000000000).toFixed(2)});
    });
  }

  getBalance = async (address) => {
    return await this.context.drizzle.web3.eth.getBalance(this.props.accounts[0]);
  }

  render() {
    const { tab } = this.props;
    let input1, input2;

    if(tab === 'deposit') {
      input1 = <DepositToken />;
      input2 = <Deposit />;
    } else if(tab === 'withdraw') {
      input1 = <WithdrawToken />;
      input2 = <Withdraw />;
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
            <td>{this.props.currentToken.name}</td>
            <td>{precisionRound(this.props.currentToken.balance, 2).toFixed(2)}</td>
            <td><Balance tokenAddress={this.props.currentToken.address} /></td>
          </tr>
          <tr>
            <td colSpan="3">{input1}</td>
          </tr>
          <tr>
            <td>ETH</td>
            <td>{this.state.balance}</td>
            <td><Balance tokenAddress='0x0' /></td>
          </tr>
          <tr>
            <td colSpan="3">{input2}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    contracts: state.contracts,
    currentToken: state.currentToken,
  }
}

export default drizzleConnect(
    withRouter(Content),
    mapStateToProps,
);
