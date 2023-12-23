import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { columns } from './columns';
import classNames from 'classnames/bind';
import styles from './parcelCollectionsInStock.module.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { yellow } from '@mui/material/colors';

import { EmployeePageContext } from '..';
import axios from 'axios';

const cx = classNames.bind(styles);

const CollectionDataTable = () => {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const authInfo = React.useContext(EmployeePageContext);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedSenderAddress, setSelectedSenderAddress] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [isFilterActive, setIsFilterActive] = React.useState(false);
  React.useMemo(() => {
    axios
      .get(`http://localhost:1510/getTransactionList`, {
        params: {
          id: authInfo.zip_code,
        },
      })
      .then(function (response) {
        setRows(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleCreateInvoiceClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
    // console.log('Selected Rows:', selectionModel.length);
    console.log('hehe');
  };
  // Array.prototype.unique = function () {
  //   var arr = [];
  //   for (var i = 0; i < this.length; i++) {
  //     if (arr.indexOf(this[i] === -1)) {
  //       arr.push(this[i]);
  //     }
  //   }
  //   return arr;
  // };
  // const list = rows
  //   .map((value, index) => {
  //     return value.senderAddress;
  //   })
  //   .unique();
  // console.log(list);
  const uniqueSenderAddresses = rows
    .map((value) => value.sender_address)
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
      const newFilteredRows = rows.filter((row) => row.sender_address === selectedAddress);
      setFilteredRows(newFilteredRows);
    }
  };
  return (
    <div style={{ height: '70vh', width: '73.5vw' }}>
      <div className={cx(styles.navigate)}>
        <h1 className={cx(styles.titleTable)}>
          Quản lý kho hàng <WarehouseIcon fontSize="large" sx={{ color: yellow[800] }} />
        </h1>
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
          className={cx(styles.createInvoice)}
          variant="contained"
          color="primary"
          onClick={handleCreateInvoiceClick}
        >
          <AddIcon fontSize="large" />
          Create Invoice
        </Button>
      </div>

      <style>
        {`
          .super-app-theme--header {
            background-color:#9dd4f5; 
            color: #00000; 
            font-weight: bold;
          }
          .MuiDataGrid-root {
            margin-top: 10px; 
          }
        `}
      </style>
      <DataGrid
        sx={{
          m: 10,
          boxShadow: 2,
          border: 2,
          fontSize: 16,
        }}
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

      {/* Hiển thị model các đơn được chọn  */}

      <Dialog className={cx(styles.dialog)} open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CollectionDataTable;
