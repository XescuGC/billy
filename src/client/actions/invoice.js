import * as ActionTypes from '../constants/Invoice';

export function loadInvoices(invoices) {
  return { type: ActionTypes.LOAD_INVOICES, payload: { invoices } };
}

export function addItem(item) {
  return { type: ActionTypes.ADD_ITEM, payload: { item } };
}

export function updateInvoiceConfig({vat, pit}) {
  return { type: ActionTypes.UPDATE_INVOICE_CONFIG, payload: { vat, pit } };
}
