import React, { Component }       from 'react';
import { Provider }               from 'react-redux';
import { Router, browserHistory } from 'react-router'
import configureStore             from '../store/configureStore';
import { createLocation }         from 'history'
import createBrowserHistory       from 'history/lib/createBrowserHistory'
import getRoutes                  from '../routes';
import { syncReduxAndRouter }     from 'redux-simple-router'

const history = createBrowserHistory();

const store = configureStore(window.INITIAL_STATE);

syncReduxAndRouter(history, store)

class Root extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router history={history}>
          { getRoutes() }
        </Router>
      </Provider>
    );
  }
}

export default Root;

