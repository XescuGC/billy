import React, { Component } from 'react';
import HeaderSection        from '../components/HeaderSection';
import SidebarSection       from '../components/SidebarSection';

class Layout extends Component {
  render() {
    return (
      <div>
        <HeaderSection />
        <SidebarSection />
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default Layout;
