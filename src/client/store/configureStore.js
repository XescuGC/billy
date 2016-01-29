import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk            from 'redux-thunk';
import logger           from 'redux-logger';
import rootReducer      from '../reducers';
import { enableBatching } from 'redux-batched-actions';
import { browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import createBrowserHistory       from 'history/lib/createBrowserHistory'

const history = createBrowserHistory();

const reduxRouterMiddleware = syncHistory(history)

const createStoreWithMiddlewares = applyMiddleware(
  reduxRouterMiddleware, thunk, logger()
)(createStore);

export default function configureStore (initialState) {
  const store = createStoreWithMiddlewares(enableBatching(rootReducer), initialState)
  return store;
}

