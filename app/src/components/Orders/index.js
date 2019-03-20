import React from 'react';

import Tab from "./Tab";
import Content from "./Content";

class Orders extends React.Component {
  state = { tab: 'buy' };

  handleTab = (arg) => {
    this.setState({tab: arg});
  }

  render() {
    return (
      <div>
        <Tab onSelectTab={this.handleTab}></Tab>
        <Content tab={this.state.tab} tokenAddress={this.props.tokenAddress}/>
      </div>
    );
  }
}

export default Orders;
