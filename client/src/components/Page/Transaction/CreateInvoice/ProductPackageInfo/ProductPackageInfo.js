import classNames from 'classnames/bind';
import styles from './ProductPackageInfo.module.scss';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Input from '~/components/Input';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';

const cx = classNames.bind(styles);
const ProductPackageInfo = ({ productList, setPackageProductInfo, packageProductInfo }) => {
  packageProductInfo.weight = productList.reduce((accumulator, currentValue, currentIndex, array) => {
    let newWeight = parseInt(currentValue.weight) * parseInt(currentValue.quantity);
    return accumulator + newWeight;
  }, 0);
  return (
    <div className={cx(styles.wrapper)}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <label>KL(gam)&emsp;</label>
          <TextField
            id='standard-basic'
            variant='standard'
            value={packageProductInfo.weight}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}><label>Dài&emsp;</label>
          <TextField
            id='standard-basic'
            variant='standard'
            value={packageProductInfo.length}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, length: value.target.value });
            }}
          /></Grid>
        <Grid item xs={12} sm={6} md={6}><label>Rộng&emsp;</label>
          <TextField
            id='standard-basic'
            variant='standard'
            value={packageProductInfo.width}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, width: value.target.value });
            }}

          /></Grid>
        <Grid item xs={12} sm={6} md={6}>
          <label>Cao&emsp;</label>
          <TextField
            id='standard-basic'
            variant='standard'
            value={packageProductInfo.height}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, height: value.target.value });
            }}
          />
        </Grid>
      </Grid>
      <Grid container columnSpacing={3} sx={{marginTop: '1rem'}}>
        <Grid xs={12} sm={6} md={6}><Box>
          <label>Tổng tiền thu hộ COD</label>
          <Input
            value={packageProductInfo.sumOfCOD}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, sumOfCOD: value });
            }}
          ></Input>
        </Box></Grid>
        <Grid xs={12} sm={6} md={6}><Box>
          <label>Tổng giá trị hàng hoá</label>
          <Input
            value={packageProductInfo.totalPackageValue}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, totalPackageValue: value });
            }}
          ></Input>
        </Box></Grid>
      </Grid>
    </div>
  );
};
export default ProductPackageInfo;
