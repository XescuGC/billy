import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import * as ServerActions       from '../actions/server';

class ClientsNewSection extends Component {
  render() {
    return (
      <div>
        <div className='page-header'>
          <h1>New Client</h1>
        </div>
        <form id='create-client'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' className='form-control' id='name' placeholder='Name'/>
          </div>
          <div className='form-group'>
            <label htmlFor='vat-number'>Vat Number</label>
            <input type='text' name='vat_number' className='form-control' id='vat-number' placeholder='Vat Number'/>
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input type='text' name='address' className='form-control' id='address' placeholder='Address'/>
          </div>
          <div className='form-group'>
            <label htmlFor='province'>Province</label>
            <input type='text' name='province' className='form-control' id='province' placeholder='Province'/>
          </div>
          <div className='form-group'>
            <label htmlFor='locality'>Locality</label>
            <input type='text' name='locality' className='form-control' id='locality' placeholder='Locality'/>
          </div>
          <div className='form-group'>
            <label htmlFor='zipcode'>Zipcode</label>
            <input type='text' name='zipcode' className='form-control' id='zipcode' placeholder='Zipcode'/>
          </div>
          <div className='form-group'>
            <label htmlFor='country'>Country</label>
            <input type='text' name='country' className='form-control' id='country' placeholder='Country'/>
          </div>
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
