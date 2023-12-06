import classNames from 'classnames/bind';
import styles from './RestorePassword.module.scss';
import images from '~/assets/images';
import Form from '~/components/Layout/Form';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const data = [
  {
    name: 'Điện thoại',
    type: 'phone',
  },
  {
    name: 'Email',
    type: 'email',
  },
];

function RestorePassword() {
  const [eyeIcon, setEyeIcon] = useState(0);
  const [type, setType] = useState('phone');
  const [passType, setPassType] = useState('password');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const handleEye = () => {
    setEyeIcon(1 - eyeIcon);
    setPassType(passType === 'text' ? 'password' : 'text');
  };
  return (
    <Form>
      <div className={cx('res-pass-form-header')}>
        <img className={cx('logo')} src={images.logo} alt="logo" />
        <p className={cx('title')}>Yêu cầu thay đổi mật khẩu</p>
      </div>
      <div className={cx('res-pass-form-body')}>
        <div>
          <span>
            <Input
              placeHolder="-- Chọn hình thức xác thực --"
              errorText=""
              classes="register-input"
              onChange={(value) => setType(value)}
              data={data}
              select={true}
              optionLabel="name"
              optionValue="type"
            />
          </span>
        </div>
        <div>
          <span>
            <Input
              value={type === 'phone' ? phone : email}
              placeHolder={type === 'phone' ? '0123456789' : 'Email'}
              errorText={type === 'phone' ? 'Số điện thoại là bắt buộc!' : 'Email là bắt buộc!'}
              onChange={(value) => {
                type === 'phone' ? setPhone(value) : setEmail(value);
              }}
            />
          </span>
        </div>
        <div>
          <span>
            <Input
              placeHolder="Mật khẩu"
              rightIcon={eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              errorText="Mật khẩu là bắt buộc!"
              type={passType}
              onClick={() => handleEye()}
              onChange={(value) => setPassword(value)}
            />
          </span>
        </div>
        <div>
          <span>
            <Input
              valueCheck={password}
              rightIcon={eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              placeHolder="Xác nhận mật khẩu"
              errorText={password !== repassword ? 'Mật khẩu không khớp!' : ''}
              type={passType}
              onClick={() => handleEye()}
              onChange={(value) => setRepassword(value)}
            />
          </span>
        </div>
        <div>
          <Button log onClick={() => {}}>
            Gửi yêu cầu
          </Button>
        </div>
        <div>
          <span className={cx('route-link')}>
            <Link to="/user/login">Đăng nhập</Link>
          </span>
        </div>
      </div>
      <div className={cx('more-info')}></div>
    </Form>
  );
}

export default RestorePassword;
