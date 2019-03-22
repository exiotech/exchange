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
        tab = <Funds tab={this.state.tab} />
        break;
      case 'orders':
        tab = <Orders tab={this.state.tab} />
        break;
      default: tab = <div>trades</div>
    }

    return (
      <div>
        <Tab onSelectTab={this.handleTab}></Tab>
        {tab}
      </div>
    );
  }
}

export default Transaction;
