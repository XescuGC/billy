import React, { Component } from 'react';
import { connect }          from 'react-redux';

class ClientsSection extends Component {
  render() {
    return (
      <h5>Clients</h5>
    )
  }
}

function select(state) {
  return {
    clients: state.clients
  }
}

export default connect(select)(ClientsSection);
