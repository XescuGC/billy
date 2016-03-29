import React, { Component } from 'react';
import FormGroup            from './FormGroup';
import Input                from './Input';

class InvoicesViewItems extends Component{

  render() {
    const { invoice } = this.props;
    return (
      <div className='items'>
        <h3>Items</h3>
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
            <Input name={`description[${idx+1}]`} value={item.description}/>
          </div>
          <div className='col-md-4'>
            <Input name={`price[${idx+1}]`} value={item.price} />
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
      let { invoice, onAddItem } = this.props;
      const $inputs = $('.new-item input');
      let values = $('.new-item input').map( function() { return this.value });
      const item = { description: values[0], price: values[1] };
      onAddItem(item);
      $inputs.each(function() { this.value = '' });
      $inputs[0].focus();
    }
  }

}

InvoicesViewItems.propTypes = {
  invoice:       React.PropTypes.object,
  config:        React.PropTypes.object,
  onAddItem:     React.PropTypes.func.isRequired,
  onChangeItem:  React.PropTypes.func.isRequired,
}

InvoicesViewItems.defaultProps = {
  invoice:  { items: [] }
}

export default InvoicesViewItems;
