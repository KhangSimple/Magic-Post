import * as React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ParcelCollectionWaitAccept.module.scss';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DataGrid } from '@mui/x-data-grid';
import DashboardLayout from 'src/layouts/dashboard';
import navConfig from '../config-navigation';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { dateFormat } from '..';

const cx = classNames.bind(styles);

const ParcelCollectionHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  // const [invoiceDetail, setInvoiceDetail] = useState([]);
  React.useEffect(() => {
    try {
      console.log('Call');
      axios
        .get(`http://localhost:1510/getArrivalParcelPackage`, {
          params: {
            id: '201',
            type: 'collection',
          },
        })
        .then(function (response) {
          let data = response.data.data;
          setPackages(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  // const packages = [
  //   { id: 1, type: 'Điểm tập kết', name: 'ThaiNguyen - DiemTapKet', sendDate: '30/12/2023 3h50p' },
  //   { id: 2, type: 'Điểm dao dịch', name: 'HaNoi - DiemDaoDich', sendDate: '29/12/2023 3h25p' },
  //   { id: 3, type: 'Điểm tập kết', name: 'ThanhHoa - DiemTapKet', sendDate: '2/8/2023 14h43p' },
  //   { id: 4, type: 'Điểm tập kết', name: 'LangSon - DiemTapKet', sendDate: '3/5/2023 8h25p' },
  //   { id: 5, type: 'Điểm dao dịch', name: 'HaiPhong - DiemDaoDich', sendDate: '2/2/2023 13h5p' },
  //   { id: 6, type: 'Điểm dao dịch', name: 'HaNoi - DiemDaoDich', sendDate: '20/1/2023 3h35p' },
  // ];
  // const invoiceDetail = [
  //   {
  //     id: 1,
  //     senderName: 'Nhut Le',
  //     senderPhone: '0123456789',
  //     senderAddress: 'Ha Noi',
  //     receiverName: 'Jon',
  //     receiverPhone: '9876543210',
  //     receiverAddress: 'Khum bic',
  //     cost: 35,
  //   },
  // ];
  const [invoiceDetail, setInvoiceDetail] = React.useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'senderName', headerName: 'Sender Name', width: 150 },
    { field: 'senderPhone', headerName: 'Sender Phone', width: 150 },
    { field: 'senderAddress', headerName: 'Sender Address', width: 200 },
    { field: 'receiverName', headerName: 'Receiver Name', width: 150 },
    { field: 'receiverPhone', headerName: 'Receiver Phone', width: 150 },
    { field: 'receiverAddress', headerName: 'Receiver Address', width: 200 },
    { field: 'cost', headerName: 'Cost', width: 100 },
  ];

  const rows = invoiceDetail.map((detail) => ({
    id: detail.id,
    senderName: detail.senderName,
    senderPhone: detail.senderPhone,
    senderAddress: detail.senderAddress,
    receiverName: detail.receiverName,
    receiverPhone: detail.receiverPhone,
    receiverAddress: detail.receiverAddress,
    from: detail.from,
    to: detail.to,
    cost: detail.cost,
  }));

  const handleDetailsClick = (packageData) => {
    setOpen(true);
    try {
      console.log('Call get detail');
      axios
        .get(`http://localhost:1510/getCollectionPackageDetail`, {
          params: {
            package_id: packageData.parcel_package_id,
            collection_id: '201',
          },
        })
        .then(function (response) {
          setInvoiceDetail(
            response.data.data.map((row) => ({
              id: row.id,
              senderName: row.sender_name,
              senderPhone: row.sender_phone,
              senderAddress: row.sender_address,
              receiverName: row.receiver_name,
              receiverPhone: row.receiver_phone,
              receiverAddress: row.receiver_address,
              cost: row.cod_amount,
            })),
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {}
  };
  const confirmParcel = (parcel_id) => {
    axios
      .post(`http://localhost:1510/confirmParcel`, {
        data: {
          kind_point: 'collection',
          parcel_id: parcel_id,
          coll_id: '201',
          sender_zip_code: '12345',
        },
      })
      .then(function (response) {
        let parcel_ids = response.data;
        console.log(parcel_ids);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleAcceptedClick = (selectionModel) => {
    setSelectedRows(selectionModel);
    console.log('hehe');
    handleClose();
    axios
      .post(`http://localhost:1510/confirmCollecionPackage`, {
        data: {
          package_id: 'a',
          zip_code: '201',
        },
      })
      .then(function (response) {
        let parcel_ids = response.data.parcel_ids;
        console.log(parcel_ids);
        parcel_ids.map((row) => {
          confirmParcel(row.parcel_id);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <DashboardLayout navConfig={navConfig}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">ĐƠN HÀNG CHỜ XÁC NHẬN</Typography>
        </Stack>
        <TableContainer component={Paper}>
          <Table className={cx(styles.packageTableTransaction)} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Ngày tháng gửi</TableCell>
                <TableCell>Xem chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((packageData) => (
                <TableRow key={packageData.parcel_package_id}>
                  <TableCell>{packageData.parcel_package_id}</TableCell>
                  <TableCell>{packageData.type}</TableCell>
                  <TableCell>{packageData.sender_name}</TableCell>
                  <TableCell>{dateFormat(packageData.receive_date)}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleDetailsClick(packageData)}>
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog className={cx(styles.dialog)} open={open} onClose={handleClose} maxWidth="lg">
          <DialogTitle>
            <div className={cx(styles.title)}>Xem chi tiết các đơn hàng</div>
          </DialogTitle>
          <DialogContent>
            <DialogContent>
              <Card>
                <DataGrid rows={rows} columns={columns} onSelectionModelChange={handleAcceptedClick} />
              </Card>
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <Button className={cx(styles.buttonModel)} onClick={handleClose} color="primary">
              Hủy
            </Button>
            <Button className={cx(styles.buttonModel)} onClick={handleAcceptedClick} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
};

export default ParcelCollectionHistory;
