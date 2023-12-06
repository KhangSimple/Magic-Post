import { useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './CustomerLogin.module.scss';
import images from '~/assets/images';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Form from '~/components/Layout/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CustomerLogin() {
  const [eyeIcon, setEyeIcon] = useState(0);
  const [passType, setPassType] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleEye = () => {
    setEyeIcon(1 - eyeIcon);
    setPassType(passType === 'text' ? 'password' : 'text');
  };
  return (
    <Form>
      <div className="login-form-header">
        <img className={cx('logo')} src={images.logo} alt="logo" />
        <p className={cx('title')}>Đăng nhập tài khoản</p>
      </div>
      <div className={cx('login-form-body')}>
        <Input
          value={username}
          leftIcon={<FontAwesomeIcon icon={faUser} />}
          placeHolder="Tài khoản"
          errorText="Tài khoản là bắt buộc!"
          onChange={(value) => {
            setUsername(value);
          }}
        />
        <Input
          value={password}
          type={passType}
          leftIcon={<FontAwesomeIcon icon={faLock} />}
          rightIcon={eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          placeHolder="Mật khẩu"
          errorText="Mật khẩu là bắt buộc!"
          onClick={() => handleEye()}
          onChange={(value) => {
            setPassword(value);
          }}
        />
        <span className={cx('route-link')}>
          <Link to="/restore-password" className={cx('forgot-pass')}>
            Quên mật khẩu
          </Link>
        </span>
        <div className={cx('signin-btn')}>
          <Button
            log
            onClick={() => {
              console.log(username);
            }}
          >
            Đăng nhập
          </Button>
        </div>
        <div className={cx('switch-text')}>
          <hr style={{ flex: 1 }} />
          <span style={{ padding: '10px' }}>Hoặc đăng nhập với</span>
          <hr style={{ flex: 1 }} />
        </div>
        <div>
          {/* <Button outline>Tài khoản trưởng điểm MGPost</Button> */}
          <Link to="/employee/login">
            <Button outline>Tài khoản nhân viên MGPost</Button>
          </Link>
        </div>
        <span className={cx('route-link')}>
          Bạn chưa có tài khoản?
          <Link to="/register">Đăng ký ngay</Link>
        </span>
      </div>
      <div className={cx('more-info')}></div>
    </Form>
  );
}

export default CustomerLogin;
