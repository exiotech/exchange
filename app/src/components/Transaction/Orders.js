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
  }

  state = { events: [], transactionHash: null, type: null, amount: '', tokenAmount: '' };

  componentDidMount() {
    // this.setState({ events: this.props.contracts.ExioExChange.events });
  }

  componentDidUpdate(prevProps) {
    if(this.props.contracts.ExioExChange.events === prevProps.contracts.ExioExChange.events)
      return;

    const event = this.props.contracts.ExioExChange.events[this.props.contracts.ExioExChange.events.length - 1];
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
    let row;
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
  }
}
export default drizzleConnect(
    withRouter(Orders),
    mapStateToProps,
);
