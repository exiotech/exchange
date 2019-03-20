import React from 'react';

import Tab from "./Tab";
import Funds from "./Funds";
import Orders from "./Orders";

class Transaction extends React.Component {
  state = { tab: 'trades' };

  handleTab = (arg) => {
    this.setState({tab: arg});
  }

  render() {
    let tab;
    switch(this.state.tab) {
      case 'funds':
        tab = <Funds drizzle={this.props.drizzle} tab={this.state.tab} tokenAddress={this.props.tokenAddress} />
        break;
      case 'orders':
        tab = <Orders drizzle={this.props.drizzle} tab={this.state.tab} tokenAddress={this.props.tokenAddress} />
        break;
      default: tab = <div>trades</div>
    }

    return (
      <div>
        <Tab drizzle={this.props.drizzle} onSelectTab={this.handleTab}></Tab>
        {tab}
      </div>
    );
  }
}

export default Transaction;
