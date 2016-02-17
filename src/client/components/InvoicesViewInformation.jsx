import React, { Component } from 'react';
import FormGroup            from './FormGroup';

class InvoicesViewClient extends Component{
  render() {
    return (
      <div>
        <h3>Client</h3>
        <FormGroup name={'client_name'} />
        <FormGroup name={'client_address'} />
        <FormGroup name={'client_province'} />
        <FormGroup name={'client_locality'} />
        <FormGroup name={'client_zipcode'} />
        <FormGroup name={'client_country'} />
      </div>
    )
  }
}

export default InvoicesViewClient;
