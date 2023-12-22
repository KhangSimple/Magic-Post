import classNames from 'classnames/bind';
import styles from './employeeScr.module.scss';
import React from 'react';
import Dashboard from './Dashboard/Dashboard';

const cx = classNames.bind(styles);

function EmployeePage() {
  return (
    <div className={cx('EmployeePage')}>
      <Dashboard />
    </div>
  );
}
export default EmployeePage;
