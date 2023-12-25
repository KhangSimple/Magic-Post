import * as React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ParcelShipment.module.scss';
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
import Invoice from '~/components/Page/Transaction/Invoice/Invoice';

const cx = classNames.bind(styles);

const ParcelShipment = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const parcels = [
    {
      id: '1',
      receiverName: 'Nguyen Nhat Le',
      receiverPhoneNumber: '0123456789',
      receiverAddress: '44 Tran Thai Tong',
      status: 'Đang giao',
      sendDate: '25/15/2023',
    },
    {
      id: '2',
      receiverName: 'Nguyen Nhat Le 2',
      receiverPhoneNumber: '0123456789',
      receiverAddress: '44 Tran Thai Tong 2',
      status: 'Giao thành công',
      sendDate: '25/15/2023',
    }
  ];

  const handleDetailsClick = (packageData) => {
    setOpen(true);
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
        {/*<Scrollbar></Scrollbar>*/}
        <TableContainer component={Paper}>
          <Table className={cx(styles.packageTableTransaction)} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tên người nhận</TableCell>
                <TableCell>Địa chỉ người nhận</TableCell>
                <TableCell>SDT người nhận</TableCell>
                <TableCell>Ngày tháng gửi</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Xem chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parcels.map((packageData) => (
                <TableRow key={packageData.id}>
                  <TableCell>{packageData.id}</TableCell>
                  <TableCell>{packageData.receiverName}</TableCell>
                  <TableCell>{packageData.receiverAddress}</TableCell>
                  <TableCell>{packageData.receiverPhoneNumber}</TableCell>
                  <TableCell>{packageData.sendDate}</TableCell>
                  <TableCell>
                    <Label color={(packageData.status === 'Giao thành công' && 'success') || 'primary'}>
                      {packageData.status}
                    </Label>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleDetailsClick(packageData)}>
                      Giấy biên nhận
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog className={cx(styles.dialog)} open={open} onClose={handleClose} maxWidth="xl">
          <DialogTitle>
            <div className={cx(styles.title)}>Giấy biên nhận đơn hàng</div>
          </DialogTitle>
          <DialogContent>
            <DialogContent>
                <Invoice></Invoice>
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

export default ParcelShipment;
