import { LOAD_INVOICES, ADD_ITEM, UPDATE_INVOICE_CONFIG } from '../constants/Invoice';
import { pipeReducer }             from '../utils';


let initialState = {
  items: [],
  invoice: { items: [] },
};

export default function reducer(state=initialState, action) {
  let { payload } = action;

  switch (action.type) {
    case ADD_ITEM:
      return [bindInvoiceAction, recalculateTotal].reduce(pipeReducer.bind({payload, action}), state);
      break;
    case LOAD_INVOICES:
      return Object.assign({}, state, { items: payload.invoices });
      break;
    case UPDATE_INVOICE_CONFIG:
      return bindInvoiceAction(state, payload, action)
      break;
    default:
      return state;
      break;
  }
}

function invoiceItemReducer(state, action) {
  let { payload } = action;

  switch (action.type) {
    case ADD_ITEM:
      const items = state.items;
      items.push(payload.item)
      return Object.assign({}, state, { items });
      break;
    case UPDATE_INVOICE_CONFIG:
      return Object.assign({}, state, { pit: payload.pit*1, vat: payload.vat*1 });
      break;
    default:
      return state;
      break;
  }
}

function recalculateTotal(state, action) {
  console.log(state);
  if (state.invoice.vat && state.invoice.pit) {
    const subtotal = state.invoice.items.reduce((c, n) => c + n.price*1, 0);
    const vatSubtotal = subtotal * (state.invoice.vat /100);
    const pitSubtotal = subtotal * (state.invoice.pit /100);
    const total = subtotal + vatSubtotal - pitSubtotal;
    return Object.assign(
      {}, state, { invoice: Object.assign(
        {}, state.invoice, { total: total.toFixed(2), pitSubtotal: pitSubtotal.toFixed(2), vatSubtotal: vatSubtotal.toFixed(2), subtotal: subtotal.toFixed(2) }
      )});
  }
  return state;
}

function bindInvoiceAction(state, payload, action) {
  return Object.assign({}, state, { invoice: invoiceItemReducer(state.invoice, action)})
}

