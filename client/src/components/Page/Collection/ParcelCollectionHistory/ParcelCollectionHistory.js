import * as React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ParcelCollectionHistory.module.scss';
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
import Label from 'src/components/label';
import { dateFormat } from '..';
import axios from 'axios';
// import { zip_code } from '..';

const ZIP_CODE = localStorage.getItem('zip_code');
const NAME = localStorage.getItem('name');
const cx = classNames.bind(styles);

const ParcelCollectionHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [invoiceDetail, setInvoiceDetail] = React.useState([]);

  React.useEffect(() => {
    try {
      console.log('Call');
      axios
        .get(`http://localhost:1510/getSendedParcelPackage`, {
          headers: {
            token: localStorage.getItem('token'),
          },
          params: {
            id: ZIP_CODE,
            type: 'collection',
          },
        })
        .then(function (response) {
          let data = response.data.data;
          console.log(data);
          setPackages(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {}
  }, []);

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
    cost: detail.cost,
  }));

  const handleDetailsClick = (packageData) => {
    setOpen(true);
    try {
      console.log('Call get detail');
      axios
        .get(`http://localhost:1510/getCollectionPackageDetail`, {
          headers: {
            token: localStorage.getItem('token'),
          },
          params: {
            package_id: packageData.parcel_package_id,
            collection_id: ZIP_CODE,
          },
        })
        .then(function (response) {
          setInvoiceDetail(
            response.data.data.map((row) => ({
              id: row.parcel_id,
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
  const handleAcceptedClick = (selectionModel) => {
    setSelectedRows(selectionModel);
    console.log('hehe');
    handleClose();
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
                <TableCell>Ngày tháng nhận</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Xem chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((packageData) => (
                <TableRow key={packageData.id}>
                  <TableCell>{packageData.parcel_package_id}</TableCell>
                  <TableCell>{packageData.receiver_type}</TableCell>
                  <TableCell>{packageData.receiver_name}</TableCell>
                  <TableCell>{dateFormat(packageData.receive_date)}</TableCell>
                  <TableCell>
                    <Label color={(packageData.status === 'Đã xác nhận' && 'success') || 'primary'}>
                      {packageData.status === 'Đã xác nhận' ? packageData.status : 'Đang gửi'}
                    </Label>
                  </TableCell>
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
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
};

export default ParcelCollectionHistory;
