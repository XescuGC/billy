import React, { Component } from 'react';
import { connect }          from 'react-redux';

class ConfigSection extends Component {
  render() {
    return (
      <h5>Configs</h5>
    )
  }
}

function select(state) {
  return {
    clients: state.clients
  }
}

export default connect(select)(ConfigSection);
