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
import { rows } from './row';
import { columns } from './columns';
import classNames from 'classnames/bind';
import styles from './parcelTransInStock.module.scss';

const cx = classNames.bind(styles);

const DataTable = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

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

  return (
    <div style={{ height: 500, width: '1200px' }}>
      <div
        style={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '10px',
          marginRight: '150px',
        }}
      >
        <Button variant="contained" color="primary" onClick={handleCreateInvoiceClick}>
          <AddIcon fontSize="large" />
          Create Invoice{' '}
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
        rows={rows}
        columns={columns}
        // selectionModel={selectedRows}
        onRowSelectionModelChange={handleSelectionModelChange}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <Dialog className={cx('dialog')} open={open} onClose={handleClose}>
        <DialogTitle>
          <div className={cx('title')}>Create Invoice</div>
        </DialogTitle>
        <DialogContent>
          <DialogContent>
            <DialogContentText>
              <div>
                {console.log(selectedRows)}
                <span className={cx('date')}>Current Date: {new Date().toLocaleDateString()}</span>
                <span className={cx('count-rows-select')}>Invoice quantity: {selectedRows.length}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={cx('from')}>
                  <TextField sx={{ marginBottom: 1 }} label="Sender Name" fullWidth />
                  <TextField sx={{ marginBottom: 1 }} label="Sender Phone" fullWidth />
                  <TextField sx={{ marginBottom: 1 }} label="Sender Address" fullWidth />
                </div>

                <div className={cx('to')}>
                  <TextField sx={{ marginBottom: 1 }} label="Receiver Name" fullWidth />
                  <TextField sx={{ marginBottom: 1 }} label="Receiver Phone" fullWidth />
                  <TextField sx={{ marginBottom: 1 }} label="Receiver Address" fullWidth />
                </div>
              </div>
              <div className={cx('selected-rows-details')}>
                Selected Rows Details:
                <ul>
                  {selectedRows.map((id) => (
                    <li key={id}>
                      {Object.keys(rows[id--]).map((field) => (
                        <span key={field}>
                          {field}: {rows[id][field]}
                          <br />
                        </span>
                      ))}
                      <br />
                    </li>
                  ))}
                </ul>
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

export default DataTable;
