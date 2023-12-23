import axios from 'axios';
import styles from './ParcelHeader.module.scss';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { ParcelContext } from '..';
const cx = classNames.bind(styles);

const ParcelHeader = ({ data, updateFunc }) => {
  const parcel = useContext(ParcelContext);
  const searchParcel = () => {
    axios
      .get(`http://localhost:1510/searchParcel`, {
        params: {
          parcel_id: bill,
        },
      })
      .then(function (response) {
        parcel.setParcelData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [bill, setBill] = useState('');
  return (
    <div className={cx(styles.wrapper)}>
      <div className={cx(styles.paneTop)}>
        <p className={cx(styles.p1, styles.bold)}>Mã phiếu gửi</p>
        <p className={cx(styles.p2)}>(Tra nhiều bill bằng cách thêm dấu phẩy giữa các bill)</p>
        <div className={cx(styles.inputContainer)}>
          <Input
            className={cx(styles.input)}
            value={bill}
            maxlengt="220"
            placeHolder={'VD : 12354,45677'}
            type={'text'}
            onChange={(value) => {
              setBill(value);
            }}
          ></Input>
        </div>
        <Button className={cx(styles.button)} onClick={() => searchParcel()}>
          Tra cứu
        </Button>
      </div>
    </div>
  );
};
export default ParcelHeader;
