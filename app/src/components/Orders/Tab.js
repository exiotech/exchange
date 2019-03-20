import React from "react";
import { Nav } from 'react-bootstrap';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'buy'
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (eventKey) => {
    this.setState({ activeKey: eventKey });
    this.props.onSelectTab(eventKey);
  }

  render() {
    return (
      <Nav variant="tabs" defaultActiveKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
        <Nav.Item>
          <Nav.Link eventKey="buy">Buy Order</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sell">Sell Order</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default Tab;
