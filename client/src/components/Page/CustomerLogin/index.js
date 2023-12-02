import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './CustomerLogin.module.scss';
import images from '~/assets/images';
import Input from '~/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CustomerLogin() {
  const [eyeIcon, setEyeIcon] = useState(0);
  const [passType, setPassType] = useState('password');
  const handleEye = () => {
    setEyeIcon(1 - eyeIcon);
    setPassType(passType === 'text' ? 'password' : 'text');
  };
  console.log(eyeIcon);
  console.log(passType);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('bgImg')}></div>
      <div className={cx('login-form')}>
        <div className="login-form-header">
          <img className={cx('logo')} src={images.logo} />
          <p className={cx('title')}>Đăng nhập tài khoản</p>
        </div>
        <div className={cx('login-form-body')}>
          <Input leftIcon={<FontAwesomeIcon icon={faUser} />} placeHolder="Tài khoản" />
          <Input
            type={passType}
            leftIcon={<FontAwesomeIcon icon={faLock} />}
            rightIcon={eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            placeHolder="Mật khẩu"
            onClick={() => handleEye()}
          />
          {/* <Link to="/restore-password" className={cx('route-link')}>
            Quên mật khẩu
          </Link> */}
        </div>
      </div>
      <div className={cx('more-info')}></div>
    </div>
  );
}

export default CustomerLogin;
