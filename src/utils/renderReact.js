import React                    from 'react';
import ReactDOMServer           from 'react-dom/server';
import { match, RoutingContext }from 'react-router';
import getRoutes                from '../client/routes';
import configureStore           from '../client/store/configureStore';
import { Provider }             from 'react-redux'
import fs                       from 'fs';

function renderReact() {
  return (req, res, nex) => {
    match({ routes: getRoutes(), location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const store = configureStore(res.locals.state);
        let reactHTML = ReactDOMServer.renderToString(<Provider store={store}><RoutingContext {...renderProps} /></Provider>);
        res.status(200).send(replaceState( store, reactHTML ));
      } else {
        res.status(404).send('Not found')
      }
    })
  }
}

function replaceState( store, reactHTML ) {
  const indexHTML = fs.readFileSync(`${__dirname}/../index.html`).toString();
  return indexHTML
    .replace(/\/\/\sINITIAL_STATE/,`window.INITIAL_STATE=${JSON.stringify(store.getState())}`)
    .replace(/<!-- REACT_HTML -->/, reactHTML)
}

export default renderReact;
