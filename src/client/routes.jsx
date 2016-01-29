import React                 from 'react';
import { Route, IndexRoute } from 'react-router'
import Layout                from './containers/Layout';
import InvoicesSection       from './components/InvoicesSection';

function getRoutes() {
  return (
    <Route path='/' component={Layout} >
      <IndexRoute component={InvoicesSection} />
    </Route>
  )
}
export default getRoutes;
