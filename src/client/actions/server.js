import { batchActions } from 'redux-batched-actions';
import { request } from '../utils';
import { editClient, addClient, removeClient, loadClients } from './client';
import { loadInvoices, addItem, removeInvoice } from './invoice';
import { loadConfig } from './config';
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

export function createItem(item) {
  return dispatch => {
    dispatch(batchActions([
      fetching(),
      addItem(item),
      fetched(),
    ]));
  }
}

export function updateConfig(config) {
  console.log(config);
  return dispatch => {
    dispatch(fetching());
    request('updateConfig', config).then(json => {
      dispatch(batchActions([
        fetched(),
        loadConfig(json)
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
        fetched(),
        addClient(json),
      ]));
    });
  };
}

export function updateClient(client) {
  return dispatch => {
    dispatch(fetching());
    request('updateClient', client).then(json => {
      dispatch(batchActions([
        fetched(),
        editClient(json),
      ]));
    });
  };
}

export function deleteClient(client) {
  return dispatch => {
    dispatch(fetching());
    request('deleteClient', client).then(json => {
      dispatch(batchActions([
        fetched(),
        removeClient(client),
      ]));
    });
  };
}

export function fetchConfig() {
  return dispatch => {
    dispatch(fetching());
    request('config').then(json => {
      dispatch(batchActions([
        fetched(),
        loadConfig(json),
      ]));
    });
  };
}

export function createInvoice(invoice) {
  return dispatch => {
    dispatch(fetching());
    request('createInvoice', invoice).then(json => {
      dispatch(fetched());
      dispatch(fetchInvoices());
    });
  };
}

export function updateInvoice(invoice) {
  return dispatch => {
    dispatch(fetching());
    request('updateInvoice', invoice).then(json => {
      dispatch(fetched());
      dispatch(fetchInvoices());
    });
  };
}

export function deleteInvoice(invoice) {
  return dispatch => {
    dispatch(fetching());
    request('deleteInvoice', invoice).then(json => {
      dispatch(batchActions([ fetched(), removeInvoice(invoice) ]));
    });
  };
}

export function fetching() {
  return { type: ActionTypes.FETCHING };
}

export function fetched() {
  return { type: ActionTypes.FETCHED };
}
