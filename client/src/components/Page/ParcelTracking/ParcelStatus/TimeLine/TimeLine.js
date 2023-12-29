import styles from './TimeLine.module.scss';
import classNames from 'classnames/bind';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
          <LocationOnIcon />
        </div>
      ) : (
        <div className={cx(styles.showDetail)}>Xem chi tiết đơn hàng</div>
      )}
    </div>
  );
};

export default TimeLine;
