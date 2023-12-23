import styles from './ParcelTracking.module.scss';
import classNames from 'classnames/bind';
import ParcelInfo from './ParcelInfo/ParcelInfo';
import ParcelStatus from './ParcelStatus/ParcelStatus';
import ParcelHeader from './ParcelHeader/ParcelHeader';
import { createContext, useMemo, useState } from 'react';
const cx = classNames.bind(styles);

export function dateFormat(date) {
  if (date) {
    const d = new Date(date);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var second = d.getSeconds();
    hours = hours > 9 ? hours : '0' + hours.toString();
    minutes = minutes > 9 ? minutes : '0' + minutes.toString();
    second = second > 9 ? second : '0' + second.toString();
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + second;
  }
}

export const ParcelContext = createContext();

const ParcelTracking = () => {
  const [parcelData, setParcelData_] = useState({ data: {}, info: [] });
  const setParcelData = (data) => {
    setParcelData_(data);
  };
  const contextValue = useMemo(
    () => ({
      parcelData,
      setParcelData,
    }),
    [parcelData],
  );
  return (
    <ParcelContext.Provider value={contextValue}>
      <div className={cx(styles.wrapper)}>
        <ParcelHeader></ParcelHeader>
        <ParcelInfo></ParcelInfo>
        <ParcelStatus></ParcelStatus>
      </div>
    </ParcelContext.Provider>
  );
};
export default ParcelTracking;
