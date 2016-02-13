import { FETCHED, FETCHING } from '../constants/Server';

let initialState = { };

export default function reduce(state=initialState, action) {
  let { payload } = action;

  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, { fetching: true });
      break;
    case FETCHED:
      return Object.assign({}, state, { fetching: false });
      break;
    default:
      return state;
      break;
  }
}
