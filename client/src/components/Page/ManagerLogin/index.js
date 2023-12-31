import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cookies } from 'react-cookie';

import classNames from 'classnames/bind';
import styles from './ManagerLogin.module.scss';
import images from '~/assets/images';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Form from '~/components/Layout/Form';
import { AuthContext } from '~/provider/authProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

axios.defaults.headers.post['Content-Type'] = 'application/json';
const cx = classNames.bind(styles);
const data = [
  {
    id: 'transaction',
    name: 'Transaction',
  },
  {
    id: 'collection',
    name: 'Collection',
  },
];

function ManagerLogin() {
  const [eyeIcon, setEyeIcon] = useState(0);
  const [passType, setPassType] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [kindPoint, setKindPoint] = useState('transaction');
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const authContext = useContext(AuthContext);
  const handleEye = () => {
    setEyeIcon(1 - eyeIcon);
    setPassType(passType === 'text' ? 'password' : 'text');
  };
  console.log(kindPoint);
  const handleLogin = () => {
    usernameRef.current.focus();

    if (username === '' || password === '') {
      toast.error('Vui lòng điền đầu đủ thông tin!');
    } else {
      axios
        .post(`http://localhost:1510/managerLogin`, {
          username: username,
          password: password,
          kindPoint: kindPoint,
        })
        .then(function (response) {
          let data = response.data;
          if (data.flag === 0) {
            console.log('Fail');
            if (!data.checkUsername) {
              toast.error('Tài khoản không tồn tại!');
            } else {
              toast.error('Mật khẩu không chính xác!');
            }
          } else {
            localStorage.setItem('token', data.token);
            authContext.setToken(data.token);
            console.log('Success');
            if (kindPoint == 'transaction') {
              navigate('/transaction/manager');
              navigate(0);
            } else {
              navigate('/collection/manager');
              navigate(0);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setUsername('');
      setPassword('');
    }
  };

  return (
    <React.Fragment>
      <Form>
        <div className={cx('login-form-header')}>
          <img className={cx('logo')} src={images.logo} alt="logo" />
          <p className={cx('title')}>Đăng nhập tài khoản</p>
        </div>
        <div className={cx('login-form-body')}>
          <Input
            refC={usernameRef}
            value={username}
            leftIcon={<FontAwesomeIcon icon={faUser} />}
            placeHolder="Tài khoản"
            errorText="Tài khoản là bắt buộc!"
            required
            onChange={(value) => {
              setUsername(value);
            }}
          />
          <Input
            refC={passwordRef}
            value={password}
            type={passType}
            leftIcon={<FontAwesomeIcon icon={faLock} />}
            rightIcon={eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            placeHolder="Mật khẩu"
            errorText="Mật khẩu là bắt buộc!"
            required
            onClick={() => handleEye()}
            onChange={(value) => {
              setPassword(value);
            }}
          />
          <Input
            value={kindPoint}
            placeHolder="Loại điểm"
            errorText="Trường này là bắt buộc!"
            classes="register-input"
            onChange={(value) => setKindPoint(value)}
            data={data}
            select={true}
            optionLabel="name"
            optionValue="id"
            required
          />
          <div className={cx('signin-btn')}>
            <Button
              log
              onClick={() => {
                handleLogin();
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
            <Link to="/employee/login">
              <Button outline>Tài khoản nhân viên</Button>
            </Link>
          </div>
        </div>
        <div className={cx('more-info')}></div>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  );
}

export default ManagerLogin;
