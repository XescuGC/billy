import React, { Component } from 'react';
import FormGroup            from './FormGroup';

class InvoicesViewBody extends Component{
  render() {
    return (
      <div>
        <h3>Invoice Lines</h3>
        <input type='text' onKeyPress={this.onKeyPressHandle.bind(this)} />
      </div>
    )
  }

  onKeyPressHandle() {
  }
}

export default InvoicesViewBody;
