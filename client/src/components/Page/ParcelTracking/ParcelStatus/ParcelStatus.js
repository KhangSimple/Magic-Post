import styles from './ParcelStatus.module.scss';
import classNames from 'classnames/bind';
import TimeLine from './TimeLine/TimeLine';

import { dateFormat } from '..';
import { ParcelContext } from '..';
import { useContext } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);
const ParcelStatus = () => {
  const parcel = useContext(ParcelContext).parcelData;
  const parcelStatus = parcel.info ? parcel.info : [];
  console.log(parcel.data[0]);
  const confirmParcel = () => {
    axios
      .post(`http://localhost:1510/confirmParcel`, {
        data: {
          kind_point: '...',
          kind: 'success',
          parcel_id: parcel.data[0].id,
          transaction_zip_code: parcel.data[0].receiver_zip_code,
        },
      })
      .then(function (response) {
        // let parcel_ids = response.data;
        // console.log(parcel_ids);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const confirmParcelUnsuccessful = () => {
    axios
      .post(`http://localhost:1510/confirmParcel`, {
        data: {
          kind_point: '...',
          kind: 'fail',
          parcel_id: parcel.data[0].id,
          transaction_zip_code: parcel.data[0].receiver_zip_code,
        },
      })
      .then(function (response) {
        // let parcel_ids = response.data;
        // console.log(parcel_ids);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className={cx(styles.wrapper)}>
      {parcelStatus.map((item, index) => {
        if (index < parcelStatus.length - 1) {
          return (
            <TimeLine
              key={index}
              details={dateFormat(item.time) + ' : ' + item.status + ' Bưu cục ' + item.address}
              status={'Vận chuyển'}
              isShowPostPosition
            ></TimeLine>
          );
        } else if (parcelStatus.length < 8) {
          return (
            <TimeLine
              key={index}
              details={dateFormat(item.time) + ' : ' + item.status + ' Bưu cục ' + item.address}
              isActive
              status={'Đang vận chuyển'}
              isShowPostPosition
            ></TimeLine>
          );
        } else {
          return (
            <TimeLine
              key={index}
              details={dateFormat(item.time) + ' : ' + item.detail}
              isActive
              status={item.status}
              isShowPostPosition
            ></TimeLine>
          );
        }
      })}
      {parcelStatus.length == 7 && (
        <div>
          <button onClick={() => confirmParcel()} style={{ background: 'blue', height: 50 }}>
            Xác nhận đã nhận đơn hàng
          </button>
          <br />
          <br />
          <button onClick={() => confirmParcelUnsuccessful()} style={{ background: 'red', height: 50 }}>
            Xác nhận đơn hàng không đến
          </button>
        </div>
      )}
      {/* <TimeLine
        details={'21/12/2020 08:31:39: Nhận tại Bưu cục Phú Mỹ Hưng - HCM - Q.7 - TP.Hồ Chí Minh'}
        isActive
        status={'Đang vận chuyển'}
        isShowPostPosition
      ></TimeLine>
      <TimeLine
        details={'21/12/2020 08:31:39: Nhận tại Bưu cục Dịch Vọng Hậu ABC'}
        status={'Vận chuyển'}
        isShowPostPosition
      ></TimeLine>
      <TimeLine
        details={'21/12/2020 08:31:39: Nhận tại Bưu cục Dịch Vọng Hậu ABC'}
        status={'Vận chuyển'}
      ></TimeLine> */}
    </div>
  );
};
export default ParcelStatus;
