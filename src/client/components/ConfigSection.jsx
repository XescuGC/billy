import React, { Component } from 'react';
import { connect }          from 'react-redux';
import * as ServerActions   from '../actions/server';

class ConfigSection extends Component {
  render() {
    return (
      <div className='page-header'>
        <h1>Config</h1>
        <form id='config-user'>
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
          <button type='submit' className='btn btn-default' onClick={this.onUpdateUserConfig.bind(this)}>Update User</button>
        </form>
      </div>
    )
  }

  onUpdateUserConfig(e) {
    e.preventDefault();
    let user = {};
    $('#config-user').serializeArray().forEach( i => user[i.name] = i.value );
    this.props.dispatch(ServerActions.updateUserConfig(user));
  }
}

function select(state) {
  return {
    config: state.config
  }
}

export default connect(select)(ConfigSection);
