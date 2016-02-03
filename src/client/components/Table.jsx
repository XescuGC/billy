import React, { Component } from 'react';

class Table extends Component {
  render() {
    const { columns, items, options } = this.props;
    const headers = this.generateHeaders(columns, options);
    const body = this.generateBody(columns, items, options);
    return (
      <table className="table table-striped">
        <thead>
          <tr>{ headers }</tr>
        </thead>
        <tbody>{ body }</tbody>
      </table>
    )
  }

  generateHeaders(columns, options) {
    const headers = columns.map(c => <th key={c} >{c}</th>);
    return headers;
  }

  generateBody(columns, items, options) {
    return items.map(i => {
      let optionTmp;
      if (options) optionTmp = <td key={'options'}>{ options(i) }</td>;
      return (
        <tr key={i.id}>
          { columns.map(c => <td key={c} >{ this.props[c] ? this.props[c](i) : i[c] }</td>) }
        </tr>
      )
    })
  }
}

Table.propTypes = {
  items: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
}

export default Table;
