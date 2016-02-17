import { combineReducers } from 'redux';
import invoices from './invoices';
import global from './global';
import sidebar from './sidebar';
import clients from './clients';
import config from './config';
import { routeReducer } from 'redux-simple-router'

const rootRouter = combineReducers({
  invoices, sidebar, clients, config, global, routing: routeReducer
})

export default rootRouter;
