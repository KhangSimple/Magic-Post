import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './EmployeeLogin.module.scss';
import images from '~/assets/images';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Form from '~/components/Layout/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

axios.defaults.headers.post['Content-Type'] = 'application/json';
const cx = classNames.bind(styles);

function CustomerLogin() {
  const [eyeIcon, setEyeIcon] = useState(0);
  const [passType, setPassType] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleEye = () => {
    setEyeIcon(1 - eyeIcon);
    setPassType(passType === 'text' ? 'password' : 'text');
  };
  const handleLogin = () => {
    usernameRef.current.focus();
    axios
      .get(`http://localhost:1510/getCollectionList`, {
        params: {
          id: 'abc',
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // if (username === '' || password === '') {
    //   toast.error('Vui lòng điền đầu đủ thông tin!');
    // } else {
    //   axios
    //     .post(`http://localhost:1510/employeeLogin`, {
    //       username: username,
    //       password: password,
    //     })
    //     .then(function (response) {
    //       let data = response.data;
    //       if (data.flag === 0) {
    //         console.log('Fail');
    //         if (!data.checkUsername) {
    //           toast.error('Tài khoản không tồn tại!');
    //         } else {
    //           toast.error('Mật khẩu không chính xác!');
    //         }
    //       } else {
    //         // Do something ...
    //         console.log('Success');
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   setUsername('');
    //   setPassword('');
    // }
  };
  // const handleLogin = () => {
  //   usernameRef.current.focus();
  //   axios
  //     .get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         token: '1b869b93-97de-11ee-a59f-a260851ba65c',
  //         shop_id: 4758658,
  //       },
  //       // params: {
  //       //   shop_id: 885,
  //       //   from_district: 1447,
  //       //   to_district: 1905,
  //       // },
  //       params: {
  //         service_type_id: 5,
  //         from_district_id: 1442,
  //         to_district_id: 1820,
  //         to_ward_code: '030712',
  //         height: 10,
  //         length: 10,
  //         weight: 200,
  //         width: 10,
  //         insurance_value: 0,
  //         coupon: null,
  //         items: [
  //           {
  //             name: 'TEST1',
  //             height: 5,
  //             weight: 200,
  //             length: 5,
  //             width: 5,
  //           },
  //         ],
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       // console.log('aaaa');
  //       // console.log(error.toJSON());
  //       if (error.response) {
  //         console.log('Respone');
  //       } else if (error.request) {
  //         console.log('Request');
  //       } else if (error.message) {
  //         console.log('Message');
  //       }
  //     });
  // };
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
          <div className={cx('switch-text')}>
            <hr style={{ flex: 1 }} />
            <span style={{ padding: '10px' }}>Hoặc đăng nhập với</span>
            <hr style={{ flex: 1 }} />
          </div>
          <div>
            <Link to="/user/login">
              <Button outline>Tài khoản người sử dụng</Button>
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

export default CustomerLogin;
