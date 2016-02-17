import React, { Component } from 'react';
import FormGroup from './FormGroup';

class ConfigUser extends Component {
  render() {
    const {
      name, vat_number, address, province, locality, country, zipcode
    } = this.props.user
    return (
      <div>
        <h3>User</h3>
        <form id='config-user' onSubmit={this.onSubmitForm.bind(this)}>
          <FormGroup value={name} name={'name'} />
          <FormGroup value={vat_number} name={'vat_number'} />
          <FormGroup value={address} name={'address'} />
          <FormGroup value={province} name={'province'} />
          <FormGroup value={locality} name={'locality'} />
          <FormGroup value={zipcode} name={'zipcode'} />
          <FormGroup value={country} name={'country'} />
          <button type='submit' className='btn btn-default' onClick={this.onSubmitForm.bind(this)}>Update User</button>
        </form>
      </div>
    )
  }
  onSubmitForm(e) { this.props.onUpdate(e) }
}

ConfigUser.propTypes = {
  user:         React.PropTypes.object,
  onUpdate:     React.PropTypes.func.isRequired,
}

ConfigUser.defaultProps = {
  user: {}
}

export default ConfigUser;
