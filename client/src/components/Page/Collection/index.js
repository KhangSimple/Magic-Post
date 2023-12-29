import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { columns } from './ParcelCollectionsInStock/columns';
import classNames from 'classnames/bind';
import styles from './ParcelCollectionsInStock/parcelCollectionsInStock.module.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import DashboardLayout from 'src/layouts/dashboard';
import navConfig from './config-navigation';
import axios from 'axios';
// import { zip_code } from '..';

const ZIP_CODE = localStorage.getItem('zip_code');
const NAME = localStorage.getItem('name');

const cx = classNames.bind(styles);

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

//In stock collection component
const ParcelCollectionInStock = () => {
  //mark open modal create invoice
  const [open, setOpen] = React.useState(false);

  //table handle
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedSenderAddress, setSelectedSenderAddress] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [isFilterActive, setIsFilterActive] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  //get table data
  React.useEffect(() => {
    console.log('Use Effect main index');
    axios
      .get(`http://localhost:1510/verify-token`, {
        params: {
          token: localStorage.getItem('token'),
        },
      })
      .then(function (response) {
        let data = response.data.decodeData;
        // setDecodedData(response.data.decodeData);
        localStorage.setItem('employee_info', JSON.stringify(data.info));
        localStorage.setItem('role', data.role);
        localStorage.setItem('zip_code', data.coll_info.zip_code);
        localStorage.setItem('name', data.coll_info.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    console.log('Use Effect');
    axios
      .get(`http://localhost:1510/getCollectionList`, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          id: ZIP_CODE,
          type: 'in',
          status: 'Chờ gửi',
        },
      })
      .then(function (response) {
        setRows(
          response.data.map((row) => ({
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
  }, []);

  //handle open create invoice
  const handleCreateInvoiceClick = () => {
    setOpen(true);
  };

  //handle close create invoice
  const handleClose = () => {
    setOpen(false);
  };

  //handle send parcel
  const sendParcel = (parcel_id, package_id) => {
    axios
      .post(`http://localhost:1510/sendParcel`, {
        data: {
          token: localStorage.getItem('token'),
          kind_point: 'collection',
          parcel_id: parcel_id,
          package_id: package_id,
        },
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  //handle send parcel package
  const sendParcelPackage = () => {
    setOpen(false);
    axios
      .post(`http://localhost:1510/createCollectionPackage`, {
        data: {
          token: localStorage.getItem('token'),
          parcel_id: selectedRows,
          sender_id: ZIP_CODE,
          sender_name: 'Hồ Chí Minh',
          type: 'Điểm tập kết',
        },
      })
      .then(function (response) {
        let package_id = response.data.package_id;
        selectedRows.map((id) => {
          sendParcel(id, package_id);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const uniqueSenderAddresses = rows
    .map((value) => value.senderAddress)
    .filter((value, index, self) => self.indexOf(value) === index);

  // chọn item để datagrid hiện các sender address tương ứng
  const handleChangeDataGrid = (event) => {
    const selectedAddress = event.target.value;
    if (selectedAddress === 'All') {
      setIsFilterActive(false);
      setSelectedSenderAddress('');
      setFilteredRows([]);
    } else {
      setIsFilterActive(true);
      setSelectedSenderAddress(selectedAddress);
      // Tạo mảng gồm các hàng có SenderAddress tương ứng
      const newFilteredRows = rows.filter((row) => row.senderAddress === selectedAddress);
      setFilteredRows(newFilteredRows);
    }
  };
  return (
    <DashboardLayout navConfig={navConfig}>
      <Container sx={{ height: '70vh' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">
            QUẢN LÝ KHO HÀNG <WarehouseIcon />
          </Typography>

          <Container sx={{ flex: '1', justifyContent: 'flex-end', alignContent: 'center', display: 'flex' }}>
            <FormControl className={cx(styles.controlSenderSddress)}>
              <InputLabel id="sender-address-label">Sender Address</InputLabel>
              <Select
                className={cx(styles.selectAddressSender)}
                labelId="sender-address-label"
                id="sender-address"
                value={selectedSenderAddress}
                label="Sender Address"
                onChange={handleChangeDataGrid}
              >
                <MenuItem className={cx(styles.menuAddressSender)} value="All">
                  All
                </MenuItem>
                {uniqueSenderAddresses.map((address) => (
                  <MenuItem className={cx(styles.menuAddressSender)} key={address} value={address}>
                    {address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleCreateInvoiceClick}
            >
              Create Invoice
            </Button>
          </Container>
        </Stack>
        <Card>
          <DataGrid
            rows={isFilterActive ? filteredRows : rows}
            columns={columns}
            onRowSelectionModelChange={handleSelectionModelChange}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Card>

        <Dialog className={cx(styles.dialog)} open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>
            <div className={cx(styles.title)}>Create Invoice</div>
          </DialogTitle>
          <DialogContent>
            <DialogContent>
              <DialogContentText>
                <div>
                  <span className={cx(styles.date)}>Current Date: {new Date().toLocaleDateString()}</span>
                  <span className={cx(styles.countRowsSelect)}>Invoice quantity: {selectedRows.length}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className={cx(styles.from)}>
                    <TextField sx={{ marginBottom: 1 }} label="Sender Name" fullWidth />
                    <TextField sx={{ marginBottom: 1 }} label="Sender Phone" fullWidth />
                    <TextField sx={{ marginBottom: 1 }} label="Sender Address" fullWidth />
                  </div>

                  <div className={cx(styles.to)}>
                    <TextField sx={{ marginBottom: 1 }} label="Receiver Name" fullWidth />
                    <TextField sx={{ marginBottom: 1 }} label="Receiver Phone" fullWidth />
                    <TextField sx={{ marginBottom: 1 }} label="Receiver Address" fullWidth />
                  </div>
                </div>
                <div className={cx(styles.selectedRowsDetails)}>
                  Selected Rows Details:
                  <table>
                    <thead>
                      <tr>
                        {columns.map((column) => (
                          <th key={column.field}>{column.headerName}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRows.map((id) => (
                        <tr key={id}>
                          {Object.keys(
                            rows.find((e) => {
                              return e.id === id;
                            }),
                          ).map((field) => (
                            <td key={field}>
                              {
                                rows.find((e) => {
                                  return e.id === id;
                                })[field]
                              }
                            </td>
                          ))}
                          {/* console.log(rows[id]) */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DialogContentText>
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={sendParcelPackage} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
};

export default ParcelCollectionInStock;
