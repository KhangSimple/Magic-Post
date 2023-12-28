import React from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <footer>
      <div className={cx(styles.footer)}>
        <div className={cx(styles.lineFooter)}></div>
        <div className={cx(styles.content)}>
          <div className={cx(styles.title)}>
            <h1>Ứng dụng: Magic Post</h1>
            <p>Văn phòng giao dịch: Cầu Giấy, Hà Nội</p>
            <p>Email: cskh@magicpost.com.vn</p>
            <p>Số điện thoại: 0123456789</p>
            <p>Mã số thuế: 9876543210</p>
          </div>
          <div>
            <h2>Nhóm sinh viên thực hiện: </h2>
            <div className={cx(styles.contact)}>
              <div className={cx(styles.contactInfo)}>
                <p>Trần Duy Khánh</p>
                <p>MSV: 21020769</p>

                <p>Email: 21020769@gmail.com.vn</p>
              </div>
              <div className={cx(styles.contactInfo)}>
                <p>Nguyễn Nhật Lê</p>
                <p>MSV: 21020347</p>

                <p>Email: 21020347@gmail.com.vn</p>
              </div>

              <div className={cx(styles.contactInfo)}>
                <p>Trần Phúc Khang</p>
                <p>MSV: 21020341</p>

                <p>Email: 21020341@gmail.com.vn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
