import React, { Component } from 'react';
import { connect }          from 'react-redux';

class LogoSection extends Component {
  render() {
    return (
      <h1 className="brand">Billy</h1>
    )
  }
}

function select(state) {
  return {
    clients: state.clients
  }
}

export default connect(select)(LogoSection);
