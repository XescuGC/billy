import React, { Component } from 'react';
import Input                from './Input';

class InvoicesViewTotal extends Component {
  render() {
    const { config, invoice } = this.props;
    return (
      <div className='total-container col-md-5 col-md-offset-7'>
        <table>
          <tbody>
            <tr>
              <th>Subtotal:</th>
              <td></td>
              <td>{invoice.subtotal || 0} {config.currency}</td>
            </tr>
            { invoice.pit ?
              <tr>
                <th>PIT:</th>
                <td><Input name={'pit'} value={invoice.pit} onChange={this.onConfigChange.bind(this)} ref='pit' /></td>
                <td>{invoice.pitSubtotal||0} {config.currency}</td>
              </tr>
              : undefined
            }
            <tr>
              <th>VAT:</th>
              <td><input type='text' className='form-control' name={'vat'} value={invoice.vat} onChange={this.onConfigChange.bind(this)} ref='vat' /></td>
              <td>{invoice.vatSubtotal||0} {config.currency}</td>
            </tr>
            <tr>
              <th>Total:</th>
              <td></td>
              <td>{invoice.total||0} {config.currency}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  onConfigChange(e) {
    this.props.onConfigUpdate(this.refs.vat.value, this.refs.pit ? this.refs.pit.value : 0 );
  }
}

InvoicesViewTotal.propTypes = {
  invoice:        React.PropTypes.object,
  config:         React.PropTypes.object,
  onConfigUpdate: React.PropTypes.func.isRequired,
}

InvoicesViewTotal.defaultProps = {
  invoice: {}
}

export default InvoicesViewTotal;
