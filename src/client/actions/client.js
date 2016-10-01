import * as ActionTypes from '../constants/Client';

export function loadClients(clients) {
  return { type: ActionTypes.LOAD_CLIENTS, payload: { clients } };
}

export function addClient(client) {
  return { type: ActionTypes.ADD_CLIENT, payload: { client } };
}

export function removeClient(client) {
  return { type: ActionTypes.REMOVE_CLIENT, payload: { client } };
}
