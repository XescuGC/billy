import * as ActionTypes from '../constants/Client';

export function loadClients(clients) {
  return { type: ActionTypes.LOAD_CLIENTS, payload: { clients } };
}
