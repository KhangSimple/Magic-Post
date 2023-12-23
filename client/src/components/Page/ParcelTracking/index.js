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
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return day + '/' + month + '/' + year;
  }
}

export const ParcelContext = createContext();

const ParcelTracking = () => {
  const [parcelData, setParcelData_] = useState({ data: {}, info: [] });
  const setParcelData = (data) => {
    setParcelData_(data);
  };
  console.log(parcelData);
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
