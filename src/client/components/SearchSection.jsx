import React, { Component } from 'react';
import { connect }          from 'react-redux';

class SearchSection extends Component {
  render() {
    return (
      <form className="form-inline pull-right">
        <div className="form-group">
          <input type="text" className="form-control input-lg" placeholder="What are you looking for?"/>
        </div>
        <button type="submit" className="btn btn-lg btn-default">Search</button>
      </form>
    )
  }
}

function select(state) {
  return {
    clients: state.clients
  }
}

export default connect(select)(SearchSection);
