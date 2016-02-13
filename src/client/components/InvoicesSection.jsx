import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { pushPath }         from 'redux-simple-router';
import Table                from './Table';
import * as ServerActions   from '../actions/server';

class InvoicesSection extends Component {
  render() {
    let { invoices } = this.props;
    return (
      <Table
        columns={['id', 'emitted', 'client_id', 'total', 'options']}
        items={invoices.items}
        options={ this.renderOption.bind(this) }
        newBtn={this.newInvoice.bind(this)}
      />
    )
  }

  componentDidMount() {
    const { invoices, dispatch } = this.props;
    if (!invoices.items.length) dispatch(ServerActions.fetchInvoices());
  }

  renderOption(item) {
    return(
      <button onClick={this.handleClickView.bind(this, item.id)} type="button" className="btn btn-primary">
        View
      </button>
    )
  }

  newInvoice() {
    return (
      <button className='btn btn-success' onClick={this.goToNewInvoice.bind(this)} >
        New Invoice
      </button>
    )
  }

  goToNewInvoice(e) {
    e.preventDefault();
    this.props.dispatch(pushPath('/invoices/new'));
  }

  handleClickView(invoiceId, e) {
    e.preventDefault();
    this.props.dispatch(pushPath(`/invoices/${invoiceId}`));
  }
}

function select(state) {
  return {
    invoices: state.invoices
  }
}

export default connect(select)(InvoicesSection);
