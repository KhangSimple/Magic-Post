import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
  {
    title: 'Thống kê đơn hàng',
    path: '/collection/employee/',
    icon: icon('ic_user'),
  },
  {
    title: 'Chờ gửi',
    path: '/collection/employee/parcel-in-stock',
    icon: icon('ic_user'),
  },
  {
    title: 'Chờ xác nhận',
    path: '/collection/employee/parcel-wait-accept',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Lịch sử đơn hàng',
    path: '/collection/employee/parcel-history',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
