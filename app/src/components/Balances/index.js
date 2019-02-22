import React from 'react';

import Tab from "./Tab";
import Content from "./Content";

class Balances extends React.Component {
  state = { tab: 'deposit' };

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

export default Balances;
