import React from "react";
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Table } from 'react-bootstrap';

import { tokens } from '../../data.json';

class Funds extends React.Component {
  state = { events: [] };

  findTokenName = (address) => {
    return tokens.find(token => {
      return token.address === address;
    }).name
  }

  componentDidMount() {
    // this.setState({ events: this.props.contracts.ExioExChange.events });
  }

  componentDidUpdate(prevProps) {
    if(this.props.contracts.ExioExChange.events === prevProps.contracts.ExioExChange.events)
      return;

    const event = this.props.contracts.ExioExChange.events[this.props.contracts.ExioExChange.events.length - 1];
    console.log(event);
    const { web3 } = this.props.drizzle;
    const type = event.event;
    const { transactionHash } = event;
    const { amount } = event.returnValues;
    const tokenAmount = '0x0000000000000000000000000000000000000000' === event.returnValues.token ? '' : amount;
    const ethAmount = '0x0000000000000000000000000000000000000000' === event.returnValues.token ? parseInt(web3.utils.fromWei(amount)).toFixed(2) : '';

    const e = {
      type,
      transactionHash,
      tokenAmount,
      ethAmount
    }

    this.setState(prevState => ({
      events: [...prevState.events, e]
    }));
  }

  render() {
    const {tokenAddress} = this.props;
    let row;

    if(this.state.events)
      row = this.state.events.map((event, index) => {
        if(index > 0 && this.state.events[index - 1].transactionHash === event.transactionHash) {
          return (<tr key={index}></tr>);
        }

        return (
          <tr key={index}>
            <td>{event.transactionHash}</td>
            <td>{event.type}</td>
            <td>{event.tokenAmount}</td>
            <td>{event.ethAmount}</td>
          </tr>
        );
      });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Type</th>
            <th>{this.findTokenName(tokenAddress)}</th>
            <th>ETH</th>
          </tr>
        </thead>
        <tbody>
          {row}
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
    transactions: state.transactions,
    transactionStack: state.transactionStack,
  }
}
export default drizzleConnect(
    withRouter(Funds),
    mapStateToProps,
);
