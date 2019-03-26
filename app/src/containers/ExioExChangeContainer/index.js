import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import { withRouter } from 'react-router-dom'

import actions from '../../actions';

class ExioExChangeContainer extends Component {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  static propTypes = {
    contracts: PropTypes.object,
  }

  constructor(props, context) {
    super(props)
    this.state = {
      events: null,
    };
  }

  componentDidMount() {
    // this.eventHandeling();
  }

  componentDidUpdate(oldProps) {
    if (this.props.contracts.ExioExChange.events === oldProps.contracts.ExioExChange.events) {
      return;
    }

    if(this.props.contracts.ExioExChange.events.length > 1)
      if(this.props.contracts.ExioExChange.events[this.props.contracts.ExioExChange.events.length - 1].id === this.props.contracts.ExioExChange.events[this.props.contracts.ExioExChange.events.length - 2].id)
        return

    this.eventHandeling(this.props.contracts.ExioExChange.events[this.props.contracts.ExioExChange.events.length - 1]);
  }

  eventHandeling = (event) => {
    this.props.addExioExChangeEvent(event);
  }

  render() {
    return (<span></span>);
  }
}

const mapStateToProps = (state) => {
    return {
      contracts: state.contracts,
      exioExChange: state.exioExChange,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      addExioExChangeEvent: (event) => dispatch(actions.addExioexchangeEvent(event)),
    };
};

export default drizzleConnect(
    withRouter(ExioExChangeContainer),
    mapStateToProps,
    mapDispatchToProps,
);
