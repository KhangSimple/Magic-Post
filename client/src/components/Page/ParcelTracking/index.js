import styles from './ParcelTracking.module.scss';
import classNames from 'classnames/bind';
import ParcelInfo from './ParcelInfo/ParcelInfo';
import ParcelStatus from './ParcelStatus/ParcelStatus';
import ParcelHeader from './ParcelHeader/ParcelHeader';
const cx = classNames.bind(styles);
const ParcelTracking = () => {
  return (
    <div className={cx(styles.wrapper)}>
      <ParcelHeader></ParcelHeader>
      <ParcelInfo></ParcelInfo>
      <ParcelStatus></ParcelStatus>
    </div>
  );
};
export default ParcelTracking;
