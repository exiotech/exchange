import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import data from './../../data.json';

class Baner extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.props.drizzleState.token = eventKey;
  }

  render() {
    const { logo } = this.props;
    const item = data.tokens.map((token) =>
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
          <Nav className="mr-auto" onSelect={k => this.handleSelect(k)}>
            <NavDropdown title="Tokens" id="nav-dropdown" >
              {item}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Baner;
