import { Country } from './country';

export interface InvoiceType extends CreateInvoiceType {
  id: number;
  supplierCountry: Country;
  clientCountry: Country;
}

export interface InvoiceFinancialData {
  isSupplierVatPayer: boolean;
  totalSum: number;
  isClientVatPayer: boolean;
}

export interface CreateInvoiceType extends InvoiceFinancialData {
  client: string;
  clientCountry: Country | '';
  clientPerson: ClientPerson;
  product: string;
  quantity: number;
  pricePerQuantity: number;
  supplier: string;
  supplierCountry: Country | '';
  tax: number;
  vat: number;
  notTouched: boolean;
  createdAt: string;
}

export enum ClientPerson {
  JURIDICAL = 'juridical',
  PHYSICAL = 'physical',
}
