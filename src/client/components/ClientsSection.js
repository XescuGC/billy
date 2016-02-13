import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Table                from './Table';
import * as ServerActions   from '../actions/server';

class ClientsSection extends Component {
  render() {
    const { clients } = this.props;
    return (
      <Table
        columns={['id', 'name', 'options']}
        items={clients.items}
      />
    )
  }
  componentDidMount() {
    const { clients, dispatch } = this.props;
    if (!clients.items.length) dispatch(ServerActions.fetchClients());
  }
}

function select(state) {
  return {
    clients: state.clients
  }
}

export default connect(select)(ClientsSection);
