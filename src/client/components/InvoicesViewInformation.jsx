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
          <FormGroup label={false} value={invoice.client.name} name={'client_name'} />
          <FormGroup label={false} value={invoice.client.vat_number} name={'client_vat_number'} />
          <FormGroup label={false} value={invoice.client.address} name={'client_address'} />

          <div className='row'>
            <div className='col-md-6'>
              <FormGroup label={false} value={invoice.client.locality} name={'client_locality'} />
            </div>
            <div className='col-md-6'>
              <FormGroup label={false} value={invoice.client.zipcode} name={'client_zipcode'} />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <FormGroup label={false} value={invoice.client.province} name={'client_province'} />
            </div>
            <div className='col-md-6'>
              <FormGroup label={false} value={invoice.client.country} name={'client_country'} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

InvoicesViewInformation.propTypes = {
  invoice:  React.PropTypes.object,
  config:   React.PropTypes.object,
}

InvoicesViewInformation.defaultProps = {
  invoice: {}
}

export default InvoicesViewInformation;
