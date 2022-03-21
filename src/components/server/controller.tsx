import axios from 'axios';
import { InvoiceType } from '../../models/invoice';

export const getInvoicesApi = async () => {
  return await axios.get('http://localhost:3004/invoices?_sort=id&_order=desc');
};

export const getInvoiceByIdApi = async (id: number) => {
  return await axios.get(`http://localhost:3004/invoices/${id}`);
};

export const saveInvoiceApi = async (invoice: InvoiceType) => {
  return axios.post('http://localhost:3004/invoices', invoice);
};

export const updateInvoiceApi = async (id: number, invoice: InvoiceType) => {
  return axios.patch(`http://localhost:3004/invoices/${id}`, invoice);
};

export const deleteInvoiceApi = async (id: number) => {
  return await axios.delete(`http://localhost:3004/invoices/${id}`);
};
