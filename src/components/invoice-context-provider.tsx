import React from 'react';
// import { createContext, useState } from 'react';
// import { InvoiceContextType, InvoiceType } from '../models/invoice';

// export const InvoiceContext = createContext<InvoiceContextType>({
//   deleteInvoice: () => {},
//   onSaveInvoice: () => {},
//   client: '',
//   clientCountry: '',
//   supplier: '',
//   supplierCountry: '',
//   isInvoice: false,
// });

// export const InvoiceContextProvider = (props: any) => {
//   const [client, setClient] = useState<string>('');
//   const [clientCountry, setClientCountry] = useState<string>('');
//   const [supplier, setSupplier] = useState<string>('');
//   const [supplierCountry, setSupplierCountry] = useState<string>('');
//   const [isInvoice, setIsInvoice] = useState(false);

//   const deleteInvoice = () => {
//     setIsInvoice(false);
//     setClient('');
//     setClientCountry('');
//     setSupplier('');
//     setSupplierCountry('');
//   };

//   const onSaveInvoice = (invoice: InvoiceType) => {
//     setClient(invoice.client);
//     setClientCountry(invoice.clientCountry);
//     setSupplier(invoice.supplier);
//     setSupplierCountry(invoice.supplierCountry);
//     setIsInvoice(true);
//   };
//   const value = {
//     deleteInvoice,
//     onSaveInvoice,
//     client,
//     clientCountry,
//     supplier,
//     supplierCountry,
//     isInvoice,
//   };
//   return (
//     <InvoiceContext.Provider value={value}>
//       {props.children}
//     </InvoiceContext.Provider>
//   );
// };
