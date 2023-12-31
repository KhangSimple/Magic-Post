import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cookies } from 'react-cookie';

import classNames from 'classnames/bind';
import styles from './LeaderLogin.module.scss';
import images from '~/assets/images';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Form from '~/components/Layout/Form';
import { AuthContext } from '~/provider/authProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

axios.defaults.headers.post['Content-Type'] = 'application/json';
const cx = classNames.bind(styles);
function LeaderLogin() {
  const [eyeIcon, setEyeIcon] = useState(0);
  const [passType, setPassType] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const authContext = useContext(AuthContext);
  const handleEye = () => {
    setEyeIcon(1 - eyeIcon);
    setPassType(passType === 'text' ? 'password' : 'text');
  };
  const handleLogin = () => {
    usernameRef.current.focus();
    const cookies = new Cookies();
    if (username === '' || password === '') {
      toast.error('Vui lòng điền đầu đủ thông tin!');
    } else {
      axios
        .post(`http://localhost:1510/leaderLogin`, {
          username: username,
          password: password,
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
            navigate('/leader');
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
          <p className={cx('title')}>Đăng nhập tài khoản Admin</p>
        </div>
        <div
          className={cx('login-form-body')}
          style={{
            paddingBottom: '3rem',
          }}
        >
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
        </div>
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

export default LeaderLogin;
