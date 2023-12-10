// Layouts
import CustomerLogin from '~/components/Page/CustomerLogin';
import EmployeeLogin from '~/components/Page/EmployeeLogin';
import UserRegister from '~/components/Page/UserRegister';
import RestorePassword from '~/components/Page/RestorePassword';
import HomePage from '~/components/Page/Home';

const publicRoutes = [
  { path: '/user/login', component: CustomerLogin, name: 'User Login' },
  { path: '/employee/login', component: EmployeeLogin, name: 'Employee Login' },
  { path: '/register', component: UserRegister, name: 'Register' },
  { path: '/restore-password', component: RestorePassword, name: 'Restore Password' },
  { path: '/home', component: HomePage, name: 'Home Page' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
