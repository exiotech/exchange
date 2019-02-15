import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class Baner extends React.Component {
  render() {
    const { logo } = this.props
    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="/">
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
          {' ExioChange'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Token" id="collasible-nav-dropdown">
              <NavDropdown.Item as="li" href="/?tkn=exio">Exio</NavDropdown.Item>
              <NavDropdown.Item as="li" href="/?tkn=test">Test</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Baner;
