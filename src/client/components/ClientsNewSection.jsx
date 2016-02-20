import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import * as ServerActions       from '../actions/server';
import FormGroup                from './FormGroup';

class ClientsNewSection extends Component {
  render() {
    return (
      <div>
        <div className='page-header'>
          <h1>New Client</h1>
        </div>
        <form id='create-client'>
          <FormGroup name={'name'} />
          <FormGroup name={'vat_number'} />
          <FormGroup name={'address'} />
          <FormGroup name={'province'} />
          <FormGroup name={'locality'} />
          <FormGroup name={'zipcode'} />
          <FormGroup name={'country'} />
          <button type='submit' className='btn btn-default' onClick={this.onCreateClient.bind(this)}>Create Client</button>
        </form>
      </div>
    )
  }
  onCreateClient(e) {
    e.preventDefault();
    let client = {};
    $('#create-client').serializeArray().forEach( i => client[i.name] = i.value );
    this.props.dispatch(ServerActions.createClient(client));
  }
}

function select(state) {
  return {
    global: state.global
  }
}

export default connect(select)(ClientsNewSection);
