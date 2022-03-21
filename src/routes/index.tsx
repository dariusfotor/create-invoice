import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/header';
import HomePageRoute from './home';
import InvoiceTemplatePageRoute from './invoice-template';
import InvoicesPageRoute from './invoices';

export const ROUTES = {
  HomePage: `/`,
  InvoicesPage: `/invoices`,
  InvoiceTemplate: `/invoice/:id`,
};
const RoutesComp = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={ROUTES.HomePage} element={<HomePageRoute />} />
        <Route path={ROUTES.InvoicesPage} element={<InvoicesPageRoute />} />
        <Route
          path={ROUTES.InvoiceTemplate}
          element={<InvoiceTemplatePageRoute />}
        />
      </Routes>
    </Router>
  );
};

export default RoutesComp;
