import React, { Component } from 'react';
import { connect }          from 'react-redux';

class InvoicesSection extends Component {
  render() {
    let invoices = this.props.invoices.items.map(i => this.renderInvoice(i));
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emitted</th>
            <th>Client</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { invoices }
        </tbody>
      </table>
    )
  }

  renderInvoice(invoice) {
    return (
      <tr key={ invoice.id }>
        <th scope="row">{ invoice.id }</th>
        <td>{ invoice.emitted.toString() }</td>
        <td>{ invoice.client_id }</td>
        <td>{ 0 }</td>
        <td><button type="button" className="btn btn-primary">View</button></td>
      </tr>
    )
  }
}

function select(state) {
  return {
    invoices: state.invoices
  }
}

export default connect(select)(InvoicesSection);
