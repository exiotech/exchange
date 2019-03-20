import React from "react";
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';

class Deposit extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  static propTypes = {
    accounts: PropTypes.object,
    transactions: PropTypes.object,
    transactionStack: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      stackId: null,
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    const value = parseInt(this.state.value);
    event.preventDefault();
    this.setValue(value);
  }

  setValue = value => {
    const { ExioExChange } = this.context.drizzle.contracts;
    const stackId = ExioExChange.methods["deposit"].cacheSend({
      from: this.props.accounts[0],
      value: value * 1000000000000000000
    });

    this.setState({ stackId });
  };

  getTxStatus = () => {
    const txHash = this.props.transactionStack[this.state.stackId];

    if (!txHash) return null;
    if (!this.props.transactions[txHash]) return null;

    return this.props.transactions[txHash].status;
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group controlId="deposit">
            <Form.Control type="number" placeholder="Amount" value={this.state.value} onChange={this.handleChange} />
            <Form.Text className="text-muted text-left">
              Deposit ETH {this.getTxStatus()}
            </Form.Text>
          </Form.Group>
          <Form.Group className="">
            <Button type="submit">Deposit</Button>
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    transactions: state.transactions,
    transactionStack: state.transactionStack,
  }
}
export default drizzleConnect(
    withRouter(Deposit),
    mapStateToProps,
);
