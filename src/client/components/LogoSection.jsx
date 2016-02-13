import React, { Component } from 'react';
import { connect }          from 'react-redux';

class LogoSection extends Component {
  render() {
    return (
      <h1 className="brand">
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        Billy
      </h1>
    )
  }
}

function select(state) {
  return {
    clients: state.clients
  }
}

export default connect(select)(LogoSection);
