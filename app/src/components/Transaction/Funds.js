import React from "react";
import { Table } from 'react-bootstrap';

import { tokens } from '../../data.json';

class Content extends React.Component {
  state = { events: [], transactionHash: null, type: null, amount: '', tokenAmount: '' };

  findTokenName = (address) => {
    return tokens.find(token => {
      return token.address === address;
    }).name
  }

  componentDidMount() {
    // this.setState({ events: this.props.drizzleState.contracts.ExioExChange.events });
  }

  componentDidUpdate(prevProps) {
    if(this.props.drizzleState.contracts.ExioExChange.events === prevProps.drizzleState.contracts.ExioExChange.events)
      return;

    const event = this.props.drizzleState.contracts.ExioExChange.events[this.props.drizzleState.contracts.ExioExChange.events.length - 1];
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

export default Content;
