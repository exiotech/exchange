import React from "react";
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

class Balance extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  static propTypes = {
    accounts: PropTypes.object,
    contracts: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      dataKey: null
    };
  }

  componentDidMount() {
    const { ExioExChange } = this.context.drizzle.contracts;
    const dataKey = ExioExChange.methods["balanceOf"].cacheCall(this.props.tokenAddress, this.props.accounts[0]);

    this.setState({ dataKey });
  }

  componentDidUpdate(oldProps) {
    if (this.props.tokenAddress === oldProps.tokenAddress) {
      return;
    }

    const { ExioExChange } = this.context.drizzle.contracts;
    const dataKey = ExioExChange.methods["balanceOf"].cacheCall(this.props.tokenAddress, this.props.accounts[0]);

    this.setState({ dataKey });
  }

  render() {
    const { ExioExChange } = this.props.contracts;

    let balance = ExioExChange.balanceOf[this.state.dataKey];

    if(this.props.tokenAddress === '0x0') {
      balance = balance && parseInt(this.context.drizzle.web3.utils.fromWei(balance.value)).toFixed(2);
    }
    else
      balance = balance && balance.value;

    return (<span>{balance}</span>);
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts,
  }
}
export default drizzleConnect(
    withRouter(Balance),
    mapStateToProps,
);
