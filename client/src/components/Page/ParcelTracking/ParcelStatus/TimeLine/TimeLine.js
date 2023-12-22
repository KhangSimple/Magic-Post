import styles from './TimeLine.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const TimeLine = ({ status, details, isShowPostPosition, isActive }) => {
  return (
    <div className={cx(styles.wrapper)}>
      <div className={cx(styles.event)}>
        <div className={cx(styles.status)}>{status}</div>
        <div className={cx(styles.details)}>{details}</div>
        <div className={cx(styles.indicator, isActive && styles.active)}></div>
        {console.log(styles)}
      </div>
      {isShowPostPosition ? (
        <div className={cx(styles.showPostPosition)}>
          Thông tin bưu cục
          <img
            className={cx(styles.img)}
            src="https://viettelpost.vn/viettelpost-iframe/assets/images/location-v2.png"
          ></img>
        </div>
      ) : (
        <div className={cx(styles.showDetail)}>Xem chi tiết đơn hàng</div>
      )}
    </div>
  );
};

export default TimeLine;
