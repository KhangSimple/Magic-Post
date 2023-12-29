//image upload
import { imageDB } from '~/utils/firebase-image-upload';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from '~/components/Input';
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
import React, { useEffect, useState, useRef } from 'react';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ZIP_CODE = localStorage.getItem('zip_code');
const EditUserProfile = ({ handleCloseModal, idUser }) => {
  const [profileImageURL, setProfileImageURL] = useState(idUser.avatarUrl);
  //Profile Image ref
  const profileImageRef = useRef();
  const stackProfileImageRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    profileImageRef.current.style.backgroundImage = `url(${idUser.avatarUrl})`;
    profileImageRef.current.style.backgroundRepeat = `no-repeat`;
    profileImageRef.current.style.backgroundSize = `cover`;
    stackProfileImageRef.current.style.display = 'none';
  }, []);

  const handleImageInputChange = (event) => {
    if (event.target.files.length) {
      let src = URL.createObjectURL(event.target.files[0]);

      const imgRefDB = uuidv4();

      //upload to firebase
      const imgRef = ref(imageDB, `images/${imgRefDB}`);
      uploadBytes(imgRef, event.target.files[0]).then(({ ref }) => {
        getDownloadURL(ref).then((img) => {
          // //Dom update
          profileImageRef.current.style.backgroundImage = `url(${img})`;
          profileImageRef.current.style.backgroundRepeat = `no-repeat`;
          profileImageRef.current.style.backgroundSize = `cover`;
          stackProfileImageRef.current.style.display = 'none';
          setProfileImageURL(img);
          console.log(img);
        });
      });
    }
  };

  const [eyeIcon, setEyeIcon] = useState(0);
  const [passType, setPassType] = useState('password');
  const [id, setId] = useState(idUser.id);
  const [name, setName] = useState(idUser.name);
  const [username, setUsername] = useState(idUser.username);
  const [password, setPassword] = useState(idUser.password);
  const [email, setEmail] = useState(idUser.email);
  const [phoneNumber, setPhoneNumber] = useState(idUser.phoneNumber);
  const [address, setAddress] = useState(idUser.address);
  const [repassword, setRepassword] = useState(idUser.password);

  const allInfo = {
    token: localStorage.getItem('token'),
    id: id,
    name: name,
    username: username,
    password: password,
    address: address,
    phone: phoneNumber,
    email: email,
    transaction_zip_code: ZIP_CODE,
    img_url: profileImageURL,
  };
  const handleEye = () => {
    setEyeIcon(1 - eyeIcon);
    setPassType(passType === 'text' ? 'password' : 'text');
  };
  const handleUpdateUserProfile = () => {
    let check = false;
    Object.keys(allInfo).forEach((item) => {
      check = check || allInfo[item] === '';
    });
    if (check) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
    } else {
      axios
        .post(`http://localhost:1510/updateUserProfile`, {
          data: allInfo,
        })
        .then(function (response) {
          let data = response.data;
          handleCloseModal();
          toast.success('Sửa tài khoản thành công');
          navigate(0);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Container>
      <Grid container spacing={3} alignContent={'center'} justifyContent={'center'}>
        <Grid xs={12} md={4}>
          <Card>
            <Paper
              sx={{
                backgroundColor: 'rgb(255, 255, 255)',
                color: 'rgb(33, 43, 54)',
                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                backgroundImage: 'none',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'rgba(145, 158, 171, 0.16) 0px 1px 2px 0px',
                borderRadius: '16px',
                zIndex: 0,
                padding: '80px 24px 40px',
              }}
            >
              <label htmlFor={'createImageProfile'}>
                <Box
                  sx={{
                    padding: '8px',
                    margin: 'auto',
                    width: '144px',
                    height: '144px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: '50%',
                    border: '1px dashed rgba(145, 158, 171, 0.2)',
                  }}
                >
                  <input
                    accept="image/*"
                    type="file"
                    tabIndex="-1"
                    style={{ display: 'none' }}
                    id={'createImageProfile'}
                    onChange={handleImageInputChange}
                  ></input>
                  <Box
                    ref={profileImageRef}
                    sx={{
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: '50%',
                      position: 'relative',
                    }}
                  >
                    <Stack
                      ref={stackProfileImageRef}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        WebkitBoxAlign: 'center',
                        alignItems: 'center',
                        WebkitBoxPack: 'center',
                        justifyContent: 'center',
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: '100%',
                        zIndex: 9,
                        borderRadius: '50%',
                        position: 'absolute',
                        color: 'rgb(145, 158, 171)',
                        backgroundColor: 'rgba(145, 158, 171, 0.08)',
                        transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        className="component-iconify MuiBox-root css-x3wokz iconify iconify--solar"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                          <path d="M12 10.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V15a.75.75 0 0 1-1.5 0v-1.25H10a.75.75 0 0 1 0-1.5h1.25V11a.75.75 0 0 1 .75-.75"></path>
                          <path d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697c0-3.065 0-4.597-.749-5.697a4.407 4.407 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.405 4.405 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M16 13a4 4 0 1 1-8 0a4 4 0 0 1 8 0m2-3.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5z"></path>
                        </g>
                      </svg>
                      <span className="MuiTypography-root MuiTypography-caption css-176slt">Upload photo</span>
                    </Stack>
                  </Box>
                </Box>
              </label>

              <Typography
                sx={{
                  margin: '24px auto 0px',
                  lineHeight: '1.5',
                  fontSize: '0.75rem',
                  fontFamily: '"Public Sans", sans-serif',
                  fontWeight: '400',
                  color: 'rgb(145, 158, 171)',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif<br></br> max size of 3 Mb
              </Typography>
            </Paper>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card>
            <Paper
              sx={{
                backgroundColor: 'rgb(255, 255, 255)',
                color: 'rgb(33, 43, 54)',
                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                backgroundImage: 'none',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'rgba(145, 158, 171, 0.16) 0px 1px 2px 0px',
                borderRadius: '16px',
                zIndex: 0,
                padding: '24px',
              }}
            >
              <Grid container>
                <Grid item container xs={12} md={6}>
                  <Container>
                    <Input
                      value={name}
                      leftIcon={<FontAwesomeIcon icon={faUser} />}
                      placeHolder="Họ và tên"
                      errorText="Họ và tên là bắt buộc!"
                      classes="register-input"
                      onChange={(value) => setName(value)}
                      required
                    />
                    <Input
                      value={username}
                      leftIcon={<FontAwesomeIcon icon={faPhone} />}
                      placeHolder="Username"
                      errorText="Username là bắt buộc!"
                      classes="register-input"
                      onChange={(value) => setUsername(value)}
                      required
                    />
                    <Input
                      value={email}
                      leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                      placeHolder="E-mail"
                      errorText="E-mail là bắt buộc!"
                      classes="register-input"
                      type="email"
                      onChange={(value) => setEmail(value)}
                      required
                    />
                    <Input
                      value={phoneNumber}
                      leftIcon={<FontAwesomeIcon icon={faPhone} />}
                      placeHolder="Điện thoại"
                      errorText="Điện thoại là bắt buộc!"
                      classes="register-input"
                      onChange={(value) => setPhoneNumber(value)}
                      required
                    />
                  </Container>
                </Grid>
                <Grid item container xs={12} md={6}>
                  <Container>
                    <Input
                      value={password}
                      leftIcon={<FontAwesomeIcon icon={faLock} />}
                      rightIcon={
                        eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />
                      }
                      placeHolder="Mật khẩu"
                      errorText="Mật khẩu là bắt buộc!"
                      classes="register-input"
                      type={passType}
                      onClick={() => handleEye()}
                      onChange={(value) => setPassword(value)}
                      required
                    />
                    <Input
                      value={repassword}
                      valueCheck={password}
                      leftIcon={<FontAwesomeIcon icon={faEyeSlash} />}
                      rightIcon={
                        eyeIcon === 0 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />
                      }
                      placeHolder="Xác nhận mật khẩu"
                      errorText={password !== repassword ? 'Mật khẩu không khớp!' : ''}
                      classes="register-input"
                      type={passType}
                      onClick={() => handleEye()}
                      onChange={(value) => setRepassword(value)}
                      required
                    />
                    <Input
                      value={address}
                      leftIcon={<FontAwesomeIcon icon={faEarthAmerica} />}
                      rightIcon={<FontAwesomeIcon icon={faLocationDot} />}
                      placeHolder="Địa chỉ"
                      errorText="Địa chỉ là bắt buộc!"
                      classes="register-input"
                      onChange={(value) => setAddress(value)}
                      required
                    />
                  </Container>
                </Grid>
              </Grid>
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  marginTop: '24px',
                }}
              >
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    handleUpdateUserProfile();
                  }}
                >
                  Cập nhật thông tin
                </Button>
              </Stack>
            </Paper>
          </Card>
        </Grid>
      </Grid>
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
    </Container>
  );
};
export default EditUserProfile;
