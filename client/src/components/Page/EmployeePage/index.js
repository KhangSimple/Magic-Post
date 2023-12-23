import classNames from 'classnames/bind';
import styles from './employeeScr.module.scss';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Dashboard from './Dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EmployeePageContext = createContext();
const cx = classNames.bind(styles);
function EmployeePage() {
  const [decodeData, setDecodeData] = useState({});
  useEffect(() => {
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
  return (
    <EmployeePageContext.Provider value={decodeData}>
      <div className={cx(styles.EmployeePage)}>
        <Dashboard />
        <button onClick={() => Logout()}>Logout</button>
      </div>
    </EmployeePageContext.Provider>
  );
}
export default EmployeePage;
