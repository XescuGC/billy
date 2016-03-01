import React, { Component } from 'react';
import FormGroup            from './FormGroup';

class InvoicesViewInformation extends Component{
  render() {
    const { invoice, config } = this.props;
    if (!invoice.client) invoice.client = {};
    return (
      <div className='row'>

        <div className='col-md-6'>
          <b>From:</b>
          <p>{config.user.name}</p>
          <p>{config.user.vat_number}</p>
          <p>{config.user.address}</p>
          <p>{config.user.zipcode} {config.user.locality}</p>
          <p>{config.user.province} ({config.user.country})</p>
        </div>
        <div className='col-md-6'>
          <b>To:</b>
          <FormGroup label={false} value={invoice.client.name} name={'name'} inputEvents={{ onChange: this.handleClientChange.bind(this, 'name') }} />
          <FormGroup label={false} value={invoice.client.vat_number} name={'vat_number'} inputEvents={{ onChange: this.handleClientChange.bind(this, 'vat_number') }} />
          <FormGroup label={false} value={invoice.client.address} name={'address'} inputEvents={{ onChange: this.handleClientChange.bind(this, 'address') }} />

          <div className='row'>
            <div className='col-md-6'>
              <FormGroup label={false} value={invoice.client.locality} name={'locality'} inputEvents={{ onChange: this.handleClientChange.bind(this, 'locality') }} />
            </div>
            <div className='col-md-6'>
              <FormGroup label={false} value={invoice.client.zipcode} name={'zipcode'} inputEvents={{ onChange: this.handleClientChange.bind(this, 'zipcode') }} />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <FormGroup label={false} value={invoice.client.province} name={'province'} inputEvents={{ onChange: this.handleClientChange.bind(this, 'province') }} />
            </div>
            <div className='col-md-6'>
              <FormGroup label={false} value={invoice.client.country} name={'country'} inputEvents={{ onChange: this.handleClientChange.bind(this, 'country') }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClientChange( field, event ) {
    const { invoice, onClientChange } = this.props;
    invoice.client[field] = event.target.value;
    onClientChange( invoice.client );
  }
}

InvoicesViewInformation.propTypes = {
  invoice:       React.PropTypes.object,
  config:        React.PropTypes.object,
  onClientChange:  React.PropTypes.func,
}

InvoicesViewInformation.defaultProps = {
  invoice: {}
}

export default InvoicesViewInformation;
