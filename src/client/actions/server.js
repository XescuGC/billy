import { batchActions } from 'redux-batched-actions';
import { request } from '../utils';
import { loadClients } from './client';
import { loadInvoices } from './invoice';
import * as ActionTypes from '../constants/Server';

export function fetchClients() {
  return dispatch => {
    dispatch(fetching());
    request('clients').then(json => {
      dispatch(batchActions([
        fetched(),
        loadClients(json),
      ]))
    });
  };
}

export function fetchInvoices() {
  return dispatch => {
    dispatch(fetching());
    request('invoices').then(json => {
      dispatch(batchActions([
        fetched(),
        loadInvoices(json),
      ]))
    });
  };
}

export function createClient(client) {
  return dispatch => {
    dispatch(fetching());
    request('createClient', client).then(json => {
      dispatch(batchActions([
        fetched()
        //loadClients(json),
      ]));
    });
  };
}

export function fetching() {
  return { type: ActionTypes.FETCHING };
}

export function fetched() {
  return { type: ActionTypes.FETCHED };
}
