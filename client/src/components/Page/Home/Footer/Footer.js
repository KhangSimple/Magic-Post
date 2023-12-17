import React from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <footer>
      <div className={cx('footer')}>
        <div className={cx('line-footer')}></div>
        <div className="contact-info">
          <p>Tên ứng dụng: Magic Post</p>
          <p>Địa chỉ: Cầu Giấy, Hà Nội</p>
          <p>Số điện thoại: 0123456789</p>
          <p>Email: kekeke@gmail.com.vn</p>
          <p>Mã số thuế: 0123456789</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
