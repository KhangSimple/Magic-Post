import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '~/components/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Product = ({ handleDeleteProduct, handleUpdateProductInfo, initValue, index }) => {
  const [productInfo, setProductInfo] = useState(initValue);

  return (
    <div className={cx(styles.wrapper)}>
      <Grid container spacing={3}>
        <Grid container xs={12} sm={6} md={8} className={cx(styles.info)}>
          <Grid xs={12} sm={6} md={6}><TextField

            id='standard-basic'
            placeholder='Nhập tên sản phẩm'
            value={productInfo['name']}
            onChange={(value) => {
              setProductInfo({
                ...productInfo,
                name: value.target.value,
              });
              handleUpdateProductInfo(index, { name: value.target.value });
            }}
            // onChange=
            variant='standard'
          /></Grid>
          <Grid xs={12} sm={6} md={6}><TextField

            id='standard-basic'
            placeholder='Nhập mã sản phẩm'
            variant='standard'
            value={productInfo['code']}
            onChange={(value) => {
              setProductInfo({
                ...productInfo,
                code: value.target.value,
              });
              handleUpdateProductInfo(index, { code: value.target.value });
            }}
          /></Grid>
          <Grid xs={12} sm={6} md={6}><label>KL (gam)&emsp;</label>
            <TextField
              id='standard-basic'
              placeholder='Nhập khối lượng'
              variant='standard'
              value={productInfo['weight']}
              onChange={(value) => {
                setProductInfo({
                  ...productInfo,
                  weight: value.target.value,
                });
                handleUpdateProductInfo(index, { weight: value.target.value });
              }}
            /></Grid>
          <Grid xs={12} sm={6} md={6}><label>SL&emsp;</label>
            <TextField
              id='standard-basic'
              placeholder='Nhập số lượng'
              value={productInfo['quantity']}
              onChange={(value) => {
                setProductInfo({
                  ...productInfo,
                  quantity: value.target.value,
                });
                handleUpdateProductInfo(index, { quantity: value.target.value });
              }}
              variant='standard'
            /></Grid>
        </Grid>
        <Grid xs={12} sm={6} md={4} className={cx(styles.buttons)}>
          <Button className={cx(styles.button)}>Sao chép</Button>
          <Button
            className={cx(styles.button)}
            leftIcon={<DeleteIcon></DeleteIcon>}
            onClick={() => handleDeleteProduct(index)}
          >
            Xoá
          </Button>
        </Grid>
      </Grid>
    </div>

  );
};
export default Product;
