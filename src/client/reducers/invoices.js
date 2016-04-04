import { SELECT_INVOICE, LOAD_INVOICES, ADD_ITEM, UPDATE_INVOICE_CONFIG, UPDATE_INVOICE_CLIENT, REMOVE_INVOICE, SET_INVOICE_NUMBER } from '../constants/Invoice';
import { pipeReducer }             from '../utils';

let initialState = {
  items: [],
  invoice: { items: [] },
};

export default function reducer(state=initialState, action) {
  let { payload } = action;

  switch (action.type) {
    case UPDATE_INVOICE_CONFIG:
    case ADD_ITEM:
      return [bindInvoiceAction, recalculateTotal].reduce(pipeReducer.bind({payload, action}), state);
      break;
    case SELECT_INVOICE:
    case SET_INVOICE_NUMBER:
    case UPDATE_INVOICE_CLIENT:
      return bindInvoiceAction( state, payload, action );
      break;
    case LOAD_INVOICES:
      return Object.assign({}, state, { items: payload.invoices });
      break;
    case REMOVE_INVOICE:
      return Object.assign({}, state, { items: state.items.filter( item => item.id !== payload.invoice.id) });
      break;
    default:
      return state;
      break;
  }
}

function invoiceReducer(state, action) {
  let { payload } = action;

  switch (action.type) {
    case ADD_ITEM:
      return Object.assign({}, state, { items: [...state.items, payload.item] });
      break;
    case UPDATE_INVOICE_CONFIG:
      return Object.assign({}, state, { pit: payload.pit*1, vat: payload.vat*1 });
      break;
    case SELECT_INVOICE:
      return Object.assign({}, payload.invoice);
      break;
    case UPDATE_INVOICE_CLIENT:
      return Object.assign({}, state, { client: payload.client });
      break;
    case SET_INVOICE_NUMBER:
      return Object.assign({}, state, { number: payload.number });
      break;
    default:
      return state;
      break;
  }
}

function recalculateTotal(state, action) {
  const subtotal = state.invoice.items.reduce((c, n) => c + n.price*1, 0);
  const vatSubtotal = (subtotal * state.invoice.vat||0) / 100;
  const pitSubtotal = (subtotal * state.invoice.pit||0) / 100;
  const total = subtotal + vatSubtotal - pitSubtotal;
  return Object.assign(
    {}, state, { invoice: Object.assign(
      {}, state.invoice, { total: total.toFixed(2), pitSubtotal: pitSubtotal.toFixed(2), vatSubtotal: vatSubtotal.toFixed(2), subtotal: subtotal.toFixed(2) }
    )});
  return state;
}

function bindInvoiceAction(state, payload, action) {
  return Object.assign({}, state, { invoice: invoiceReducer(state.invoice, action)})
}

