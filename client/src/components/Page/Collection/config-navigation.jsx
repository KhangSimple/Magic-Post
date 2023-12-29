import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

//nav config route
const navConfig = [
  {
    title: 'Chờ gửi',
    path: '/collection/employee',
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
