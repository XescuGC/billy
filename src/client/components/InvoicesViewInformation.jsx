import React, { Component } from 'react';
import FormGroup            from './FormGroup';

class InvoicesViewInformation extends Component{
  render() {
    const { invoice } = this.props;
    if (!invoice.client) invoice.client = {};
    return (
      <div>
        <h3>Client</h3>
        <FormGroup value={invoice.client.name} name={'client_name'} />
        <FormGroup value={invoice.client.address} name={'client_address'} />
        <FormGroup value={invoice.client.province} name={'client_province'} />
        <FormGroup value={invoice.client.locality} name={'client_locality'} />
        <FormGroup value={invoice.client.zipcode} name={'client_zipcode'} />
        <FormGroup value={invoice.client.country} name={'client_country'} />
      </div>
    )
  }
}

InvoicesViewInformation.propTypes = {
  invoice: React.PropTypes.object
}

InvoicesViewInformation.defaultProps = {
  invoice: {}
}

export default InvoicesViewInformation;
