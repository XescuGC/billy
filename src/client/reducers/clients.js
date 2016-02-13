import { LOAD_CLIENTS } from '../constants/Client';

const initialState = {
  items: []
}

export default function reducer(state=initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case LOAD_CLIENTS:
      return Object.assign({}, state, { items: payload.clients });
      break;
    default:
      return state;
      break;
  }
}
