import React from "react";
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Table } from 'react-bootstrap';

import { tokens } from '../../data.json';

class Funds extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  static propTypes = {
    contracts: PropTypes.object,
  }

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
    const type = event.event;
    const { transactionHash } = event;
    const { amount } = event.returnValues;
    const tokenAmount = '0x0000000000000000000000000000000000000000' === event.returnValues.token ? '' : amount;
    const ethAmount = '0x0000000000000000000000000000000000000000' === event.returnValues.token ? parseInt(this.context.drizzle.web3.utils.fromWei(amount)).toFixed(2) : '';

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
            <th>{this.findTokenName(this.props.tokenAddress)}</th>
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
    contracts: state.contracts,
  }
}
export default drizzleConnect(
    withRouter(Funds),
    mapStateToProps,
);
