import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { pushPath }         from 'redux-simple-router';
import Table                from './Table';
import * as ServerActions   from '../actions/server';

class ClientsSection extends Component {
  render() {
    const { clients } = this.props;
    return (
      <Table
        columns={['id', 'name', 'options']}
        items={clients.items}
        newBtn={this.newClient.bind(this)}
      />
    )
  }

  componentDidMount() {
    const { clients, dispatch } = this.props;
    if (!clients.items.length) dispatch(ServerActions.fetchClients());
  }

  newClient() {
    return (
      <button className='btn btn-success' onClick={this.goToNewClient.bind(this)}>
        New Client
      </button>
    )
  }

  goToNewClient(e) {
    e.preventDefault();
    this.props.dispatch(pushPath('/clients/new'));
  }
}

function select(state) {
  return {
    clients: state.clients
  }
}

export default connect(select)(ClientsSection);
