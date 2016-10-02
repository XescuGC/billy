import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import * as ServerActions       from '../actions/server';
import FormGroup                from './FormGroup';

class ClientsViewSection extends Component {
  render() {
    const { client } = this.props;
    return (
      <div>
        <div className='page-header'>
          <h1>New Client</h1>
        </div>
        <form id='create-client'>
          { client.id ? <input type='hidden' name='id' value={client.id}></input> : null }
          <FormGroup value={client.name} name={'name'} />
          <FormGroup value={client.vat_number} name={'vat_number'} />
          <FormGroup value={client.address} name={'address'} />
          <FormGroup value={client.province} name={'province'} />
          <FormGroup value={client.locality} name={'locality'} />
          <FormGroup value={client.zipcode} name={'zipcode'} />
          <FormGroup value={client.country} name={'country'} />
          <button type='submit' className='btn btn-default' onClick={this.onSubmit.bind(this)}>{client.id ? 'Update' : 'Create'} Client</button>
        </form>
      </div>
    )
  }
  onSubmit(e) {
    e.preventDefault();
    let client = {};
    $('#create-client').serializeArray().forEach( i => client[i.name] = i.value );
    if (this.props.client.id) {
      this.props.dispatch(ServerActions.updateClient(client));
    } else {
      this.props.dispatch(ServerActions.createClient(client));
    }
  }
}

function select(state) {
  return {
    global:   state.global,
    client:   state.clients.client,
  }
}

export default connect(select)(ClientsViewSection);
