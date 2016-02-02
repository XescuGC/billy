import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { pushPath }         from 'redux-simple-router'

class SidebarSection extends Component {
  render() {
    let items = this.props.sidebar.map(i => this.renderItem(i));
    return (
      <ul className="nav nav-pills nav-stacked">
        { items }
      </ul>
    )
  }

  renderItem(item) {
    return (
      <li role="presentation" className={item.active ? 'active' : ''} onClick={this.handleLinkClicked.bind(this, item.slug)} key={item.slug}><a href={`/${item.slug}`}>{item.name}</a></li>
    )
  }

  handleLinkClicked(slug, e) {
    e.preventDefault();
    this.props.dispatch(pushPath(`/${slug}`))
  }
}

function select(state) {
  return {
    sidebar: state.sidebar
  }
}

export default connect(select)(SidebarSection);

