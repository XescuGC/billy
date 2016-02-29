import React, { Component } from 'react';

class Table extends Component {
  render() {
    const { columns, items } = this.props;

    return (
      <table className="table table-striped">
        <thead>
          <tr>{ this.generateHeaders(columns) }</tr>
        </thead>
        <tbody>{ this.generateBody(columns, items) }</tbody>
      </table>
    )
  }

  generateHeaders(columns) {
    const { header } = this.props;
    let headers = columns.map(c => header[c] ? header[c]() : <th key={c} >{c}</th>);
    return headers;
  }

  generateBody(columns, items) {
    const { row } = this.props;
    return items.map(i => {
      return (
        <tr key={i.id}>
          { columns.map(c => row[c] ? row[c](i) : <td key={c} >{i[c]}</td>) }
        </tr>
      )
    })
  }
}

Table.propTypes = {
  items:    React.PropTypes.array.isRequired,
  columns:  React.PropTypes.array.isRequired,
  header:  React.PropTypes.object,
  row:     React.PropTypes.object,
}

Table.defaultProps = {
  header: {},
  row: {},
}

export default Table;
