import React, { Component } from 'react';
import HeaderSection        from '../components/HeaderSection';
import SidebarSection       from '../components/SidebarSection';

class Layout extends Component {
  render() {
    return (
      <div>
        <HeaderSection />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              <SidebarSection />
            </div>
            <div className='col-md-10'>
              <div>
                { this.props.children }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Layout;
