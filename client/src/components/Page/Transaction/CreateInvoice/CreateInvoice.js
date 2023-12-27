import * as React from 'react';
import styles from './CreateInvoice.module.scss';
import classNames from 'classnames/bind';
import Box from '@mui/material/Box';
import InfoTitle from './InfoTitle/InfoTitle';
import Product from './Product/Product';
import Input from '~/components/Input';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';

import { Container, Divider } from '@mui/material';
import AddMoreProduct from './AddMoreProduct/AddMoreProduct';
import ProductPackageInfo from './ProductPackageInfo/ProductPackageInfo';
import MinHeightTextarea from './MinHeightTextArea';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DashboardLayout from 'src/layouts/dashboard';
import navConfig from '../config-navigation';
import AppWidgetSummary from '~/components/Page/Transaction/Statistics/components/WidgetSummary';
import axios from 'axios';
import Address from '~/Object/Address';
import { LocalFireDepartmentOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const defaultPackageInfo = {
  fee: {},
  sumOfCOD: '',
  totalPackageValue: '',
  weight: '0',
  height: '10',
  length: '10',
  width: '10',
};
const defaultNote = {
  requiredNote: 'KHONGCHOXEMHANG',
  note: '',
};
const requiredNoteState = {
  'Không cho xem hàng': 'KHONGCHOXEMHANG',
  'Cho xem hàng không cho thử': 'CHOXEMHANGKHONGTHU',
  'Cho thử hàng': 'CHOTHUHANG',
};

const ZIP_CODE = localStorage.getItem('zip_code');
const NAME = localStorage.getItem('name');
const cx = classNames.bind(styles);
const defaultProduct = { name: '', code: '', weight: '200', quantity: '1' };

const CreateInvoice = () => {
  let [senderProvinceData, setSenderProvinceData] = useState([]);
  let [senderDistrictData, setSenderDistrictData] = useState([]);
  let [senderWardData, setSenderWardData] = useState([]);
  let [receiverProvinceData, setReceiverProvinceData] = useState([]);
  let [receiverDistrictData, setReceiverDistrictData] = useState([]);
  let [receiverWardData, setReceiverWardData] = useState([]);
  const [packageProductInfo, setPackageProductInfo] = useState(defaultPackageInfo);
  const [note, setNote] = useState(defaultNote);
  const navigate = useNavigate();

  const [senderInfo, setSenderInfo] = useState({
    name: '',
    phoneNumber: '',
    province: { name: '', id: '' },
    district: { name: '', id: '' },
    ward: { name: '', id: '' },
  });

  const [receiverInfo, setReceiverInfo] = useState({
    name: '',
    phoneNumber: '',
    province: { name: '', id: '' },
    district: { name: '', id: '' },
    ward: { name: '', id: '' },
  });

  const [productList, setProductList] = useState([{ ...defaultProduct, uuid: uuidv4() }]);

  React.useEffect(() => {
    axios
      .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
        headers: { token: '1b869b93-97de-11ee-a59f-a260851ba65c' },
      })
      .then(function (response) {
        setSenderProvinceData((prev) => [...response.data.data]);
        setReceiverProvinceData((prev) => [...response.data.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    if (senderInfo.province.id !== '') {
      // senderInfo.district.id = '';
      // senderInfo.ward.id = '';
      // setSenderWardData([]);
      axios
        .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
          headers: { token: '7dbb1c13-7e11-11ee-96dc-de6f804954c9' },
          params: {
            province_id: +senderInfo.province.id,
          },
        })
        .then(function (response) {
          setSenderDistrictData((prev) => [...response.data.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [senderInfo.province]);

  React.useEffect(() => {
    if (receiverInfo.province.id !== '') {
      // receiverInfo.district.id = '';
      // receiverInfo.ward.id = '';
      setReceiverWardData([]);
      axios
        .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
          headers: { token: '7dbb1c13-7e11-11ee-96dc-de6f804954c9' },
          params: {
            province_id: +receiverInfo.province.id,
          },
        })
        .then(function (response) {
          setReceiverDistrictData((prev) => [...response.data.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [receiverInfo.province]);

  React.useEffect(() => {
    if (senderInfo.district.id !== '') {
      axios
        .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
          headers: { token: '7dbb1c13-7e11-11ee-96dc-de6f804954c9' },
          params: {
            district_id: +senderInfo.district.id,
          },
        })
        .then(function (response) {
          setSenderWardData((prev) => [...response.data.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [senderInfo.district]);

  React.useEffect(() => {
    if (receiverInfo.district.id !== '') {
      axios
        .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
          headers: { token: '7dbb1c13-7e11-11ee-96dc-de6f804954c9' },
          params: {
            district_id: +receiverInfo.district.id,
          },
        })
        .then(function (response) {
          setReceiverWardData((prev) => [...response.data.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [receiverInfo.district]);

  function handleAddMoreProduct() {
    setProductList([...productList, { ...defaultProduct, uuid: uuidv4() }]);
  }
  function handleDeleteProduct(index) {
    // console.log(productList[index]);
    var productListClone = [];
    for (let i = 0; i < productList.length; i++) {
      if (i !== index) productListClone.push(productList[i]);
    }
    // console.log(productListClone);
    setProductList(productListClone);
  }

  function handleUpdateProductInfo(index, updateInfo) {
    productList[index] = { ...productList[index], ...updateInfo };
    setProductList(productList);

    setPackageProductInfo({
      ...packageProductInfo,
      weight: productList.reduce((accumulator, currentValue, currentIndex, array) => {
        console.log(parseInt(currentValue.weight) * parseInt(currentValue.quantity));
        let newWeight = parseInt(currentValue.weight) * parseInt(currentValue.quantity);
        return accumulator + newWeight;
      }, 0),
    });
  }

  const createParcel = () => {
    axios
      .post(`http://localhost:1510/createParcel`, {
        data: {
          token: localStorage.getItem('token'),
          zip_code: ZIP_CODE,
          receiver_zip_code: receiverInfo.district.id,
          senderInfo: senderInfo,
          receiverInfo: receiverInfo,
          productList: productList,
          packageProductInfo: packageProductInfo,
          note: note,
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          navigate('/transaction/employee/parcel-in-stock');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(() => {
    axios
      .get(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
        headers: { token: '1b869b93-97de-11ee-a59f-a260851ba65c', shop_id: '4758658' },
        params: {
          service_type_id: 2,
          from_district_id: ZIP_CODE,
          to_district_id: receiverInfo.district.id,
          to_ward_code: receiverInfo.ward.id,
          height: packageProductInfo.height,
          length: packageProductInfo.length,
          weight: packageProductInfo.weight,
          width: packageProductInfo.width,
          insurance_value: packageProductInfo.totalPackageValue,
          coupon: null,
        },
      })
      .then(function (response) {
        if (response.status == 200) {
          setPackageProductInfo({ ...packageProductInfo, fee: response.data.data });
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [
    receiverInfo.district.id,
    receiverInfo.ward.id,
    packageProductInfo.weight,
    packageProductInfo.length,
    packageProductInfo.height,
    packageProductInfo.width,
    packageProductInfo.sumOfCOD,
    packageProductInfo.totalPackageValue,
  ]);
  return (
    <DashboardLayout navConfig={navConfig}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">TẠO ĐƠN HÀNG ĐIỂM GIAO DỊCH</Typography>

          {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Tạo tài khoản
        </Button> */}
        </Stack>
        <Card>
          <div
            style={{
              // width: '50%',
              // margin: 'auto',
              padding: '2rem',
            }}
          >
            <InfoTitle>Bên gửi</InfoTitle>
            <Grid container columnSpacing={10}>
              <Grid xs={12} sm={6} md={6}>
                <label>Số điện thoại</label>
                <Input
                  placeHolder={'Nhập số điện thoại'}
                  value={senderInfo.phoneNumber}
                  onChange={(value) => {
                    setSenderInfo({ ...senderInfo, phoneNumber: value });
                  }}
                ></Input>
                <label>Họ tên</label>
                <Input
                  placeHolder={'Nhập họ tên'}
                  value={senderInfo.name}
                  onChange={(value) => {
                    setSenderInfo({ ...senderInfo, name: value });
                  }}
                ></Input>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <label>Tỉnh - thành phố </label>
                <Input
                  select
                  data={senderProvinceData}
                  value={senderInfo.province.id}
                  optionLabel="ProvinceName"
                  optionValue="ProvinceID"
                  onChange={(value) => {
                    let row = senderProvinceData.filter((row) => row.ProvinceID === value);
                    setSenderInfo({ ...senderInfo, province: { name: row[0].ProvinceName, id: row[0].ProvinceID } });
                  }}
                ></Input>
                <label>Quận - huyện</label>
                <Input
                  select
                  data={senderDistrictData}
                  value={senderInfo.district.id}
                  optionLabel="DistrictName"
                  optionValue="DistrictID"
                  onChange={(value) => {
                    let row = senderDistrictData.filter((row) => row.DistrictID === value);
                    setSenderInfo({ ...senderInfo, district: { name: row[0].DistrictName, id: row[0].DistrictID } });
                  }}
                ></Input>
                <label>Phường - xã</label>
                <Input
                  select
                  data={senderWardData}
                  value={senderInfo.ward.id}
                  optionLabel="WardName"
                  optionValue="WardCode"
                  onChange={(value) => {
                    let row = senderWardData.filter((row) => row.WardCode === value);
                    setSenderInfo({ ...senderInfo, ward: { name: row[0].WardName, id: row[0].WardCode } });
                  }}
                ></Input>
              </Grid>
            </Grid>
            <Divider />

            <InfoTitle>Bên nhận</InfoTitle>
            <Grid container columnSpacing={10}>
              <Grid xs={12} sm={6} md={6}>
                <label>Số điện thoại</label>
                <Input
                  placeHolder={'Nhập số điện thoại'}
                  value={receiverInfo.phoneNumber}
                  onChange={(value) => {
                    setReceiverInfo({ ...receiverInfo, phoneNumber: value });
                  }}
                ></Input>
                <label>Họ tên</label>
                <Input
                  placeHolder={'Nhập họ tên'}
                  value={receiverInfo.name}
                  onChange={(value) => {
                    setReceiverInfo({ ...receiverInfo, name: value });
                  }}
                ></Input>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <label>Tỉnh - thành phố</label>
                <Input
                  select
                  data={receiverProvinceData}
                  value={receiverInfo.province.id}
                  optionLabel="ProvinceName"
                  optionValue="ProvinceID"
                  onChange={(value) => {
                    let row = receiverProvinceData.filter((row) => row.ProvinceID === value);
                    setReceiverInfo({
                      ...receiverInfo,
                      province: { name: row[0].ProvinceName, id: row[0].ProvinceID },
                    });
                  }}
                ></Input>
                <label>Quận - huyện</label>
                <Input
                  select
                  data={receiverDistrictData}
                  value={receiverInfo.district.id}
                  optionLabel="DistrictName"
                  optionValue="DistrictID"
                  onChange={(value) => {
                    let row = receiverDistrictData.filter((row) => row.DistrictID === value);
                    setReceiverInfo({
                      ...receiverInfo,
                      district: { name: row[0].DistrictName, id: row[0].DistrictID },
                    });
                  }}
                ></Input>
                <label>Phường - xã</label>
                <Input
                  select
                  data={receiverWardData}
                  value={receiverInfo.ward.id}
                  optionLabel="WardName"
                  optionValue="WardCode"
                  onChange={(value) => {
                    let row = receiverWardData.filter((row) => row.WardCode === value);
                    setReceiverInfo({ ...receiverInfo, ward: { name: row[0].WardName, id: row[0].WardCode } });
                  }}
                ></Input>
              </Grid>
            </Grid>
            <Divider />
            <InfoTitle>Sản phẩm</InfoTitle>
            <>
              {productList.map((value, index) => (
                <Product
                  key={value.uuid}
                  handleDeleteProduct={handleDeleteProduct}
                  handleUpdateProductInfo={handleUpdateProductInfo}
                  initValue={value}
                  index={index}
                ></Product>
              ))}
            </>
            <AddMoreProduct onClick={handleAddMoreProduct}></AddMoreProduct>
            <Divider />
            <InfoTitle>Thông tin gói hàng</InfoTitle>
            <ProductPackageInfo
              productList={productList}
              setPackageProductInfo={setPackageProductInfo}
              packageProductInfo={packageProductInfo}
            ></ProductPackageInfo>
            {/*{console.log(packageProductInfo)}*/}
            <Divider />
            <InfoTitle>Lưu ý - Ghi chú</InfoTitle>
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} md={6}>
                <Box>
                  <label>Lưu ý giao hàng</label>
                  <Input
                    select
                    data={Object.keys(requiredNoteState)}
                    onChange={(value) => {
                      setNote({ ...note, requiredNote: requiredNoteState[value] });
                    }}
                    value={note.requiredNote}
                  ></Input>
                </Box>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <Box>
                  <label>Ghi chú </label>
                  <MinHeightTextarea
                    value={note.note}
                    onChange={(value) => {
                      setNote({ ...note, note: value.target.value });
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </div>
        </Card>
      </Container>
      <button style={{ height: 200 }} onClick={() => createParcel()}>
        Tạo đơn hàng
      </button>
    </DashboardLayout>
  );
};
export default CreateInvoice;
