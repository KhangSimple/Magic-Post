import classNames from 'classnames/bind';
import styles from './employeeScr.module.scss';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Dashboard from './Dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
export const EmployeePageContext = createContext();
const cx = classNames.bind(styles);
function EmployeePage() {
  const [decodeData, setDecodeData] = useState({});
  useEffect(() => {
    console.log('Use Effect main index');
    axios
      .get(`http://localhost:1510/verify-token`, {
        params: {
          token: localStorage.getItem('token'),
        },
      })
      .then(function (response) {
        setDecodeData(response.data.decodeData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const nagivate = useNavigate();
  const Logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    nagivate('/employee/login');
  };
  const contextValue = useMemo(
    () => ({
      decodeData,
      setDecodeData,
    }),
    [decodeData],
  );
  return (
    <EmployeePageContext.Provider value={contextValue}>
      <div className={cx(styles.EmployeePage)}>
        <Dashboard />
        <button onClick={() => Logout()}>Logout</button>
      </div>
    </EmployeePageContext.Provider>
  );
}
export default EmployeePage;
