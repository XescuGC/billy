import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { pushPath }             from 'redux-simple-router';
import * as ServerActions       from '../actions/server';
import * as InvoiceActions      from '../actions/invoice';
import FormGroup                from './FormGroup';
import InvoicesViewInformation  from './InvoicesViewInformation';
import InvoicesViewItems        from './InvoicesViewItems';
import InvoicesViewTotal        from './InvoicesViewTotal';
import Mustache                 from 'mustache';

class InvoicesViewSection extends Component {
  render() {
    const { invoice, config } = this.props;
    return (
      <div>
        <div className='page-header'>
          <div className="form-inline pull-right">
            <div className="form-group">
              <label for="num">Number: </label>
              <input type="text" className="form-control" value={invoice.number} id="num" />
            </div>
          </div>
          <h1>{ invoice.id ? 'Edit' : 'New'} invoice</h1>
        </div>
        <form id='create-invoice'>
          <InvoicesViewInformation invoice={invoice} config={config} onClientChange={this.handleClientChange.bind(this)} />
          <InvoicesViewItems invoice={invoice} config={config} onAddItem={this.onAddItem.bind(this)} onChangeItem={this.onChangeItem.bind(this)} />
          <InvoicesViewTotal invoice={invoice} config={config} onConfigUpdate={this.handleConfigUpdate.bind(this)} />
          { invoice.id ?
            <button type='submit' className='btn btn-default' onClick={this.onUpdateInvoice.bind(this)}>Save</button>
            :
            <button type='submit' className='btn btn-default' onClick={this.onCreateInvoice.bind(this)}>Save</button>
          }
          <button className='btn btn-info' onClick={this.goToPreviewInvoice.bind(this)}>Preview</button>
        </form>
      </div>
    )
  }

  componentDidMount() {
    const { invoice, config } = this.props;
    //console.log(invoice);
    if (!invoice.vat) this.handleConfigUpdate( config.vat, config.pit );
    if (!invoice.number) this.getNextNumber();
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

  getNextNumber() {
    const { dispatch, config } = this.props;
    const nextNumber = Mustache.render(config.invoice_number_template, { number: ((config.invoice_number||0)*1)+1 } );
    dispatch( InvoiceActions.setInvoiceNumber(nextNumber) );
  }

  onCreateInvoice(e) {
    e.preventDefault();
    this.props.dispatch(ServerActions.createInvoice(this.props.invoice));
  }

  onUpdateInvoice(e) {
    e.preventDefault();
    this.props.dispatch(ServerActions.updateInvoice(this.props.invoice));
  }

  goToPreviewInvoice(e) {
    e.preventDefault();
    const { dispatch, invoice } = this.props;
    dispatch(pushPath(`/invoices/${invoice.id || 'draft'}/preview`));
  }
}

function select(state) {
  return {
    invoice: state.invoices.invoice,
    config:  state.config,
  }
}

export default connect(select)(InvoicesViewSection);
