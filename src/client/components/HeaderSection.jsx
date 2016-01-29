import React, { Component } from 'react';
import { connect }          from 'react-redux';

class HeaderSection extends Component {
  render() {
    return (
      <h5>Header</h5>
    )
  }
}

function select(state) {
  return {
    invoices: state.invoices
  }
}

export default connect(select)(HeaderSection);
