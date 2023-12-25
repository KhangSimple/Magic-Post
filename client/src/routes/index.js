// // Layouts
import CustomerLogin from '~/components/Page/CustomerLogin';
import EmployeeLogin from '~/components/Page/EmployeeLogin';
import UserRegister from '~/components/Page/UserRegister';
import RestorePassword from '~/components/Page/RestorePassword';
import Test from '~/components/Page/Test';
import HomePage from '~/components/Page/Home';
import ParcelTracking from '~/components/Page/ParcelTracking';
import TransactionManager from '~/components/Page/TransactionManager';
import TransactionStatistics from '~/components/Page/TransactionManager/Statistics/Statistics';

//test
import CreateUser from '~/components/Page/TransactionManager/CreateUser/CreateUser';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import { ProtectedRoute } from './ProtectedRoute';

//collection
import ParcelCollectionInStock from '~/components/Page/Collection/ParcelCollectionsInStock/ParcelCollectionsInStock';
import ParcelCollectionWaitAccept from '~/components/Page/Collection/ParcelCollectionWaitAccept/ParcelCollectionWaitAccept';
import ParcelCollectionHistory from '~/components/Page/Collection/ParcelCollectionHistory/ParcelCollectionHistory';
import ParcelCollectionStatistics from '~/components/Page/Collection';

//transaction
import ParcelTransactionHistory from '~/components/Page/Transaction/ParcelTransactionHistory/ParcelTransactionHistory';
import ParcelTransactionInStock from '~/components/Page/Transaction/ParcelTransactionInStock/ParcelTransactionInStock';
import ParcelTransactionWaitAccept from '~/components/Page/Transaction/ParcelTransactionWaitAccept/ParcelTransactionWaitAccept';
import ParcelTransactionStatistics from '~/components/Page/Transaction';
import ParcelTransactionCreateInvoice from '~/components/Page/Transaction/CreateInvoice/CreateInvoice';

// const publicRoutes = [
//   { path: '', component: HomePage, name: 'Home Page' },
//   { path: '/employee', component: EmployeePage, name: 'Employee Page' },
//   { path: '/user/login', component: CustomerLogin, name: 'User Login' },
//   { path: '/employee/login', component: EmployeeLogin, name: 'Employee Login' },
//   { path: '/register', component: UserRegister, name: 'Register' },
//   { path: '/restore-password', component: RestorePassword, name: 'Restore Password' },
//   { path: '/transaction-employee', component: TransactionEmployee, name: 'Transaction Employee' },
//   { path: '/parcel-tracking', component: ParcelTracking, name: 'Parcel Tracking' },
// ];

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/user/login',
      element: <CustomerLogin />,
    },
    {
      path: '/employee/login',
      element: <EmployeeLogin />,
    },
    {
      path: '/register',
      element: <UserRegister />,
    },
    {
      path: '/restore-password',
      element: <RestorePassword />,
    },
    {
      path: '/parcel-tracking',
      element: <ParcelTracking />,
    },
    {
      path: '',
      element: <HomePage />,
    },
    {
      path: '/transaction-manager',
      element: <TransactionManager />,
    },
    {
      path: '/transaction-manager/statistics',
      element: <TransactionStatistics />,
    },
    {
      path: '/transaction-manager/create-user',
      element: <CreateUser />,
    },

    //transaction employee
    {
      path: '/transaction/employee/',
      element: <ParcelTransactionStatistics />,
    },
    {
      path: '/transaction/employee/create-invoice',
      element: <ParcelTransactionCreateInvoice />,
    },
    {
      path: '/transaction/employee/parcel-in-stock',
      element: <ParcelTransactionInStock />,
    },
    {
      path: '/transaction/employee/parcel-wait-accept',
      element: <ParcelTransactionWaitAccept />,
    },
    {
      path: '/transaction/employee/parcel-history',
      element: <ParcelTransactionHistory />,
    },
    //collection employee
    {
      path: '/collection/employee/',
      element: <ParcelCollectionStatistics />,
    },
    {
      path: '/collection/employee/parcel-in-stock',
      element: <ParcelCollectionInStock />,
    },
    {
      path: '/collection/employee/parcel-wait-accept',
      element: <ParcelCollectionWaitAccept />,
    },
    {
      path: '/collection/employee/parcel-history',
      element: <ParcelCollectionHistory />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: <div>User Home Page</div>,
        },
        {
          path: '/profile',
          element: <div>User Profile</div>,
        },
        {
          path: '/logout',
          element: <Test />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/test',
      element: <div>Test Page</div>,
    },
    {
      path: '/login',
      element: <div>Login</div>,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
