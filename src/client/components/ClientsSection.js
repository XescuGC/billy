import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Table                from './Table';

class ClientsSection extends Component {
  render() {
    let { clients } = this.props;
    return (
      <Table
        columns={['id', 'name', 'options']}
        items={clients.items}
      />
    )
  }
}

function select(state) {
  return {
    clients: state.clients
  }
}

export default connect(select)(ClientsSection);
