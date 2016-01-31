import { combineReducers } from 'redux';
import invoices from './invoices';
import { routeReducer } from 'redux-simple-router'

const rootRouter = combineReducers({
  invoices, routing: routeReducer
})

export default rootRouter;
