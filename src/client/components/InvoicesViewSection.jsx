import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import * as ServerActions       from '../actions/server';
import FormGroup                from './FormGroup';
import InvoicesViewInformation  from './InvoicesViewInformation';
import InvoicesViewBody         from './InvoicesViewBody';

class InvoicesViewSection extends Component {
  render() {
    return (
      <div>
        <div className='page-header'>
          <h1>New Invoice</h1>
        </div>
        <form id='create-invoice'>
          <InvoicesViewInformation />
          <InvoicesViewBody />
          <button type='submit' className='btn btn-default' onClick={this.onCreateInvoice.bind(this)}>Create Invoice</button>
        </form>
      </div>
    )
  }
  onCreateInvoice(e) {
    e.preventDefault();
    let invoice = {};
    $('#create-invoice').serializeArray().forEach( i => invoice[i.name] = i.value );
    this.props.dispatch(ServerActions.createInvoice(invoice));
  }
}

function select(state) {
  return {
    invoices: state.invoices
  }
}

export default connect(select)(InvoicesViewSection);
