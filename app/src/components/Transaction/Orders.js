import React from "react";
import { Table } from 'react-bootstrap';

import { tokens } from '../../data.json';

class Orders extends React.Component {
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
    console.log(event);
    const type = event.event;

    if(type !== 'Order')
      return;

    const { transactionHash } = event;
    const { tokenGet } = event.returnValues;
    const { amountGet } = event.returnValues;
    const { tokenGive } = event.returnValues;
    const { amountGive } = event.returnValues;
    const { expires } = event.returnValues;
    const { nonce } = event.returnValues;
    const { user } = event.returnValues;

    const e = {
      type,
      transactionHash,
      tokenGet,
      amountGet,
      tokenGive,
      amountGive,
      expires,
      nonce,
      user,
    }
    this.setState(prevState => ({
      events: [...prevState.events, e]
    }));
  }

  render() {
    const {tokenAddress} = this.props;
    let row;
    console.log(this.state.events);
    // if(this.state.events)
    //   row = this.state.events.map((event, index) => {
    //     if(index > 0 && this.state.events[index - 1].transactionHash === event.transactionHash) {
    //       return (<tr key={index}></tr>);
    //     }
    //
    //     return (
    //       <tr key={index}>
    //         <td>{event.transactionHash}</td>
    //         <td>{event.type}</td>
    //         <td>{event.tokenAmount}</td>
    //         <td>{event.ethAmount}</td>
    //       </tr>
    //     );
    //   });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>{this.findTokenName(tokenAddress)}/ETH</th>
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

export default Orders;
