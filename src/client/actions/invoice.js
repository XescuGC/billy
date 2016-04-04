import * as ActionTypes from '../constants/Invoice';
import { batchActions } from 'redux-batched-actions';
import { pushPath }     from 'redux-simple-router';

export function loadInvoices(invoices) {
  return { type: ActionTypes.LOAD_INVOICES, payload: { invoices } };
}

export function selectInvoice(invoice) {
  return batchActions([
    { type: ActionTypes.SELECT_INVOICE, payload: { invoice } },
    pushPath(`/invoices/${invoice.id}`)
  ])
}

export function addItem(item) {
  return { type: ActionTypes.ADD_ITEM, payload: { item } };
}

export function updateInvoiceConfig({vat, pit}) {
  return { type: ActionTypes.UPDATE_INVOICE_CONFIG, payload: { vat, pit } };
}

export function updateInvoiceClient(client) {
  return { type: ActionTypes.UPDATE_INVOICE_CLIENT, payload: { client } };
}

export function removeInvoice(invoice) {
  return { type: ActionTypes.REMOVE_INVOICE, payload: { invoice } };
}

export function setInvoiceNumber(number) {
  return { type: ActionTypes.SET_INVOICE_NUMBER, payload: { number } };
}

