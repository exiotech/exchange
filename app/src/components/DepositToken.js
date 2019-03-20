import React from "react";
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';

import exioabi from '../ExioToken.json';
import testabi from '../TestToken.json';

class DepositToken extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  static propTypes = {
    accounts: PropTypes.object,
    contracts: PropTypes.object,
    transactions: PropTypes.object,
    transactionStack: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      stackId: null,
      value: '',
      approvalId: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let abi;

    if(this.props.address === '0xa588892f9B950E3F1d8231F16b84A18d02AF6854')
      abi = exioabi.abi;
    else
      abi = testabi.abi;

    const contractConfig = {
      contractName: 'TokenContract',
      web3Contract: new this.context.drizzle.web3.eth.Contract(abi, this.props.address)
    }
    const events = ['Transfer', 'Approval']

    this.context.drizzle.addContract(contractConfig, events)
  }

  handleChange = event => {
    this.setState({value: event.target.value});
  }

  handleSubmit = event => {
    const value = parseInt(this.state.value);
    event.preventDefault();
    this.getApproval(value);
  }

  getApproval = value => {
    const { ExioExChange } = this.context.drizzle.contracts;
    const { TokenContract } = this.context.drizzle.contracts;

    const approvalId = TokenContract.methods["approve"].cacheSend(ExioExChange.address, value, {
      from: this.props.accounts[0]
    });

    this.setState({ approvalId }, () => {
      const intervalID = setInterval(() => {
        if(this.getTxStatus(approvalId) === 'success') {
          this.setValue(value);
          clearInterval(intervalID);
        }
      }, 100);
    });
  }

  setValue = value => {
    const contract = this.context.drizzle.contracts.ExioExChange;
    const stackId = contract.methods["depositToken"].cacheSend(this.props.address, value, {
      from: this.props.accounts[0]
    });

    this.setState({ stackId });
  };

  getTxStatus = (txId) => {
    const txHash = this.props.transactionStack[txId];

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
              Deposit Token {this.getTxStatus()}
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
    contracts: state.contracts,
    transactions: state.transactions,
    transactionStack: state.transactionStack,
  }
}
export default drizzleConnect(
    withRouter(DepositToken),
    mapStateToProps,
);
