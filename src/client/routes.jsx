import React                 from 'react';
import { Route, IndexRoute } from 'react-router'
import Layout                from './containers/Layout';
import InvoicesSection       from './components/InvoicesSection';
import ClientsSection        from './components/ClientsSection';
import ClientsViewSection    from './components/ClientsViewSection';
import InvoicesViewSection   from './components/InvoicesViewSection';
import InvoicePreview        from './components/InvoicePreview';
import ConfigSection         from './components/ConfigSection';

function getRoutes() {
  return [
    <Route path='/' component={Layout} >
      <IndexRoute                component={InvoicesSection} />
      <Route path='invoices'     component={InvoicesSection} />
      <Route path='invoices/new' component={InvoicesViewSection} />
      <Route path='invoices/:id' component={InvoicesViewSection} />
      <Route path='clients'      component={ClientsSection} />
      <Route path='clients/new'  component={ClientsViewSection} />
      <Route path='clients/:id'  component={ClientsViewSection} />
      <Route path='config'       component={ConfigSection} />
    </Route>
    ,
    <Route path='invoices/:id/preview' component={InvoicePreview} />
  ]
}

export default getRoutes;
