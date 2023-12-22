import classNames from 'classnames/bind';
import styles from './home.module.scss';
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
//app bar
const AppBarMenu = () => {
  const [isFixed, setIsFixed] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsFixed(scrollPosition > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className={cx(styles.appBar, { 'app-bar-fixed': isFixed })}>
      <ul id="main-menu">
        <li className={cx(styles.menuItem)}>
          Trang chủ
          <ul className={cx(styles.subMenu)}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx(styles.menuItem)}>
          Dịch vụ
          <ul className={cx(styles.subMenu)}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx(styles.menuItem)}>
          Tin tức
          <ul className={cx(styles.subMenu)}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx(styles.menuItem)}>
          Ứng dụng số
          <ul className={cx(styles.subMenu)}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx(styles.menuItem)}>
          Hỗ trợ khách hàng
          <ul className={cx(styles.subMenu)}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
export default AppBarMenu;
