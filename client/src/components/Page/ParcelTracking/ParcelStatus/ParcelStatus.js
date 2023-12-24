import styles from './ParcelStatus.module.scss';
import classNames from 'classnames/bind';
import TimeLine from './TimeLine/TimeLine';

import { dateFormat } from '..';
import { ParcelContext } from '..';
import { useContext } from 'react';
const cx = classNames.bind(styles);
const ParcelStatus = () => {
  const parcel = useContext(ParcelContext).parcelData;
  const parcelStatus = parcel.info ? parcel.info : [];
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
        } else {
          return (
            <TimeLine
              key={index}
              details={dateFormat(item.time) + ' : ' + item.status + ' Bưu cục ' + item.address}
              isActive
              status={'Đang vận chuyển'}
              isShowPostPosition
            ></TimeLine>
          );
        }
      })}
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
