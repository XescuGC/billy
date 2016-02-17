import { LOAD_CONFIG } from '../constants/Config';

const initialState = { };

export default function reducer(state=initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case LOAD_CONFIG:
      return Object.assign({}, state, payload.config);
      break;
    default:
      return state;
      break;
  }
}
