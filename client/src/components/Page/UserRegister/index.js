import { useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './UserRegister.module.scss';
import images from '~/assets/images';
import Input from '~/components/Input';
import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faEarthAmerica,
  faEnvelope,
  faEye,
  faEyeSlash,
  faHouse,
  faLocationDot,
  faLock,
  faPhone,
  faRoad,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { faCompass } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function UserRegister() {
  const [eyeIcon, setEyeIcon] = useState(0);
  const [passType, setPassType] = useState('password');
  const handleEye = () => {
    setEyeIcon(1 - eyeIcon);
    setPassType(passType === 'text' ? 'password' : 'text');
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('bgImg')}></div>
      <div className={cx('register-form')}>
        <div className="register-form-header">
          <img className={cx('logo')} src={images.logo} alt="logo" />
          <p className={cx('title')}>Đăng ký tài khoản</p>
        </div>
        <div className={cx('register-form-body')}>
          <div>
            <span>
              <Input
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                placeHolder="Họ và tên"
                errorText="Họ và tên là bắt buộc!"
                classes="register-input"
              />
            </span>
            <span>
              <Input
                leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                placeHolder="E-mail"
                errorText="E-mail là bắt buộc!"
                classes="register-input"
              />
            </span>
            <span>
              <Input
                leftIcon={<FontAwesomeIcon icon={faPhone} />}
                placeHolder="Điện thoại"
                errorText="Điện thoại là bắt buộc!"
                classes="register-input"
              />
            </span>
          </div>
          <div>
            <span>
              <Input
                leftIcon={<FontAwesomeIcon icon={faEarthAmerica} />}
                rightIcon={<FontAwesomeIcon icon={faLocationDot} />}
                placeHolder="Địa chỉ"
                errorText="Địa chỉ là bắt buộc!"
                classes="register-input"
              />
            </span>
          </div>
          <div>
            <span>
              <Input
                leftIcon={<FontAwesomeIcon icon={faBuilding} />}
                rightIcon={<FontAwesomeIcon icon={faCompass} />}
                placeHolder="Tỉnh/TP"
                errorText="Tỉnh/TP là bắt buộc!"
                classes="register-input"
              />
            </span>
            <span>
              <Input
                leftIcon={<FontAwesomeIcon icon={faRoad} />}
                rightIcon={<FontAwesomeIcon icon={faCompass} />}
                placeHolder="Quận/Huyện"
                errorText="Quận/Huyện là bắt buộc!"
                classes="register-input"
              />
            </span>
            <span>
              <Input
                leftIcon={<FontAwesomeIcon icon={faHouse} />}
                rightIcon={<FontAwesomeIcon icon={faCompass} />}
                placeHolder="Phường/Xã"
                errorText="Phường/Xã là bắt buộc!"
                classes="register-input"
              />
            </span>
          </div>
          <div>
            <span>
              <Input
                leftIcon={<FontAwesomeIcon icon={faLock} />}
                rightIcon={eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                placeHolder="Mật khẩu"
                errorText="Mật khẩu là bắt buộc!"
                classes="register-input"
                type={passType}
                onClick={() => handleEye()}
              />
            </span>
            <span>
              <Input
                leftIcon={<FontAwesomeIcon icon={faEyeSlash} />}
                rightIcon={eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                placeHolder="Xác nhận mật khẩu"
                errorText="Trường này là bắt buộc!"
                classes="register-input"
                type={passType}
                onClick={() => handleEye()}
              />
            </span>
          </div>

          <div>
            <span className={cx('register-btn')}>
              <Button log>Đăng ký</Button>
            </span>
          </div>
          <div>
            <span className={cx('route-link')}>
              Bạn đã có tài khoản?
              <Link to="/user/login">Đăng nhập</Link>
            </span>
          </div>
        </div>
      </div>
      <div className={cx('more-info')}></div>
    </div>
  );
}

export default UserRegister;
