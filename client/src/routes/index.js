// Layouts
import CustomerLogin from '~/components/Page/CustomerLogin';
import EmployeeLogin from '~/components/Page/EmployeeLogin';
import UserRegister from '~/components/Page/UserRegister';
import RestorePassword from '~/components/Page/RestorePassword';
import TransactionEmployee from '~/components/Page/TransactionEmployee';
import HomePage from '~/components/Page/Home';
import EmployeePage from '~/components/Page/EmployeePage';
import ParcelTracking from '~/components/Page/ParcelTracking';

console.log(typeof CustomerLogin);
const publicRoutes = [
  { path: '', component: HomePage, name: 'Home Page' },
  { path: '/employee', component: EmployeePage, name: 'Employee Page' },
  { path: '/user/login', component: CustomerLogin, name: 'User Login' },
  { path: '/employee/login', component: EmployeeLogin, name: 'Employee Login' },
  { path: '/register', component: UserRegister, name: 'Register' },
  { path: '/restore-password', component: RestorePassword, name: 'Restore Password' },
  { path: '/transaction-employee', component: TransactionEmployee, name: 'Transaction Employee' },
  { path: '/parcel-tracking', component: ParcelTracking, name: 'Parcel Tracking' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
