import React from 'react';
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

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
        <Tab drizzle={this.props.drizzle} onSelectTab={this.handleTab}></Tab>
        <Content drizzle={this.props.drizzle} tab={this.state.tab} tokenAddress={this.props.tokenAddress}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3
  }
}


export default drizzleConnect(
    withRouter(Balances),
    mapStateToProps,
);
