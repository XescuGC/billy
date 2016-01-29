import React, { Component } from 'react';
import { connect }          from 'react-redux';

class SidebarSection extends Component {
  render() {
    return (
      <h5>Sidebar</h5>
    )
  }
}

function select(state) {
  return {
    invoices: state.invoices
  }
}

export default connect(select)(SidebarSection);

