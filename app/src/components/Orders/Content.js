import React from "react";
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap';

import { tokens } from '../../data.json';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: null,
      amount: '',
      price: '',
      expires: 1000,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  findTokenName = (address) => {
    return tokens.find(token => {
      return token.address === address;
    }).name
  }

  handleChange = event => {
    switch(event.currentTarget.id) {
      case 'amount':
        this.setState({ amount: event.target.value });
        break;
      case 'price':
        this.setState({ price: event.target.value });
        break;
      case 'expires':
        this.setState({ expires: event.target.value });
        break;
      default: break;
    }
  }

  handleSubmit = event => {
    // const value = parseInt(this.state.value);
    event.preventDefault();
    const order = {
      amount:  parseFloat(this.state.amount),
      price:  parseFloat(this.state.price),
      expires:  parseFloat(this.state.expires),
    }

    if(this.props.tab === 'buy')
      this.buyOrder(order);

    if(this.props.tab === 'sell')
      this.sellOrder(order);
  }

  buyOrder = async order => {
    const { drizzle, tokenAddress, accounts } = this.props;
    const { ExioExChange } = drizzle.contracts;
    const { web3 } = this.props.drizzle;

    try {
      const trxCount = await web3.eth.getTransactionCount(accounts[0]) + 1;
      order.price = await web3.utils.toWei((order.price * order.amount).toString());
      // let drizzle know we want to call the `set` method with `value`
      const orderId = ExioExChange.methods["order"].cacheSend(tokenAddress, order.amount.toString(), '0x0', order.price * order.amount, order.expires, trxCount.toString(), {
        from: accounts[0]
      });

      // save the `stackId` for later reference
      this.setState({ orderId });
    } catch(err) {
      console.log(err);
    }
  };

  sellOrder = async order => {
    const { drizzle, tokenAddress, accounts } = this.props;
    const { ExioExChange } = drizzle.contracts;
    const { web3 } = this.props.drizzle;

    try {
      const trxCount = await web3.eth.getTransactionCount(accounts[0]) + 1;
      order.price = await web3.utils.toWei((order.price * order.amount).toString());
      // let drizzle know we want to call the `set` method with `value`
      const orderId = ExioExChange.methods["order"].cacheSend('0x0', order.price * order.amount, tokenAddress, order.amount.toString(), order.expires, trxCount.toString(), {
        from: accounts[0]
      });

      // save the `stackId` for later reference
      this.setState({ orderId });
    } catch(err) {
      console.log(err);
    }
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];
    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
    if (!transactions[txHash]) return null;

    // otherwise, return the transaction status
    return transactions[txHash].status;
  };

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  render() {
    let variant = 'success';

    if(this.props.tab === 'sell')
      variant = 'danger';

    const amount = parseFloat(this.state.amount) ? parseFloat(this.state.amount) : 0;
    const price = parseFloat(this.state.price) ? parseFloat(this.state.price) : 0;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="amount">
          <Form.Text className="text-muted text-left">
            Amount to {this.props.tab}
          </Form.Text>
          <InputGroup className="mb-3">
            <Form.Control type="text" onChange={this.handleChange} />
            <InputGroup.Append>
              <InputGroup.Text>Exio</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Text className="text-muted text-left">
            Price
          </Form.Text>
          <InputGroup className="mb-3">
            <Form.Control type="text" onChange={this.handleChange} />
            <InputGroup.Append>
              <InputGroup.Text>ETH</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="total">
          <Form.Text className="text-muted text-left">
            Total
          </Form.Text>
          <Form.Control type="text" value={amount * price} readOnly />
        </Form.Group>

        <Form.Group controlId="expires">
          <Form.Text className="text-muted text-left">
            Expires
          </Form.Text>
          <InputGroup className="mb-3">
            <Form.Control type="text" value={this.state.expires} onChange={this.handleChange} />
            <InputGroup.Append>
              <InputGroup.Text>Blocks</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>

        <Button variant={variant} type="submit" value={this.props.tab}>
          {this.props.tab} Order
        </Button>
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
    withRouter(Content),
    mapStateToProps,
);
