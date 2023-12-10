import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, Button, IconButton, Tabs, Tab, Box } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';

const cx = classNames.bind(styles);
//header
const Header = () => {
  return (
    <header>
      <div>
        <img className={cx('logo')} src={images.logo} alt="logo" />
      </div>
      <div className={cx('search-login')}>
        <div className={cx('search')}>
          {/* <Icon>search</Icon> */}
          <input type="text" placeholder="Tìm kiếm" />
        </div>
        <div className={cx('login-register')}>
          <button>Đăng ký/Đăng nhập</button>
        </div>
      </div>
    </header>
  );
};
//app bar
const AppBarMenu = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    // Check if the user has scrolled down by a certain amount (e.g., 100 pixels)
    const scrollPosition = window.scrollY;
    setIsFixed(scrollPosition > 100);
  };

  useEffect(() => {
    // Add a scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className={cx('app-bar', { 'app-bar-fixed': isFixed })}>
      <ul id="main-menu">
        <li className={cx('menu-item')}>
          Trang chủ
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Dịch vụ
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Tin tức
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Ứng dụng số
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Hỗ trợ khách hàng
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
const Main = () => {
  const imageUrl = 'https://meest.com/uploads/images/58ff1989b97bbae7bcda3158eb77caf2.png';
  return (
    <div>
      <img src={imageUrl} alt="Image" width="1500" height="1000" />
    </div>
  );
};

function HomePage() {
  return (
    <div className={cx('App')}>
      <div class={cx('header')}>
        <Header />
        <AppBarMenu />
        <Main />
      </div>
    </div>
  );
}
export default HomePage;
