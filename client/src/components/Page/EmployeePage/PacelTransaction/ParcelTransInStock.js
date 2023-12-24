import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './parcelTransaction.module.scss';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { yellow } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EmployeePageContext } from '..';
import axios from 'axios';
import { dateFormat } from '..';
const cx = classNames.bind(styles);

const TransactionDataCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const data = useContext(EmployeePageContext);
  // const packages = [
  //   { id: 1, type: 'Điểm tập kết', name: 'ThaiNguyen - DiemTapKet', sendDate: '30/12/2023 3h50p' },
  //   { id: 2, type: 'Điểm dao dịch', name: 'HaNoi - DiemDaoDich', sendDate: '29/12/2023 3h25p' },
  //   { id: 3, type: 'Điểm tập kết', name: 'ThanhHoa - DiemTapKet', sendDate: '2/8/2023 14h43p' },
  //   { id: 4, type: 'Điểm tập kết', name: 'LangSon - DiemTapKet', sendDate: '3/5/2023 8h25p' },
  //   { id: 5, type: 'Điểm dao dịch', name: 'HaiPhong - DiemDaoDich', sendDate: '2/2/2023 13h5p' },
  //   { id: 6, type: 'Điểm dao dịch', name: 'HaNoi - DiemDaoDich', sendDate: '20/1/2023 3h35p' },
  // ];
  const [packages, setPackages] = useState([]);
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  useEffect(() => {
    try {
      console.log('Call');
      axios
        .get(`http://localhost:1510/getArrivalParcelPackage`, {
          params: {
            id: '12345',
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
  // const invoiceDetail = [
  //   {
  //     id: 1,
  //     senderName: 'Nhut Le',
  //     senderPhone: '0123456789',
  //     senderAddress: 'Ha Noi',
  //     receiverName: 'Jon',
  //     receiverPhone: '9876543210',
  //     receiverAddress: 'Khum bic',
  //     from: 'abx',
  //     to: 'xyz',
  //     cost: 35,
  //   },
  //   {
  //     id: 2,
  //     senderName: 'Duy Khanh',
  //     senderPhone: '0123456789',
  //     senderAddress: 'Hai Phong',
  //     receiverName: 'Cersei',
  //     receiverPhone: '9876543210',
  //     receiverAddress: 'Khum bic',
  //     from: 'abx',
  //     to: 'xyz',
  //     cost: 42,
  //   },
  //   {
  //     id: 3,
  //     senderName: 'Phuc Khang',
  //     senderPhone: '0123456789',
  //     senderAddress: 'Ha Noi',
  //     receiverName: 'Jaime',
  //     receiverPhone: '9876543210',
  //     receiverAddress: 'Khum bic',
  //     from: 'abx',
  //     to: 'xyz',
  //     cost: 45,
  //   },
  //   {
  //     id: 4,
  //     senderName: 'Duy Nong',
  //     senderPhone: '0123456789',
  //     senderAddress: 'Thai Nguyn',
  //     receiverName: 'Arya',
  //     receiverPhone: '9876543210',
  //     receiverAddress: 'Khum bic',
  //     from: 'abx',
  //     to: 'xyz',
  //     cost: 16,
  //   },
  //   {
  //     id: 5,
  //     senderName: 'Hai Nam',
  //     senderPhone: '0123456789',
  //     senderAddress: 'Thanh Hoa',
  //     receiverName: 'Daenerys',
  //     receiverPhone: '9876543210',
  //     receiverAddress: 'Khum bic',
  //     from: 'abx',
  //     to: 'xyz',
  //     cost: null,
  //   },
  // ];

  const handleDetailsClick = (packageData) => {
    console.log(packageData);
    setShowDetails(true);
    setSelectedPackage(packageData);
    try {
      console.log('Call get detail');
      axios
        .get(`http://localhost:1510/getPackageDetail`, {
          params: {
            package_id: packageData.parcel_package_id,
          },
        })
        .then(function (response) {
          // console.log(response.data.data);
          setInvoiceDetail(response.data.data);
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
          kind_point: 'transaction',
          parcel_id: parcel_id,
          cur_pos: 3,
          sender_zip_code: 'cba',
          trans_id: '54321',
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
  const handleAcceptedClick = () => {
    axios
      .post(`http://localhost:1510/confirmPackage`, {
        data: {
          package_id: 'a',
        },
      })
      .then(function (response) {
        let parcel_ids = response.data.parcel_ids;
        parcel_ids.map((row) => {
          confirmParcel(row.parcel_id);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
              {/* <TableCell>From</TableCell> */}
              {/* <TableCell>To</TableCell> */}
              <TableCell>Cost</TableCell>
              <TableCell>Xác nhận</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.parcel_id}</TableCell>
                <TableCell>{order.sender_name}</TableCell>
                <TableCell>{order.sender_phone}</TableCell>
                <TableCell>{order.sender_address}</TableCell>
                <TableCell>{order.receiver_name}</TableCell>
                <TableCell>{order.receiver_phone}</TableCell>
                <TableCell>{order.receiver_address}</TableCell>
                {/* <TableCell>{order.from}</TableCell> */}
                {/* <TableCell>{order.to}</TableCell> */}
                <TableCell>{order.cod_amount}</TableCell>
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
                  <TableCell>Ngày tháng nhận</TableCell>
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
        </div>
      )}
    </div>
  );
};

export default TransactionDataCard;
