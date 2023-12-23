import classNames from 'classnames/bind';
import styles from './employeeScr.module.scss';
import React from 'react';
import Dashboard from './Dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function EmployeePage() {
  const nagivate = useNavigate();
  const Logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    nagivate('/employee/login');
  };
  return (
    <div className={cx(styles.EmployeePage)}>
      <Dashboard />
      <button onClick={() => Logout()}>Logout</button>
    </div>
  );
}
export default EmployeePage;
