import { Country } from './country';

export interface InvoiceType extends CreateInvoiceType {
  id: number;
  supplierCountry: Country | string;
  clientCountry: Country | string;
}

export interface CreateInvoiceType extends InvoiceFinancialData {
  client: string;
  clientCountry: Country | string | '';
  clientPerson: ClientPerson;
  product: string;
  quantity: number;
  pricePerQuantity: number;
  supplier: string;
  supplierCountry: Country | string | '';
  tax: number;
  vat: number;
  createdAt: string;
}
export interface InvoiceFinancialData {
  isSupplierVatPayer: boolean;
  totalSum: number;
  isClientVatPayer: boolean;
}

export enum ClientPerson {
  JURIDICAL = 'juridical',
  PHYSICAL = 'physical',
}
