import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Input                from './Input';

class InvoicesViewTotal extends Component {
  render() {
    const { config, invoice } = this.props;
    return (
      <div className='row'>
        <table>
          <tbody>
            <tr>
              <th>Subtotal:</th>
              <td></td>
              <td>20 {config.currency}</td>
            </tr>
            <tr>
              <th>PIT:</th>
              <td><Input name={'pit'} value={invoice.pit} /></td>
              <td>20 {config.currency}</td>
            </tr>
            <tr>
              <th>VAT:</th>
              <td><Input name={'vat'} value={invoice.vat || config.vat} /></td>
              <td>20 {config.currency}</td>
            </tr>
            <tr>
              <th>Total:</th>
              <td></td>
              <td>20 {config.currency}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

InvoicesViewTotal.propTypes = {
  invoice:  React.PropTypes.object,
  config:   React.PropTypes.object,
}

InvoicesViewTotal.defaultProps = {
  invoice: {}
}

export default InvoicesViewTotal;
