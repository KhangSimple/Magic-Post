import styles from './ParcelStatus.module.scss';
import classNames from 'classnames/bind';
import TimeLine from './TimeLine/TimeLine';
const cx = classNames.bind(styles);
const ParcelStatus = () => {
  return (
    <div className={cx(styles.wrapper)}>
      <TimeLine
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
        isActive
        details={'21/12/2020 08:31:39: Nhận tại Bưu cục Dịch Vọng Hậu ABC'}
        status={'Vận chuyển'}
      ></TimeLine>
    </div>
  );
};
export default ParcelStatus;
