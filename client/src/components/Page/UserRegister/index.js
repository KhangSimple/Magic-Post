import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [tinh, setTinh] = useState('');
  const [huyen, setHuyen] = useState('');
  const [xa, setXa] = useState('');
  const [repassword, setRepassword] = useState('');
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  const allInfo = {
    username: username,
    password: password,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    tinh: tinh,
    huyen: huyen,
    xa: xa,
    repassword: repassword,
  };
  const handleEye = () => {
    setEyeIcon(1 - eyeIcon);
    setPassType(passType === 'text' ? 'password' : 'text');
  };
  const handleRegister = () => {
    let check = false;
    Object.keys(allInfo).forEach((item) => {
      check = check || allInfo[item] === '';
      // if (allInfo[item] === '') {
      //   console.log(item);
      // }
    });
    if (check) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
    } else {
      axios
        .post(`http://localhost:1510/register`, {
          data: allInfo,
        })
        .then(function (response) {
          let data = response.data;
          if (data.flag === 0) {
          } else {
            // Do something ...
            console.log('Success');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  // Get ProvinceData from API
  useEffect(() => {
    axios
      .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
        headers: { token: '1b869b93-97de-11ee-a59f-a260851ba65c' },
      })
      .then(function (response) {
        setProvinceData((prev) => [...response.data.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (tinh !== '') {
      setHuyen('');
      setXa('');
      setWardData([]);
      axios
        .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
          headers: { token: '7dbb1c13-7e11-11ee-96dc-de6f804954c9' },
          params: {
            province_id: +tinh,
          },
        })
        .then(function (response) {
          setDistrictData((prev) => [...response.data.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [tinh]);
  useEffect(() => {
    if (huyen !== '') {
      setXa('');
      axios
        .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
          headers: { token: '7dbb1c13-7e11-11ee-96dc-de6f804954c9' },
          params: {
            district_id: +huyen,
          },
        })
        .then(function (response) {
          setWardData((prev) => [...response.data.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [huyen]);

  return (
    <React.Fragment>
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
                  value={username}
                  leftIcon={<FontAwesomeIcon icon={faUser} />}
                  placeHolder="Họ và tên"
                  errorText="Họ và tên là bắt buộc!"
                  classes="register-input"
                  onChange={(value) => setUsername(value)}
                />
              </span>
              <span>
                <Input
                  value={email}
                  leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                  placeHolder="E-mail"
                  errorText="E-mail là bắt buộc!"
                  classes="register-input"
                  type="email"
                  onChange={(value) => setEmail(value)}
                />
              </span>
              <span>
                <Input
                  value={phoneNumber}
                  leftIcon={<FontAwesomeIcon icon={faPhone} />}
                  placeHolder="Điện thoại"
                  errorText="Điện thoại là bắt buộc!"
                  classes="register-input"
                  onChange={(value) => setPhoneNumber(value)}
                />
              </span>
            </div>
            <div>
              <span>
                <Input
                  value={address}
                  leftIcon={<FontAwesomeIcon icon={faEarthAmerica} />}
                  rightIcon={<FontAwesomeIcon icon={faLocationDot} />}
                  placeHolder="Địa chỉ"
                  errorText="Địa chỉ là bắt buộc!"
                  classes="register-input"
                  onChange={(value) => setAddress(value)}
                />
              </span>
            </div>
            <div>
              <span>
                <Input
                  value={tinh}
                  leftIcon={<FontAwesomeIcon icon={faBuilding} />}
                  rightIcon={<FontAwesomeIcon icon={faCompass} />}
                  placeHolder="Tỉnh/TP"
                  errorText="Tỉnh/TP là bắt buộc!"
                  classes="register-input"
                  onChange={(value) => setTinh(value)}
                  data={provinceData}
                  select={true}
                  optionLabel="ProvinceName"
                  optionValue="ProvinceID"
                />
              </span>
              <span>
                <Input
                  value={huyen}
                  leftIcon={<FontAwesomeIcon icon={faRoad} />}
                  rightIcon={<FontAwesomeIcon icon={faCompass} />}
                  placeHolder="Quận/Huyện"
                  errorText="Quận/Huyện là bắt buộc!"
                  classes="register-input"
                  onChange={(value) => setHuyen(value)}
                  data={districtData}
                  select={true}
                  optionLabel="DistrictName"
                  optionValue="DistrictID"
                />
              </span>
              <span>
                <Input
                  value={xa}
                  leftIcon={<FontAwesomeIcon icon={faHouse} />}
                  rightIcon={<FontAwesomeIcon icon={faCompass} />}
                  placeHolder="Phường/Xã"
                  errorText="Phường/Xã là bắt buộc!"
                  classes="register-input"
                  onChange={(value) => setXa(value)}
                  data={wardData}
                  select={true}
                  optionLabel="WardName"
                  optionValue="WardCode"
                />
              </span>
            </div>
            <div>
              <span>
                <Input
                  value={password}
                  leftIcon={<FontAwesomeIcon icon={faLock} />}
                  rightIcon={eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  placeHolder="Mật khẩu"
                  errorText="Mật khẩu là bắt buộc!"
                  classes="register-input"
                  type={passType}
                  onClick={() => handleEye()}
                  onChange={(value) => setPassword(value)}
                />
              </span>
              <span>
                <Input
                  value={repassword}
                  valueCheck={password}
                  leftIcon={<FontAwesomeIcon icon={faEyeSlash} />}
                  rightIcon={eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  placeHolder="Xác nhận mật khẩu"
                  errorText={password !== repassword ? 'Mật khẩu không khớp!' : ''}
                  classes="register-input"
                  type={passType}
                  onClick={() => handleEye()}
                  onChange={(value) => setRepassword(value)}
                />
              </span>
            </div>

            <div>
              <span className={cx('register-btn')}>
                <Button
                  log
                  onClick={() => {
                    handleRegister();
                  }}
                >
                  Đăng ký
                </Button>
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

export default UserRegister;
