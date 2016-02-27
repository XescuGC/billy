import React, { Component } from 'react';

class Table extends Component {
  render() {
    const { columns, items } = this.props;
    const headers = this.generateHeaders(columns);
    const body = this.generateBody(columns, items);
    return (
      <table className="table table-striped">
        <thead>
          <tr>{ headers }</tr>
        </thead>
        <tbody>{ body }</tbody>
      </table>
    )
  }

  generateHeaders(columns) {
    const { newBtn } = this.props;
    let headers = columns.map(c => <th key={c} >{c}</th>);
    if (newBtn) headers[headers.length-1] = (<th style={{textAlign: 'right'}} key='create'>{newBtn()}</th>);
    return headers;
  }

  generateBody(columns, items) {
    return items.map(i => {
      return (
        <tr key={i.id}>
          { columns.map(c => <td key={c} style={ this.props[c] ? { textAlign: 'right' } : {} }>{ this.props[c] ? this.props[c](i) : i[c] }</td>) }
        </tr>
      )
    })
  }
}

Table.propTypes = {
  items:    React.PropTypes.array.isRequired,
  columns:  React.PropTypes.array.isRequired,
  create:   React.PropTypes.func,
}

export default Table;
