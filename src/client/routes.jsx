import React                 from 'react';
import { Route, IndexRoute } from 'react-router'
import Layout                from './containers/Layout';
import InvoicesSection       from './components/InvoicesSection';
import ClientsSection        from './components/ClientsSection';
import InvoiceViewSection    from './components/InvoiceViewSection';

function getRoutes() {
  return (
    <Route path='/' component={Layout} >
      <IndexRoute component={InvoicesSection} />
      <Route path='/invoices' component={InvoicesSection} />
      <Route path='/invoices/:id' component={InvoiceViewSection} />
      <Route path='/clients' component={ClientsSection} />
    </Route>
  )
}
export default getRoutes;
