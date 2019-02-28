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
        <Tab drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} onSelectTab={this.handleTab}></Tab>
        <Content drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} tab={this.state.tab} tokenAddress={this.props.tokenAddress}/>
      </div>
    );
  }
}

export default Orders;
