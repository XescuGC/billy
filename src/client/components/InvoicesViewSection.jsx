import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import * as ServerActions       from '../actions/server';
import * as InvoiceActions      from '../actions/invoice';
import FormGroup                from './FormGroup';
import InvoicesViewInformation  from './InvoicesViewInformation';
import InvoicesViewItems        from './InvoicesViewItems';
import InvoicesViewTotal        from './InvoicesViewTotal';

class InvoicesViewSection extends Component {
  render() {
    const { invoices, config } = this.props;
    return (
      <div>
        <div className='page-header'>
          <h1>New Invoice</h1>
        </div>
        <form id='create-invoice'>
          <InvoicesViewInformation invoice={invoices.invoice} config={config} />
          <InvoicesViewItems invoice={invoices.invoice} config={config} onAddItem={this.onAddItem.bind(this)} onChangeItem={this.onChangeItem.bind(this)} />
          <InvoicesViewTotal invoice={invoices.invoice} config={config} />
          <button type='submit' className='btn btn-default' onClick={this.onCreateInvoice.bind(this)}>Create Invoice</button>
        </form>
      </div>
    )
  }

  componentDidMount() {
    const { invoices, config, dispatch } = this.props;
    if (!invoices.invoice.vat) {
      dispatch(InvoiceActions.updateInvoiceConfig({ vat: config.vat, pit: config.pit }));
    }
  }

  onAddItem(item) { this.props.dispatch(ServerActions.createItem(item)) }

  onChangeItem(idx, item) {
    console.log(idx, item)
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
    invoices: state.invoices,
    config:   state.config,
  }
}

export default connect(select)(InvoicesViewSection);
