import React, { Component } from 'react';
import { connect }          from 'react-redux';

class InvoicesSection extends Component {
  render() {
    return (
      <h5>Invoices</h5>
    )
  }
}

function select(state) {
  return {
    invoices: state.invoices
  }
}

export default connect(select)(InvoicesSection);
