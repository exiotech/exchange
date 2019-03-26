import React from "react";
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Table } from 'react-bootstrap';

class Funds extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  static propTypes = {
    contracts: PropTypes.object.isRequired,
    currentToken: PropTypes.object.isRequired,
    exioExChange: PropTypes.object,
  }

  state = { events: [] };

  componentDidMount() {
    let events = this.props.exioExChange.events.filter((currentValue) => {
      if(currentValue.event === 'Deposit' || currentValue.event === 'Withdraw')
        return true;

      return false;
    })

    this.setState({ events: events.map((event) => this.handleEvent(event)) });
  }

  componentDidUpdate(prevProps) {
    if(this.props.exioExChange.events === prevProps.exioExChange.events)
      return;

    let event = this.props.exioExChange.events[this.props.exioExChange.events.length - 1];

    if(event !== 'Deposit' && event !== 'Withdraw')
      return;

    event = this.handleEvent(event)

    this.setState(prevState => ({
      events: [...prevState.events, event]
    }));
  }

  handleEvent = (event) => {
    const nullAddress = '0x0000000000000000000000000000000000000000'

    return {
      type: event.event,
      transactionHash: event.transactionHash,
      tokenAmount: nullAddress === event.returnValues.token ? '' : event.returnValues.amount.toFixed(2),
      ethAmount: nullAddress === event.returnValues.token ? parseInt(this.context.drizzle.web3.utils.fromWei( event.returnValues.amount)).toFixed(2) : '',
    }
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
            <th>{this.props.currentToken.name}</th>
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
    currentToken: state.currentToken,
    exioExChange: state.exioExChange,
  }
}
export default drizzleConnect(
    withRouter(Funds),
    mapStateToProps,
);
