import { useContext, useState, useEffect, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import {
  CreateInvoiceType,
  ClientPerson,
  InvoiceType,
} from '../../models/invoice';
import InputFormik from '../reuseable-components/input-formik';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import SelectField from '../reuseable-components/select';
import { getCountriesApi } from '../../service/api';
import { SnackbarContext } from '../snackbar-context';
import { Country } from '../../models/country';
import { saveInvoiceApi } from '../server/controller';
import FormLabel from '@mui/material/FormLabel';
import { calculateTax } from '../utils/invoice-utils';
import Divider from '@mui/material/Divider';

const invoiceFormSchema = Yup.object().shape({
  client: Yup.string().required('Įrašykite klientą'),
  clientCountry: Yup.object().required('Pasirinkite valstybę'),
  supplier: Yup.string().required('Įrašykite tiekėją'),
  supplierCountry: Yup.object().required('Pasirinkite valstybę'),
  product: Yup.string().required('Įrašykite produktą'),
  quantity: Yup.number()
    .not([0], 'Įrašykite kiekį')
    .required('Įrašykite kiekį'),
  pricePerQuantity: Yup.number()
    .not([0], 'Įrašykite vieneto kainą')
    .required('Įrašykite kainą'),
});

const InvoiceForm = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const { handleOpenSnackBar } = useContext(SnackbarContext);

  const getCountries = useCallback(async () => {
    try {
      const response = await getCountriesApi();
      const countriesNames = response.data.map((country: Country) => {
        return {
          label: country.name,
          value: country,
        };
      });
      setCountries(countriesNames);
    } catch (error) {
      handleOpenSnackBar('Klaida, bandykite dar kartą', 'error');
    }
  }, [setCountries, handleOpenSnackBar]);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const onSaveInv = async (invoice: CreateInvoiceType) => {
    try {
      const clientCountry = invoice.clientCountry;
      const supplierCountry = invoice.supplierCountry;
      if (!clientCountry || !supplierCountry) {
        return;
      }

      const tax = await calculateTax({
        ...invoice,
        clientCountry,
        supplierCountry,
      });
      let data2save: InvoiceType = {
        id: Date.now(),
        client: invoice.client,
        clientCountry: clientCountry,
        clientPerson: invoice.clientPerson,
        isClientVatPayer: invoice.isClientVatPayer,
        supplier: invoice.supplier,
        supplierCountry: supplierCountry,
        isSupplierVatPayer: invoice.isSupplierVatPayer,
        product: invoice.product,
        quantity: invoice.quantity,
        pricePerQuantity: invoice.pricePerQuantity,
        vat: tax?.vat || 0,
        totalSum: invoice.totalSum,
        tax: tax?.sumWithVat || 0,
        notTouched: invoice.notTouched,
        createdAt: invoice.createdAt,
      };
      await saveInvoiceApi(data2save);
      handleOpenSnackBar('Įrašas sukurtas sėkmingai', 'success');
      navigate(ROUTES.InvoicesPage);
    } catch (error) {
      handleOpenSnackBar('Klaida, bandykite dar kartą', 'error');
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          client: '',
          clientPerson: ClientPerson.PHYSICAL,
          isClientVatPayer: false,
          clientCountry: '',
          supplier: '',
          isSupplierVatPayer: false,
          supplierCountry: '',
          product: '',
          quantity: 0,
          pricePerQuantity: 0,
          tax: 0,
          vat: 0,
          totalSum: 0,
          notTouched: true,
          createdAt: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        }}
        validationSchema={invoiceFormSchema}
        onSubmit={onSaveInv}
      >
        {({ values, setFieldValue }) => (
          <Form className="invoice-form">
            <h2 className="title">Sąskaita faktūra klientui</h2>
            <h3>Klientas</h3>
            <Divider />
            <div className="client-inputs">
              <InputFormik
                id={'client'}
                name={'client'}
                type={'text'}
                placeholder={'Klientas'}
              />
              <div className="select">
                <SelectField
                  label={'Valstybės'}
                  data={countries}
                  name={'clientCountry'}
                />
              </div>
              <div className="radio-buttons-group">
                <FormControl>
                  <FormLabel>PVM mokėtojas</FormLabel>
                  <RadioGroup
                    name="isClientVatPayer"
                    value={values.isClientVatPayer}
                    onChange={(event) => {
                      setFieldValue(
                        'isClientVatPayer',
                        event.target.value === 'true' ? true : false
                      );
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Taip"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Ne"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="client-radio-buttons">
                <FormControl>
                  <FormLabel>Klientas kaip asmuo:</FormLabel>
                  <RadioGroup
                    name="clientPerson"
                    value={values.clientPerson}
                    onChange={(event) => {
                      setFieldValue('clientPerson', event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value={ClientPerson.JURIDICAL}
                      control={<Radio />}
                      label="Juridinis"
                    />
                    <FormControlLabel
                      value={ClientPerson.PHYSICAL}
                      control={<Radio />}
                      label="Fizinis"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <h3>Tiekėjas</h3>
            <Divider />
            <div className="supplier-inputs">
              <InputFormik
                id={'supplier'}
                name={'supplier'}
                type={'text'}
                placeholder={'Tiekėjas'}
              />
              <div className="select">
                <SelectField
                  label={'Valstybės'}
                  data={countries}
                  name={'supplierCountry'}
                />
              </div>
              <div className="product">
                <InputFormik
                  id={'product'}
                  name={'product'}
                  type={'text'}
                  placeholder={'Produktas'}
                />
              </div>
              <div className="quantity">
                <InputFormik
                  id={'quantity'}
                  name={'quantity'}
                  type={'number'}
                  placeholder={'Kiekis'}
                  label={'Kiekis'}
                />
              </div>
              <div className="pricePerQuantity">
                <InputFormik
                  id={'pricePerQuantity'}
                  name={'pricePerQuantity'}
                  type={'number'}
                  placeholder={'Vieneto kaina'}
                  label={'Vieneto kaina'}
                  onChange={(event) => {
                    setFieldValue('pricePerQuantity', event.target.value);
                    setFieldValue(
                      'totalSum',
                      values.quantity * event.target.value
                    );
                  }}
                />
              </div>
              <div className="radio-buttons-group">
                <FormControl>
                  <FormLabel>PVM mokėtojas</FormLabel>
                  <RadioGroup
                    name="isSupplierVatPayer"
                    value={values.isSupplierVatPayer}
                    onChange={(event) => {
                      setFieldValue(
                        'isSupplierVatPayer',
                        event.target.value === 'true' ? true : false
                      );
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Taip"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Ne"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="totalSum">
              <InputFormik
                id={'totalSum'}
                name={'totalSum'}
                type={'number'}
                placeholder={'Suma'}
                label={'Suma'}
                readOnly={true}
              />
            </div>

            <div className="submit-button">
              <Button variant="contained" color="success" type="submit">
                Išrašyti sąskaitą
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default InvoiceForm;

const Container = styled.div`
  .invoice-form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: 1px solid black;
    padding: 30px 40px;
  }
  .title {
    text-align: center;
  }
  .client-inputs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 40px;
    align-items: center;
  }
  .supplier-inputs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 20px;
    align-items: center;
  }
  .select,
  .vat,
  .product,
  .quantity,
  .pricePerQuantity {
    margin-left: 20px;
  }
  .client-radio-buttons {
    display: flex;
    flex-direction: row;
    margin-left: 20px;
  }
  .radio-buttons-group {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
  .radio-buttons {
    display: flex;
    flex-direction: row;
  }
  .totalSum {
    display: flex;
    justify-content: center;
  }
  .submit-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }
`;
