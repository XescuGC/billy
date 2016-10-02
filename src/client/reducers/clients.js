import { EDIT_CLIENT, SELECT_CLIENT, LOAD_CLIENTS, ADD_CLIENT, REMOVE_CLIENT } from '../constants/Client';

const initialState = {
  items: [],
  client: {}
}

export default function reducer(state=initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case LOAD_CLIENTS:
      return Object.assign({}, state, { items: payload.clients });
    case ADD_CLIENT:
      return Object.assign({}, state, { items: [payload.client, ...state.items] })
    case REMOVE_CLIENT:
      return Object.assign({}, state, { items:  state.items.filter(c => c.id !== payload.client.id)})
    case EDIT_CLIENT:
      return Object.assign({}, state, { items:  state.items.map(c => c.id === payload.client.id ? payload.client : c)})
    case SELECT_CLIENT:
      return Object.assign({}, state, { client: payload.client });
    default:
      return state;
      break;
  }
}
