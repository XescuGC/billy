import React, { Component } from 'react';
import FormGroup from './FormGroup';

class ConfigUser extends Component {
  render() {
    const {
      name, vat_number, address, province, locality, country, zipcode
    } = this.props.user;
    const { onInputKeyPress } = this.props;
    return (
      <div>
        <h3>User</h3>
        <form id='config-user' onSubmit={this.onSubmitForm.bind(this)}>
          <FormGroup
            value={name} name={'name'}
            inputEvents={ {onKeyPress: onInputKeyPress.bind(this, 'user:name')} }
          />
          <FormGroup
            value={vat_number} name={'vat_number'}
            inputEvents={ {onKeyPress: onInputKeyPress.bind(this, 'user:vat_number')} }
          />
          <FormGroup
            value={address} name={'address'}
            inputEvents={ {onKeyPress: onInputKeyPress.bind(this, 'user:address')} }
          />
          <FormGroup
            value={province} name={'province'}
            inputEvents={ {onKeyPress: onInputKeyPress.bind(this, 'user:province')} }
          />
          <FormGroup
            value={locality} name={'locality'}
            inputEvents={ {onKeyPress: onInputKeyPress.bind(this, 'user:locality')} }
          />
          <FormGroup
            value={zipcode} name={'zipcode'}
            inputEvents={ {onKeyPress: onInputKeyPress.bind(this, 'user:zipcode')} }
          />
          <FormGroup
            value={country} name={'country'}
            inputEvents={ {onKeyPress: onInputKeyPress.bind(this, 'user:country')} }
          />
          <button type='submit' className='btn btn-default' onSubmit={this.onSubmitForm.bind(this)} onClick={this.onSubmitForm.bind(this)}>Update User</button>
        </form>
      </div>
    )
  }
  onSubmitForm(e) {
    e.preventDefault();
    let userKeys = [];
    $('#config-user').serializeArray().forEach( i => userKeys.push({ key: `user:${i.name}`, value: i.value }));
    this.props.onUpdateKeys(userKeys)
  }
}

ConfigUser.propTypes = {
  user:             React.PropTypes.object,
  onInputKeyPress:  React.PropTypes.func.isRequired,
  onUpdateKeys:     React.PropTypes.func.isRequired,
}

ConfigUser.defaultProps = {
  user: {}
}

export default ConfigUser;
