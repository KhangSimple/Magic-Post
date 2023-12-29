import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Thống kê đơn hàng',
    path: '/transaction/employee',
    icon: icon('ic_user'),
  },
  {
    title: 'Tạo đơn hàng',
    path: '/transaction/employee/create-invoice',
    icon: icon('ic_user'),
  },
  {
    title: 'Chờ gửi',
    path: '/transaction/employee/parcel-in-stock',
    icon: icon('ic_user'),
  },
  {
    title: 'Chờ xác nhận',
    path: '/transaction/employee/parcel-wait-accept',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Lịch sử đơn hàng',
    path: '/transaction/employee/parcel-history',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Giao hàng',
    path: '/transaction/employee/parcel-shipment',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
