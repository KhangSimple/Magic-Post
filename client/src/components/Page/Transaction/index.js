import DashboardLayout from 'src/layouts/dashboard';
import navConfig from './config-navigation';
import { Cookies } from 'react-cookie';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppAllStatistics from './Statistics/components/AllStatistics';
import AppWidgetSummary from './Statistics/components/WidgetSummary';
import AppConversionRates from './Statistics/components/ConversionRates';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styles from '~/components/Page/Transaction/ParcelTransactionHistory/ParcelTransactionHistory.module.scss';
import Label from '~/components/label';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const TransactionContext = createContext();

export function dateFormat(date) {
  if (date) {
    const d = new Date(date);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var second = d.getSeconds();
    hours = hours > 9 ? hours : '0' + hours.toString();
    minutes = minutes > 9 ? minutes : '0' + minutes.toString();
    second = second > 9 ? second : '0' + second.toString();
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + second;
  }
}

const Statistics = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [invoiceDetail, setInvoiceDetail] = React.useState([]);
  const [decodedData, setDecodedData] = useState({});
  const [successRow, setSuccessRow] = useState([]);
  const [failRow, setFailRow] = useState([]);
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
  };
  const handleAcceptedClick = (selectionModel) => {
    setSelectedRows(selectionModel);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:1510/getSuccessNFailParcel`, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          startDate: '2023-11-29',
          endDate: '2023-12-30',
        },
      })
      .then(function (response) {
        let data = response.data;
        setSuccessRow(data.successRow);
        setFailRow(data.failRow);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <TransactionContext.Provider value={decodedData}>
      <DashboardLayout navConfig={navConfig}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            THỐNG KÊ ĐIỂM GIAO DỊCH {localStorage.getItem('name') ? localStorage.getItem('name').toUpperCase() : ''}
          </Typography>

          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Đơn thành công"
                total={1223}
                color="success"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
              />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Đơn hoàn trả"
                total={234}
                color="error"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
              />
            </Grid>

            <Grid xs={12} md={6} lg={12}>
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
                          <Label
                            color={
                              packageData.status === 'Đã xác nhận'
                                ? 'success'
                                : packageData.status === 'Không gửi thành công đến người nhận'
                                ? 'secondary'
                                : 'primary'
                            }
                          >
                            {packageData.status === 'Đã xác nhận' ||
                            packageData.status === 'Không gửi thành công đến người nhận'
                              ? packageData.status
                              : 'Đang gửi'}
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
            </Grid>
          </Grid>
        </Container>
      </DashboardLayout>
    </TransactionContext.Provider>
  );
};
export default Statistics;
