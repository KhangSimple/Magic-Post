// Layouts
import CustomerLogin from '~/components/Page/CustomerLogin';
import EmployeeLogin from '~/components/Page/EmployeeLogin';
import UserRegister from '~/components/Page/UserRegister';
import RestorePassword from '~/components/Page/RestorePassword';
import TransactionEmployee from '~/components/Page/TransactionEmployee';

const publicRoutes = [
  // { path: '', component: HomePage, name: 'Home Page' },
  { path: '/user/login', component: CustomerLogin, name: 'User Login' },
  { path: '/employee/login', component: EmployeeLogin, name: 'Employee Login' },
  { path: '/register', component: UserRegister, name: 'Register' },
  { path: '/restore-password', component: RestorePassword, name: 'Restore Password' },
  { path: '/transaction-employee', component: TransactionEmployee, name: 'Transaction Employee' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
