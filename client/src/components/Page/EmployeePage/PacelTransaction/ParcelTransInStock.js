import * as React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './parcelTransaction.module.scss';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { yellow } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DataGrid } from '@mui/x-data-grid';

const cx = classNames.bind(styles);

const TransactionDataCard = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const packages = [
    { id: 1, type: 'Điểm tập kết', name: 'ThaiNguyen - DiemTapKet', sendDate: '30/12/2023 3h50p' },
    { id: 2, type: 'Điểm dao dịch', name: 'HaNoi - DiemDaoDich', sendDate: '29/12/2023 3h25p' },
    { id: 3, type: 'Điểm tập kết', name: 'ThanhHoa - DiemTapKet', sendDate: '2/8/2023 14h43p' },
    { id: 4, type: 'Điểm tập kết', name: 'LangSon - DiemTapKet', sendDate: '3/5/2023 8h25p' },
    { id: 5, type: 'Điểm dao dịch', name: 'HaiPhong - DiemDaoDich', sendDate: '2/2/2023 13h5p' },
    { id: 6, type: 'Điểm dao dịch', name: 'HaNoi - DiemDaoDich', sendDate: '20/1/2023 3h35p' },
  ];
  const invoiceDetail = [
    {
      id: 1,
      senderName: 'Nhut Le',
      senderPhone: '0123456789',
      senderAddress: 'Ha Noi',
      receiverName: 'Jon',
      receiverPhone: '9876543210',
      receiverAddress: 'Khum bic',
      from: 'abx',
      to: 'xyz',
      cost: 35,
    },
    {
      id: 2,
      senderName: 'Duy Khanh',
      senderPhone: '0123456789',
      senderAddress: 'Hai Phong',
      receiverName: 'Cersei',
      receiverPhone: '9876543210',
      receiverAddress: 'Khum bic',
      from: 'abx',
      to: 'xyz',
      cost: 42,
    },
    {
      id: 3,
      senderName: 'Phuc Khang',
      senderPhone: '0123456789',
      senderAddress: 'Ha Noi',
      receiverName: 'Jaime',
      receiverPhone: '9876543210',
      receiverAddress: 'Khum bic',
      from: 'abx',
      to: 'xyz',
      cost: 45,
    },
    {
      id: 4,
      senderName: 'Duy Nong',
      senderPhone: '0123456789',
      senderAddress: 'Thai Nguyn',
      receiverName: 'Arya',
      receiverPhone: '9876543210',
      receiverAddress: 'Khum bic',
      from: 'abx',
      to: 'xyz',
      cost: 16,
    },
    {
      id: 5,
      senderName: 'Hai Nam',
      senderPhone: '0123456789',
      senderAddress: 'Thanh Hoa',
      receiverName: 'Daenerys',
      receiverPhone: '9876543210',
      receiverAddress: 'Khum bic',
      from: 'abx',
      to: 'xyz',
      cost: null,
    },
  ];
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'senderName', headerName: 'Sender Name', width: 150 },
    { field: 'senderPhone', headerName: 'Sender Phone', width: 150 },
    { field: 'senderAddress', headerName: 'Sender Address', width: 200 },
    { field: 'receiverName', headerName: 'Receiver Name', width: 150 },
    { field: 'receiverPhone', headerName: 'Receiver Phone', width: 150 },
    { field: 'receiverAddress', headerName: 'Receiver Address', width: 200 },
    { field: 'from', headerName: 'From', width: 150 },
    { field: 'to', headerName: 'To', width: 150 },
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
    <div>
      <div className={cx(styles.title)}>
        Quản lý đơn hàng đến kho <LocalShippingIcon fontSize="large" sx={{ color: yellow[800] }} />
      </div>
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
              <TableRow key={packageData.id}>
                <TableCell>{packageData.id}</TableCell>
                <TableCell>{packageData.type}</TableCell>
                <TableCell>{packageData.name}</TableCell>
                <TableCell>{packageData.sendDate}</TableCell>
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

      <Dialog className={cx(styles.dialog)} open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <div className={cx(styles.title)}>Xem chi tiết các đơn hàng</div>
        </DialogTitle>
        <DialogContent>
          <DialogContent>
            <DataGrid
              sx={{
                m: 0,
                boxShadow: 2,
                border: 2,
                fontSize: 16,
              }}
              rows={rows}
              columns={columns}
              checkboxSelection
              onSelectionModelChange={handleAcceptedClick}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button className={cx(styles.buttonModel)} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button className={cx(styles.buttonModel)} onClick={handleAcceptedClick} color="primary">
            Accepted
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionDataCard;
