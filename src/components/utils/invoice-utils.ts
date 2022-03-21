import { RegionBlock } from '../../models/country';
import { InvoiceFinancialData, InvoiceType } from '../../models/invoice';

const calcWithVat = (totalSum: number, percent: number) => {
  return +(totalSum * ((100 + percent) / 100)).toFixed(2);
};

export const calculateTax = async (
  invoice: InvoiceFinancialData &
    Pick<InvoiceType, 'clientCountry' | 'supplierCountry'>
) => {
  // Supplier is not VAT payer
  if (!invoice.isSupplierVatPayer) {
    return { sumWithVat: invoice.totalSum, vat: 0 };
  }
  const isClientEuCountry = invoice.clientCountry.regionalBlocs.some(
    (block) => block.acronym === RegionBlock.EU
  );
  //Supplier is VAT payer and client is over Europe Union VAT = 0%
  if (invoice.isSupplierVatPayer && !isClientEuCountry) {
    return { sumWithVat: invoice.totalSum, vat: 0 };
  }
  // Supplier is VAT payer. Client is not VAT payer lives in Europe Union and not the same country as supplier
  const isSameCountry =
    invoice.clientCountry.name === invoice.supplierCountry.name;
  if (
    invoice.isSupplierVatPayer &&
    !invoice.isClientVatPayer &&
    isClientEuCountry &&
    !isSameCountry
  ) {
    // kadangi prie valstybiu nera PVM, tai tiesiog parinkau random, nes paprastai parinktum tos salies
    const vat = 15;
    return { sumWithVat: calcWithVat(invoice.totalSum, vat), vat };
  }

  // Supplier is VAT payer.Client is VAT payer lives in Europe Union and not the same country as supplier
  if (
    invoice.isSupplierVatPayer &&
    invoice.isClientVatPayer &&
    isClientEuCountry &&
    !isSameCountry
  ) {
    return { sumWithVat: invoice.totalSum, vat: 0 };
  }

  // Supplier is VAT payer. Client and supplier from the same country
  if (invoice.isSupplierVatPayer && isSameCountry) {
    // kadangi prie valstybiu nera PVM, tai tiesiog parinkau random, nes paprastai parinktum tos salies
    const vat = 21;
    return { sumWithVat: calcWithVat(invoice.totalSum, vat), vat };
  }
};
