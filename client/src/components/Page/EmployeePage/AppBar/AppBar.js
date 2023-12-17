import classNames from 'classnames/bind';
import styles from './appBar.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';

const cx = classNames.bind(styles);

const AppBarEmployee = () => {
  return (
    <div className={cx('app-bar')}>
      <div className={cx('search')}>
        <SearchIcon fontSize="large" color="primary" sx={{ m: 2 }} />
        <input
          className={cx('search-input')}
          placeholder="Tìm kiếm"
          onChange={(value) => {
            console.log('Hehe');
          }}
        />
      </div>
      <div className={cx('noti-avt')}>
        <div className={cx('icon-notification')}>
          <NotificationsIcon fontSize="large" color="primary" sx={{ m: 1 }} />
        </div>
        <div className={cx('avatar')}></div>
      </div>
    </div>
  );
};
export default AppBarEmployee;
