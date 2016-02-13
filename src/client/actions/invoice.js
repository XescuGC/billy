import * as ActionTypes from '../constants/Invoice';

export function loadInvoices(invoices) {
  return { type: ActionTypes.LOAD_INVOICES, payload: { invoices } };
}
