import React, { Component }       from 'react';
import { Provider }               from 'react-redux';
import { Router, browserHistory }  from 'react-router'
import configureStore             from '../store/configureStore';
import createBrowserHistory       from 'history/lib/createBrowserHistory'
import getRoutes                  from '../routes';

const store = configureStore();
const history = createBrowserHistory();

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

