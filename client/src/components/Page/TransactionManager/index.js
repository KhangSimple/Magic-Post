import AccountTable from './AccountTable/AccountTable';
import DashboardLayout from 'src/layouts/dashboard';
import navConfig from './config-navigation';

const TransactionManager = () => {
  return (
    <DashboardLayout navConfig={navConfig}>
      <AccountTable />
    </DashboardLayout>
  );
};
export default TransactionManager;
