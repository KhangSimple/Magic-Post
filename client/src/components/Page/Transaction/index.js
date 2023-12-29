import DashboardLayout from 'src/layouts/dashboard';
import navConfig from './config-navigation';
import { Cookies } from 'react-cookie';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppWidgetSummary from './Statistics/components/WidgetSummary';
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
import Stack from '@mui/material/Stack';
import DatePickerRange from './components/DatePickerRange';
import axios from 'axios';

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
  const [startDate, setStartDate] = useState(
    (() => {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return oneWeekAgo.toISOString().substring(0, 10);
    })(),
  );

  const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 10));
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [invoiceDetail, setInvoiceDetail] = React.useState([]);
  const [decodedData, setDecodedData] = useState({});
  const [successRow, setSuccessRow] = useState([]);
  const [failRow, setFailRow] = useState([]);

  useEffect(() => {
    console.log('Use Effect main index');
    axios
      .get(`http://localhost:1510/verify-token`, {
        params: {
          token: localStorage.getItem('token'),
        },
      })
      .then(function (response) {
        let data = response.data.decodeData;
        setDecodedData(response.data.decodeData);
        localStorage.setItem('employee_info', JSON.stringify(data.info));
        localStorage.setItem('role', data.role);
        localStorage.setItem('zip_code', data.trans_info.zip_code);
        localStorage.setItem('name', data.trans_info.name);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        .get(`http://localhost:1510/getTransactionPackageDetail`, {
          headers: {
            token: localStorage.getItem('token'),
          },
          params: {
            package_id: packageData.parcel_package_id,
            transaction_id: localStorage.getItem('zip_code'),
          },
        })
        .then(function (response) {
          console.log(response);
          setInvoiceDetail(
            response.data.data.map((row) => ({
              id: row.parcel_id,
              senderName: row.sender_name,
              senderPhone: row.sender_phone,
              senderAddress: row.sender_address,
              receiverName: row.receiver_name,
              receiverPhone: row.receiver_phone,
              receiverAddress: row.receiver_address,
              cost: row.cost,
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
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then(function (response) {
        let data = response.data;
        setSuccessRow(data.successRow);
        setFailRow(data.failRow);
        let rows = data.successRow.concat(data.failRow);
        setPackages(rows);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [startDate, endDate]);

  return (
    <TransactionContext.Provider value={decodedData}>
      <DashboardLayout navConfig={navConfig}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            THỐNG KÊ ĐIỂM GIAO DỊCH {localStorage.getItem('name') ? localStorage.getItem('name').toUpperCase() : ''}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <DatePickerRange
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            ></DatePickerRange>
          </Stack>

          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={6}>
              <AppWidgetSummary
                title="Đơn thành công"
                total={successRow.length}
                color="success"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <AppWidgetSummary
                title="Đơn hoàn trả"
                total={failRow.length}
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
