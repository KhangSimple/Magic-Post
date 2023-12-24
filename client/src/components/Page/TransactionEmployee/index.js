import Invoice from './Invoice/Invoice';
import CreateInvoice from './CreateInvoice/CreateInvoice';
import DashboardLayout from 'src/layouts/dashboard';
import navConfig from './config-navigation';
const TransactionEmployee = () => (
  <DashboardLayout navConfig={navConfig}>
    <CreateInvoice />
  </DashboardLayout>
);

export default TransactionEmployee;
