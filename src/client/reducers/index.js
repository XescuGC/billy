import { combineReducers } from 'redux';
import invoices from './invoices';
import { routeReducer } from 'react-router-redux'

const rootRouter = combineReducers({
  invoices, routing: routeReducer
})

export default rootRouter;
