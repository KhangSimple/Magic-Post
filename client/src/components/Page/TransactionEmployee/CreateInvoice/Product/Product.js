import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '~/components/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Product = ({ handleDeleteProduct, handleUpdateProductInfo, initValue, index }) => {
  const [productInfo, setProductInfo] = useState(initValue);

  return (
    <div className={cx(styles.wrapper)}>
      <div className={cx(styles.info)}>
        <div className={cx(styles.firstRow)}>
          <TextField
            className={cx(styles.left)}
            id="standard-basic"
            placeholder="Nhập tên sản phẩm"
            value={productInfo['name']}
            onChange={(value) => {
              setProductInfo({
                ...productInfo,
                name: value.target.value,
              });
              handleUpdateProductInfo(index, { name: value.target.value });
            }}
            // onChange=
            variant="standard"
            inputProps={{
              style: {
                height: '30px',
                fontSize: '17px',
              },
            }}
          />
          <TextField
            className={cx(styles.right)}
            id="standard-basic"
            placeholder="Nhập mã sản phẩm"
            variant="standard"
            value={productInfo['code']}
            onChange={(value) => {
              setProductInfo({
                ...productInfo,
                code: value.target.value,
              });
              handleUpdateProductInfo(index, { code: value.target.value });
            }}
            inputProps={{
              style: {
                height: '30px',
                fontSize: '17px',
              },
            }}
          />
        </div>
        <div className={cx(styles.secondRow)}>
          <div className={cx(styles.left)}>
            <label className={cx(styles.label)}>KL (gam)&emsp;</label>
            <TextField
              id="standard-basic"
              placeholder="Nhập khối lượng"
              variant="standard"
              value={productInfo['weight']}
              onChange={(value) => {
                setProductInfo({
                  ...productInfo,
                  weight: value.target.value,
                });
                handleUpdateProductInfo(index, { weight: value.target.value });
              }}
              inputProps={{
                style: {
                  height: '30px',
                  fontSize: '17px',
                },
              }}
            />
          </div>
          <div className={cx(styles.right)}>
            <label className={cx(styles.label)}>SL&emsp;</label>
            <TextField
              id="standard-basic"
              placeholder="Nhập số lượng"
              value={productInfo['quantity']}
              onChange={(value) => {
                setProductInfo({
                  ...productInfo,
                  quantity: value.target.value,
                });
                handleUpdateProductInfo(index, { quantity: value.target.value });
              }}
              variant="standard"
              inputProps={{
                style: {
                  height: '30px',
                  fontSize: '17px',
                },
              }}
            />
          </div>
        </div>
        <div className={cx(styles.deleteButton)}></div>
      </div>
      <div className={cx(styles.buttons)}>
        <Button className={cx(styles.button)}>Sao chép</Button>
        <Button
          className={cx(styles.button)}
          leftIcon={<DeleteIcon></DeleteIcon>}
          onClick={() => handleDeleteProduct(index)}
        >
          Xoá
        </Button>
      </div>
    </div>
  );
};
export default Product;
