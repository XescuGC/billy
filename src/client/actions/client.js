import * as ActionTypes from '../constants/Client';
import { batchActions } from 'redux-batched-actions';
import { pushPath }     from 'redux-simple-router';

export function loadClients(clients) {
  return { type: ActionTypes.LOAD_CLIENTS, payload: { clients } };
}

export function addClient(client) {
  return { type: ActionTypes.ADD_CLIENT, payload: { client } };
}

export function removeClient(client) {
  return { type: ActionTypes.REMOVE_CLIENT, payload: { client } };
}

export function selectClient(client) {
  return batchActions([
    { type: ActionTypes.SELECT_CLIENT, payload: { client } },
    pushPath(`/clients/${client.id}`)
  ])
}

export function editClient(client) {
  return { type: ActionTypes.EDIT_CLIENT, payload: { client } };
}
