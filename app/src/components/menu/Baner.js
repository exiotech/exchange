import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { tokens } from './../../data.json';

class Baner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: tokens[0].address
    }
    // console.log(props)

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({ activeKey: eventKey });
    this.props.onSelectToken(eventKey);
  }

  findTokenName = (address) => {
    return tokens.find(token => {
      return token.address === address;
    }).name
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

export default Baner;