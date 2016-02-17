import React                 from 'react';
import { Route, IndexRoute } from 'react-router'
import Layout                from './containers/Layout';
import InvoicesSection       from './components/InvoicesSection';
import ClientsSection        from './components/ClientsSection';
import ClientsNewSection     from './components/ClientsNewSection';
import InvoicesViewSection   from './components/InvoicesViewSection';
import ConfigSection         from './components/ConfigSection';

function getRoutes() {
  return (
    <Route path='/' component={Layout} >
      <IndexRoute component={InvoicesSection} />
      <Route path='/invoices' component={InvoicesSection} />
      <Route path='/invoices/new' component={InvoicesViewSection} />
      <Route path='/invoices/:id' component={InvoicesViewSection} />
      <Route path='/clients' component={ClientsSection} />
      <Route path='/clients/new' component={ClientsNewSection} />
      <Route path='/config' component={ConfigSection} />
    </Route>
  )
}
export default getRoutes;
