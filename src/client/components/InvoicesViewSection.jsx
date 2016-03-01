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
    const { invoice, config } = this.props;
    return (
      <div>
        <div className='page-header'>
          <h1>New Invoice</h1>
        </div>
        <form id='create-invoice'>
          <InvoicesViewInformation invoice={invoice} config={config} onClientChange={this.handleClientChange.bind(this)} />
          <InvoicesViewItems invoice={invoice} config={config} onAddItem={this.onAddItem.bind(this)} onChangeItem={this.onChangeItem.bind(this)} />
          <InvoicesViewTotal invoice={invoice} config={config} onConfigUpdate={this.handleConfigUpdate.bind(this)} />
          <button type='submit' className='btn btn-default' onClick={this.onCreateInvoice.bind(this)}>Create Invoice</button>
        </form>
      </div>
    )
  }

  componentDidMount() {
    const { invoice, config } = this.props;
    console.log(invoice);
    if (!invoice.vat) this.handleConfigUpdate( config.vat, config.pit );
  }

  onAddItem(item) { this.props.dispatch(ServerActions.createItem(item)) }

  onChangeItem(idx, item) {
    //TODO: Signal the reducer there are changes to be sent to the API
    console.log(idx, item)
  }

  handleConfigUpdate(vat, pit) {
    const { dispatch } = this.props;
    dispatch(InvoiceActions.updateInvoiceConfig({ vat, pit }));
  }

  handleClientChange(client) {
    const { dispatch } = this.props;
    dispatch( InvoiceActions.updateInvoiceClient( client ) );
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
    invoice: state.invoices.invoice,
    config:  state.config,
  }
}

export default connect(select)(InvoicesViewSection);
