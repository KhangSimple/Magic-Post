// Layouts
import CustomerLogin from '~/components/Page/CustomerLogin';
import EmployeeLogin from '~/components/Page/EmployeeLogin';
import UserRegister from '~/components/Page/UserRegister';

const publicRoutes = [
  { path: '/user/login', component: CustomerLogin, name: 'Login' },
  { path: '/employee/login', component: EmployeeLogin, name: 'Login' },
  { path: '/register', component: UserRegister, name: 'Register' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
