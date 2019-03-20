import React from "react";
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';

import exioabi from '../ExioToken.json';
import testabi from '../TestToken.json';

class DepositToken extends React.Component {
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
    const { drizzle } = this.props;
    let abi;

    if(this.props.address === '0xa588892f9B950E3F1d8231F16b84A18d02AF6854')
      abi = exioabi.abi;
    else
      abi = testabi.abi;

    const contractConfig = {
      contractName: 'TokenContract',
      web3Contract: new drizzle.web3.eth.Contract(abi, this.props.address)
    }
    const events = ['Transfer', 'Approval']

    this.props.drizzle.addContract(contractConfig, events)
  }

  handleChange = event => {
    this.setState({value: event.target.value});
  }

  handleSubmit = event => {
    const value = parseInt(this.state.value);
    event.preventDefault();
    this.getApproval(value);
    // this.setValue(value);
  }

  getApproval = value => {
    const { drizzle, accounts } = this.props;
    const { ExioExChange } = drizzle.contracts;
    const { TokenContract } = drizzle.contracts;

    const approvalId = TokenContract.methods["approve"].cacheSend(ExioExChange.address, value, {
      from: accounts[0]
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
    const { drizzle, address, accounts } = this.props;
    const contract = drizzle.contracts.ExioExChange;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["depositToken"].cacheSend(address, value, {
      from: accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = (txId) => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[txId];
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
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    contracts: state.contracts,
    transactions: state.transactions,
    transactionStack: state.transactionStack,
  }
}
export default drizzleConnect(
    withRouter(DepositToken),
    mapStateToProps,
);
