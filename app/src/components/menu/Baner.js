import React from "react";
// import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import exioabi from '../../ExioToken.json';
import testabi from '../../TestToken.json';
import { tokens } from './../../data.json';

class Baner extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      activeKey: tokens[0].address,
      TokenContract: false,
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.addTokenContract(this.state.activeKey);
  }

  handleSelect(eventKey) {
    this.setState({ activeKey: eventKey });
    this.props.onSelectToken(eventKey);
    this.deleteTokenContract('TokenContract');
    this.addTokenContract(eventKey);
  }

  findTokenName = (address) => {
    return tokens.find(token => {
      return token.address === address;
    }).name
  }

  addTokenContract = (address) => {
    const { drizzle } = this.props

    let abi;

    if(address === '0xd9E151BacB093a74C9790DC999b8f90C3698903d')
      abi = exioabi.abi;
    else
      abi = testabi.abi;

    const contractConfig = {
      contractName: 'TokenContract',
      web3Contract: new drizzle.web3.eth.Contract(abi, address)
    }
    const events = ['Transfer', 'Approval'];
    drizzle.addContract(contractConfig, events);
  }

  deleteTokenContract = (name) => {
    this.props.drizzle.deleteContract(name);
  }

  render() {
    const { logo } = this.props;
    const item = tokens.map(token =>
       <NavDropdown.Item key={token.address} eventKey={token.address}>{token.name}</NavDropdown.Item>
    );
    const title = this.findTokenName(this.state.activeKey);

    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="/">
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
          {' ExioChange'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
            <NavDropdown title={title} id="nav-dropdown" >
              {item}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
    withRouter(Baner),
    mapStateToProps,
);
