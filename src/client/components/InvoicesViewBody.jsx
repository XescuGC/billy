import React, { Component } from 'react';
import FormGroup            from './FormGroup';

class InvoicesViewBody extends Component{
  constructor(props) {
    super(props);

    let { invoice } = props;
    if (!invoice) invoice = {};
    if (!invoice.items) invoice.items = []
    this.state = {
      invoice: invoice
    }
  }

  render() {
    const { invoice } = this.state;
    return (
      <div>
        <h3>Invoice Items</h3>
        { this.renderItems(invoice.items) }
        { this.renderNewItem() }
      </div>
    )
  }

  renderItems(items) {
    return items.map((item, idx)=> {
      return (
        <div className='row' key={idx}>
          <div className='col-md-8'>
            <input type='text' name={`description[${idx+1}]`} value={item.description} className='form-control' />
          </div>
          <div className='col-md-4'>
            <input type='text' name={`price[${idx+1}]`} value={item.price} className='form-control' />
          </div>
        </div>
      );
    });
  }

  renderNewItem() {
    return (
      <div className='row new-item'>
        <div className='col-md-8'>
          <input type='text' name='description[0]' className='form-control' onKeyPress={this.handleKeyPress.bind(this)} />
        </div>
        <div className='col-md-4'>
          <input type='text' name='price[0]' className='form-control' onKeyPress={this.handleKeyPress.bind(this)} />
        </div>
      </div>
    );
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      let { invoice } = this.state;
      const $inputs = $('.new-item input');
      let values = $('.new-item input').map( function() { return this.value });
      invoice.items.push({description: values[0], price: values[1]})
      this.setState({invoice: invoice});
      $inputs.each(function() { this.value = '' });
      $inputs[0].focus();
    }
  }

}

InvoicesViewBody.propTypes = {
  invoice: React.PropTypes.object
}

export default InvoicesViewBody;
