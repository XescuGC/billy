import React, { Component } from 'react';
import FormGroup from './FormGroup';

class ConfigGlobal extends Component {
  render() {
    const { vat, currency } = this.props.global;
    return (
      <div>
        <h3>Global</h3>
        <form id='config-global' onSubmit={this.onSubmitForm.bind(this)}>
          <FormGroup value={vat} name={'vat'} />
          <FormGroup value={currency} name={'currency'} />
          <button type='submit' className='btn btn-default' onClick={this.onSubmitForm.bind(this)}>Update Global</button>
        </form>
      </div>
    )
  }

  onSubmitForm(e) { this.props.onUpdate(e) }
}

ConfigGlobal.propTypes = {
  global:       React.PropTypes.object,
  onUpdate:     React.PropTypes.func.isRequired,
}

export default ConfigGlobal;
