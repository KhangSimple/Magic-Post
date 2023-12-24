import classNames from 'classnames/bind';
import styles from './ProductPackageInfo.module.scss';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Input from '~/components/Input';
import { useState } from 'react';

const cx = classNames.bind(styles);
const ProductPackageInfo = ({ productList, setPackageProductInfo, packageProductInfo }) => {
  packageProductInfo.weight = productList.reduce((accumulator, currentValue, currentIndex, array) => {
    let newWeight = parseInt(currentValue.weight) * parseInt(currentValue.quantity);
    return accumulator + newWeight;
  }, 0);
  return (
    <div className={cx(styles.wrapper)}>
      <div className={cx(styles.row)}>
        <div className={cx(styles.blockCenter)}>
          <label className={cx(styles.label)}>KL (gam)&emsp;</label>
          <TextField
            id='standard-basic'
            variant='standard'
            value={packageProductInfo.weight}
            disabled
          />
        </div>
        <div className={cx(styles.blockCenter)}>
          <label className={cx(styles.label)}>Dài&emsp;</label>
          <TextField
            id='standard-basic'
            variant='standard'
            value={packageProductInfo.length}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, length: value.target.value });
            }}
          />
        </div>
        <div className={cx(styles.blockCenter)}>
          <label className={cx(styles.label)}>Rộng&emsp;</label>
          <TextField
            id='standard-basic'
            variant='standard'
            value={packageProductInfo.width}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, width: value.target.value });
            }}

          />
        </div>
        <div className={cx(styles.blockCenter)}>
          <label className={cx(styles.label)}>Cao&emsp;</label>
          <TextField
            id='standard-basic'
            variant='standard'
            value={packageProductInfo.height}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, height: value.target.value });
            }}
          />
        </div>
      </div>
      <div className={cx(styles.row)}>
        <p>Khối lượng quy đổi: 40g</p>
      </div>
      <div className={cx(styles.row)}>
        <Box className={cx(styles.left)}>
          <label>Tổng tiền thu hộ COD</label>
          <Input
            value={packageProductInfo.sumOfCOD}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, sumOfCOD: value });
            }}
          ></Input>
        </Box>
        <Box className={cx(styles.right)}>
          <label>Tổng giá trị hàng hoá</label>
          <Input
            value={packageProductInfo.totalPackageValue}
            onChange={(value) => {
              setPackageProductInfo({ ...packageProductInfo, totalPackageValue: value });
            }}
          ></Input>
        </Box>
      </div>
    </div>
  );
};
export default ProductPackageInfo;
