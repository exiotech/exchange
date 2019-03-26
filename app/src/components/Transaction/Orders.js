import React from "react";
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Table } from 'react-bootstrap';

class Orders extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  static propTypes = {
    contracts: PropTypes.object.isRequired,
    currentToken: PropTypes.object.isRequired,
    exioExChange: PropTypes.object,
  }

  state = { events: [], transactionHash: null, type: null, amount: '', tokenAmount: '' };

  componentDidMount() {
    let events = this.props.exioExChange.events.filter((currentValue) => {
      if(currentValue.event === 'Order')
        return true;

      return false;
    })

    this.setState({ events: events.map((event) => this.handleEvent(event)) });
  }

  componentDidUpdate(prevProps) {
    if(this.props.contracts.ExioExChange.events === prevProps.contracts.ExioExChange.events)
      return;

    const event = this.props.contracts.ExioExChange.events[this.props.contracts.ExioExChange.events.length - 1];

    if(event.event !== 'Order')
      return;

    const e = this.handleEvent(event);

    this.setState(prevState => ({
      events: [...prevState.events, e]
    }));
  }

  handleEvent = (event) => {
    const { tokenGet, amountGet, tokenGive, amountGive, expires, nonce, user } = event.returnValues;

    return {
      type: event.event,
      transactionHash: event.transactionHash,
      tokenGet,
      amountGet,
      tokenGive,
      amountGive,
      expires,
      nonce,
      user,
    }
  }

  render() {
    let row;
    row = this.state.events.map((event, index) => {
      return (
        <tr key={index}>
          <td>{event.amountGet / event.amountGive}</td>
          <td>{event.type}</td>
          <td>{event.expires}</td>
          <td>Button</td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>{this.props.currentToken.name}/ETH</th>
            <th>Available volume</th>
            <th>Expires in</th>
            <th>Cancel</th>
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
    withRouter(Orders),
    mapStateToProps,
);
