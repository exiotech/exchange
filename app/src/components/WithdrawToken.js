import React from "react";
import { Form, Button } from 'react-bootstrap';

class WithdrawToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stackId: null,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const value = this.state.value;
    event.preventDefault();
    this.setValue(value);
  }

  setValue = value => {
    const { drizzle, drizzleState, address } = this.props;
    const contract = drizzle.contracts.ExioExChange;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["withdrawToken"].cacheSend(address, value, {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
    if (!transactions[txHash]) return null;

    // otherwise, return the transaction status
    return transactions[txHash].status;
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group controlId="deposit">
            <Form.Control type="number" placeholder="Amount" value={this.state.value} onChange={this.handleChange} />
            <Form.Text className="text-muted text-left">
              Withdraw Token {this.getTxStatus()}
            </Form.Text>
          </Form.Group>
          <Form.Group className="">
            <Button type="submit">Withdraw</Button>
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}

export default WithdrawToken;
