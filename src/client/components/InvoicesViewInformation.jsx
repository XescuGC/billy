import React, { Component } from 'react';
import FormGroup            from './FormGroup';

class InvoicesViewInformation extends Component{
  render() {
    const { invoice, config } = this.props;
    if (!invoice.client) invoice.client = {};
    return (
      <div className='row'>
        <h3>Client</h3>

        <div className='col-md-6'>
          <FormGroup value={invoice.client.name} name={'client_name'} />
          <FormGroup value={invoice.client.address} name={'client_address'} />
          <FormGroup value={invoice.client.province} name={'client_province'} />
          <FormGroup value={invoice.client.locality} name={'client_locality'} />
          <FormGroup value={invoice.client.zipcode} name={'client_zipcode'} />
          <FormGroup value={invoice.client.country} name={'client_country'} />
        </div>
        <div className='col-md-6'>
          <p>Name: {config.user.name}</p>
          <p>Vat Number: {config.user.vat_number}</p>
          <p>Address: {config.user.address}</p>
          <p>Province: {config.user.province}</p>
          <p>Locality: {config.user.locality}</p>
          <p>Zipcode: {config.user.zipcode}</p>
          <p>Country: {config.user.country}</p>
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
