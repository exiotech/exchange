import React from "react";
import { Nav } from 'react-bootstrap';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'deposit'
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({ activeKey: eventKey });
    this.props.onSelectTab(eventKey);
  }

  render() {
    return (
      <Nav variant="tabs" defaultActiveKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
        <Nav.Item>
          <Nav.Link eventKey="deposit">Deposit</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="withdraw">Withdraw</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="transfer">Transfer</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default Tab
