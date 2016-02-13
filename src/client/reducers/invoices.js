import { LOAD_INVOICES } from '../constants/Invoice';

let initialState = {
  items: []
};

export default function reducer(state=initialState, action) {
  let { payload } = action;

  switch (action.type) {
    case LOAD_INVOICES:
      return Object.assign({}, state, { items: payload.invoices });
      break;
    default:
      return state;
      break;
  }
}
