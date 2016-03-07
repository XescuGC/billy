import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Mustache             from 'mustache';

class InvoicePreview extends Component {
  render() {
    let { invoice, config } = this.props;
    const html = { __html: Mustache.render(config.invoice_template, { config, invoice } ) };
    return ( <div dangerouslySetInnerHTML={ html }></div> );
  }
}

function select(state) {
  return {
    invoice: state.invoices.invoice,
    config:  state.config,
  }
}

export default connect(select)(InvoicePreview);
