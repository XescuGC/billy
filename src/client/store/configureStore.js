import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk                         from 'redux-thunk';
import logger                        from 'redux-logger';
import rootReducer                   from '../reducers';
import { enableBatching }            from 'redux-batched-actions';

const createStoreWithMiddlewares = applyMiddleware(
  thunk, logger({logger: console})
)(createStore);

export default function configureStore (initialState) {
  const store = createStoreWithMiddlewares(enableBatching(rootReducer), initialState)
  return store;
}

