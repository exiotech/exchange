import React from "react";
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { tokens } from './../../data.json';

class Baner extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  }

  constructor(props, context) {
    super(props);

    this.state = {
      activeKey: tokens[0].address,
      TokenContract: false,
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (eventKey) => {
    this.setState({ activeKey: eventKey });
    this.props.onSelectToken(eventKey);
    this.deleteTokenContract('TokenContract');
  }

  render() {
    const { logo } = this.props;
    const item = tokens.map(token =>
       <NavDropdown.Item key={token.address} eventKey={token.address}>{token.name}</NavDropdown.Item>
    );

    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="/">
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
          {' ExioChange'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
            <NavDropdown title={this.props.currentToken.name} id="nav-dropdown" >
              {item}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      currentToken: state.currentToken,
    };
};

export default drizzleConnect(
    withRouter(Baner),
    mapStateToProps,
);
