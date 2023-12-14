// Layouts
import CustomerLogin from '~/components/Page/CustomerLogin';
import EmployeeLogin from '~/components/Page/EmployeeLogin';
import UserRegister from '~/components/Page/UserRegister';
import RestorePassword from '~/components/Page/RestorePassword';
import HomePage from '~/components/Page/Home';
import EmployeePage from '~/components/Page/EmployeePage';

const publicRoutes = [
  { path: '', component: HomePage, name: 'Home Page' },
  { path: '/employee', component: EmployeePage, name: 'Employee Page' },
  { path: '/user/login', component: CustomerLogin, name: 'User Login' },
  { path: '/employee/login', component: EmployeeLogin, name: 'Employee Login' },
  { path: '/register', component: UserRegister, name: 'Register' },
  { path: '/restore-password', component: RestorePassword, name: 'Restore Password' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
