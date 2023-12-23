import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './parcelTransaction.module.scss';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { yellow } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EmployeePageContext } from '..';
import axios from 'axios';
const cx = classNames.bind(styles);

const TransactionDataCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const data = useContext(EmployeePageContext);
  const packages = [
    { id: 1, type: 'Điểm tập kết', name: 'ThaiNguyen - DiemTapKet', sendDate: '30/12/2023 3h50p' },
    { id: 2, type: 'Điểm dao dịch', name: 'HaNoi - DiemDaoDich', sendDate: '29/12/2023 3h25p' },
    { id: 3, type: 'Điểm tập kết', name: 'ThanhHoa - DiemTapKet', sendDate: '2/8/2023 14h43p' },
    { id: 4, type: 'Điểm tập kết', name: 'LangSon - DiemTapKet', sendDate: '3/5/2023 8h25p' },
    { id: 5, type: 'Điểm dao dịch', name: 'HaiPhong - DiemDaoDich', sendDate: '2/2/2023 13h5p' },
    { id: 6, type: 'Điểm dao dịch', name: 'HaNoi - DiemDaoDich', sendDate: '20/1/2023 3h35p' },
  ];
  const [parcelData, setParcelData] = useState([]);
  // useEffect(() => {
  //   try {
  //     axios
  //       .get(`http://localhost:1510/getTransactionList`, {
  //         params: {
  //           id: data.zip_code,
  //         },
  //       })
  //       .then(function (response) {
  //         setParcelData(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   } catch (err) {}
  // }, []);
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

  const handleDetailsClick = (packageData) => {
    setShowDetails(true);
    setSelectedPackage(packageData);
  };
  const handleAcceptedClick = () => {
    // axios
    //   .get(`http://localhost:1510/getTransactionList`, {
    //     params: {
    //       id: data.zip_code,
    //     },
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  const handleBackClick = () => {
    setShowDetails(false);
    setSelectedPackage(null);
  };
  const PackageDetailsTable = ({ orders }) => {
    orders = invoiceDetail;
    return (
      <TableContainer component={Paper}>
        <Table className={cx(styles.detailTableTransaction)} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sender Name</TableCell>
              <TableCell>Sender Phone</TableCell>
              <TableCell>Sender Address</TableCell>
              <TableCell>Receiver Name</TableCell>
              <TableCell>Receiver Phone</TableCell>
              <TableCell>Receiver Address</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Xác nhận</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.senderName}</TableCell>
                <TableCell>{order.senderPhone}</TableCell>
                <TableCell>{order.senderAddress}</TableCell>
                <TableCell>{order.receiverName}</TableCell>
                <TableCell>{order.receiverPhone}</TableCell>
                <TableCell>{order.receiverAddress}</TableCell>
                <TableCell>{order.from}</TableCell>
                <TableCell>{order.to}</TableCell>
                <TableCell>{order.cost}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleAcceptedClick()}>
                    Chấp nhận
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      <h1 className={cx(styles.title)}>
        Quản lý đơn hàng đến kho <LocalShippingIcon fontSize="large" sx={{ color: yellow[800] }} />
      </h1>
      {showDetails ? (
        <div>
          <div className={cx(styles.backAndTitle)}>
            <h2 className={cx(styles.packageDetailsHeader)}>{`Đơn Đến Từ ${selectedPackage.name}`} </h2>
            <Button onClick={handleBackClick}>
              <ArrowBackIcon fontSize="large" /> Quay lại
            </Button>
          </div>

          <PackageDetailsTable packageData={selectedPackage} />
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default TransactionDataCard;
