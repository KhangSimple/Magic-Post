import images from '~/assets/images';
import React, { useState } from 'react';
import AppBarEmployee from '../AppBar/AppBar';
import CollectionDataTable from '../ParcelCollection/ParcelCollectionsInStock';
import classNames from 'classnames/bind';
import styles from './dashboard.module.scss';
const cx = classNames.bind(styles);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('don-di');
  return (
    <div className={cx('dashboard-container')}>
      <div className={cx('sidebar')}>
        <div className={cx('logo')}>
          {' '}
          <img className={cx('logo')} src={images.logo} alt="logo" />
        </div>
        <div className={cx('inforEmployee')}>
          <div className={cx('avatar')}></div>
          <div className={cx('employee-name')}>Nguyễn Nhật Lê</div>
        </div>

        <div className={cx('functionality')}>
          <div
            className={cx('function-item', { active: activeTab === 'don-di' })}
            onClick={() => setActiveTab('don-di')}
          >
            Đơn đi
          </div>
          <div
            className={cx('function-item', { active: activeTab === 'don-den' })}
            onClick={() => setActiveTab('don-den')}
          >
            Đơn đến
          </div>
        </div>
      </div>
      <div className={cx('main-content')}>
        {activeTab === 'don-di' && (
          <div>
            <AppBarEmployee />
            <CollectionDataTable />
          </div>
        )}
        {activeTab === 'don-den' && (
          <div>
            <AppBarEmployee />
            keke
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
