import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { pushPath }         from 'redux-simple-router';
import Table                from './Table';
import * as ServerActions   from '../actions/server';
import * as InvoceActions   from '../actions/invoice';

class InvoicesSection extends Component {
  render() {
    let { invoices } = this.props;
    return (
      <Table
        columns={['id', 'emitted', 'client_id', 'total', 'options']}
        items={invoices.items}
        header={{
          options: this.renderHeaderOptions.bind(this)
        }}
        row={{
          options: this.renderRowOptions.bind(this)
        }}
      />
    )
  }

  componentDidMount() {
    const { invoices, dispatch } = this.props;
    if (!invoices.items.length) dispatch(ServerActions.fetchInvoices());
  }

  renderRowOptions(invoice) {
    return(
      <td key='options' style={{textAlign: 'right'}}>
        <button onClick={this.handleClickView.bind(this, invoice)} type="button" className="btn btn-primary">
          View
        </button>
      </td>
    )
  }

  renderHeaderOptions() {
    return (
      <th style={{textAlign: 'right'}}  key='options'>
        <button className='btn btn-success' onClick={this.goToNewInvoice.bind(this)} >
          <span className='glyphicon glyphicon-plus' ariaHidden='true'></span>
          &nbsp;New
        </button>
      </th>
    ) // TODO: remove nbsp and fix css
  }

  goToNewInvoice(e) {
    e.preventDefault();
    this.props.dispatch(pushPath('/invoices/new'));
  }

  handleClickView(invoice, e) {
    e.preventDefault();
    this.props.dispatch(InvoceActions.selectInvoice(invoice))
  }
}

function select(state) {
  return {
    invoices: state.invoices
  }
}

export default connect(select)(InvoicesSection);
