import React, { Component } from 'react';
import LogoSection          from '../components/LogoSection';
import SearchSection        from '../components/SearchSection';
import SidebarSection       from '../components/SidebarSection';

class Layout extends Component {
  render() {
    return (
      <div>
        <div className='container-fluid'>
          <div className='row header-command'>
            <div className='logo-container col-md-2'>
              <LogoSection />
            </div>
            <div className='col-md-10'>
              <SearchSection />
            </div>
          </div>
          <div className='row main'>
            <div className='sidebar-container col-md-2'>
              <SidebarSection />
            </div>
            <div className='col-md-8 col-md-offset-1'>
              { this.props.children }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Layout;
