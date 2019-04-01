import React from "react";
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap';

class Orders extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  static propTypes = {
    contracts: PropTypes.object.isRequired,
    currentToken: PropTypes.object.isRequired,
    exioExChange: PropTypes.object,
  }

  state = {
    events: [],
  };

  componentDidMount() {
    const { web3 } = this.context.drizzle;
    let events = this.props.exioExChange.events.filter((currentValue) => {
      if(currentValue.event === 'Order')
        return true;

      return false;
    })

    events = events.map((event) => this.handleEvent(event))

    const { ExioExChange } = this.context.drizzle.contracts;

    events = events.map(event => {
      const key = ExioExChange.methods["availableVolume"].cacheCall(event.tokenGet, event.amountGet, event.tokenGive, event.amountGive, event.expires, event.nonce, event.user, 0, web3.utils.fromAscii("0"), web3.utils.fromAscii("0"));
      event.availableVolumeKey = key;
      return event;
    });

    this.setState({ events });
  }

  componentDidUpdate(prevProps) {
    const { web3 } = this.context.drizzle;

    if(this.props.contracts.ExioExChange.events === prevProps.contracts.ExioExChange.events)
      return;

    if(prevProps.contracts.ExioExChange.events.length !== 0 && (this.props.contracts.ExioExChange.events[this.props.contracts.ExioExChange.events.length - 1].id === prevProps.contracts.ExioExChange.events[prevProps.contracts.ExioExChange.events.length - 1].id))
      return;

    let event = this.props.contracts.ExioExChange.events[this.props.contracts.ExioExChange.events.length - 1];

    if(event.event !== 'Order')
      return;

    event = this.handleEvent(event);

    const { ExioExChange } = this.context.drizzle.contracts;
    const key = ExioExChange.methods["availableVolume"].cacheCall(event.tokenGet, event.amountGet, event.tokenGive, event.amountGive, event.expires, event.nonce, event.user, 0, web3.utils.fromAscii("0"), web3.utils.fromAscii("0"));
    event.availableVolumeKey = key;

    this.setState(prevState => ({
      events: [...prevState.events, event],
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
    if(this.state.events.length < 1)
      return ('Loading...')

    const { ExioExChange } = this.props.contracts;

    console.log('EXIOEXCHANGE.AVAILABLEVOLUME', ExioExChange.availableVolume)
    console.log('EXIOEXCHANGE', ExioExChange)
    console.log('THIS.STATE.EVENTS', this.state.events)

    let row = this.state.events.map((event, index) => {
      console.log(event, ' ', index);
      return (
        <tr key={index}>
          <td>{event.amountGet / event.amountGive}</td>
          <td>{/*ExioExChange.availableVolume[event.key]*/}</td>
          <td>{event.expires}</td>
          <td><Button variant="danger">Cancel</Button></td>
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
