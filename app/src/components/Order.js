import React from "react";

class OrderToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stackId: null,
      count: '0',
      price: '0',
      expires: '1000'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, name) {
    this.setState({ [name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setOrder(parseInt(this.state.count), parseInt(this.state.price), this.state.expires);
  }

  setOrder = async (count, price, expires) => {
    const { drizzle, drizzleState, address } = this.props;
    const { ExioExChange } = drizzle.contracts;
    const { web3 } = this.props.drizzle;

    try {
      const trxCount = await web3.eth.getTransactionCount(drizzleState.accounts[0]) + 1;
      price = await web3.utils.toWei((price * count).toString());
      // let drizzle know we want to call the `set` method with `value`
      const stackId = ExioExChange.methods["order"].cacheSend(address, count.toString(), '0x0', price, expires, trxCount.toString(), {
        from: drizzleState.accounts[0]
      });

      // save the `stackId` for later reference
      this.setState({ stackId });
    } catch(err) {
      console.log(err);
    }
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
    return `Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            OrderToken:
            <input type="text" value={this.state.count} onChange={ (e) => this.handleChange(e, 'count') } />
          </label>
          <label>
            Price:
            <input type="text" value={this.state.price} onChange={ (e) => this.handleChange(e, 'price') } />
          </label>

          <label>
            Expires:
            <input type="text" value={this.state.expires} onChange={ (e) => this.handleChange(e, 'expires') } />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default OrderToken;
