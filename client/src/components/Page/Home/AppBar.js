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
            <li>Về chúng tôi</li>
            <li>Liên hệ</li>
            <li>API</li>
          </ul>
        </li>
        <li className={cx(styles.menuItem)}>
          Dịch vụ
          <ul className={cx(styles.subMenu)}>
            <li>Dịch vụ trong nước</li>
            <li>Dịch vụ quốc tế</li>
            <li>Dịch vụ logistic</li>
            <li>Thương mại điện tử</li>
          </ul>
        </li>
        <li className={cx(styles.menuItem)}>
          Tin tức
          <ul className={cx(styles.subMenu)}>
            <li>Tin tức hoạt động</li>
            <li>Tin tức khuyến mãi</li>
            <li>Tin tức đấu thầu</li>
            <li>Hướng dẫn sử dụng</li>
          </ul>
        </li>
        <li className={cx(styles.menuItem)}>
          Ứng dụng số
          <ul className={cx(styles.subMenu)}>
            <li>MagicPost App</li>
            <li>MagicPost Sale</li>
            <li>Quảng cáo số</li>
          </ul>
        </li>
        <li className={cx(styles.menuItem)}>
          Hỗ trợ khách hàng
          <ul className={cx(styles.subMenu)}>
            <li>Hướng dẫn sử dụng</li>
            <li>Câu hỏi thường gặp</li>
            <li>Khiếu nại</li>
          </ul>
        </li>
        <li className={cx(styles.menuItem)}>Tuyển dụng</li>
      </ul>
    </nav>
  );
};
export default AppBarMenu;
