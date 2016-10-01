import { LOAD_CLIENTS, ADD_CLIENT, REMOVE_CLIENT } from '../constants/Client';

const initialState = {
  items: []
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
    default:
      return state;
      break;
  }
}
