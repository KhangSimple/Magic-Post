// Layouts
import CustomerLogin from '~/components/Page/CustomerLogin';
import EmployeeLogin from '~/components/Page/EmployeeLogin';

const publicRoutes = [
  { path: '/user/login', component: CustomerLogin, name: 'Login' },
  { path: '/employee/login', component: EmployeeLogin, name: 'Login' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
