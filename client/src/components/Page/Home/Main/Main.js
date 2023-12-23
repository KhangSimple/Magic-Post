import classNames from 'classnames/bind';
import styles from './main.module.scss';
import React, { useState } from 'react';
import images from '~/assets/images';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import StoreIcon from '@mui/icons-material/Store';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MapIcon from '@mui/icons-material/Map';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NewsPage from './NewsPage';
const cx = classNames.bind(styles);

const TraCuuVanDon = () => {
  return <div className={cx(styles.subTabContentBox)}>Tra cứu vận đơn content</div>;
};

const UocTinhCuocPhi = () => {
  return <div className={cx(styles.subTabContentBox)}>Ước tính cước phí content</div>;
};

const TimKiemBuuCuc = () => {
  const [province, setProvince] = React.useState('');

  return (
    <div className={cx(styles.subTabContentBox)}>
      <div className={cx(styles.searchBuuCuc)}>
        <span className={cx(styles.sellectProvince)}>
          <span>
            Tra cứu bưu cục
            <Select
              InputLabel="Chọn tỉnh thành"
              className={cx(styles.sellectProvinceButton)}
              value={province}
              label="Chọn tỉnh thành"
              onChange={console.log('hehe')}
            >
              <MenuItem>Hà Nội</MenuItem>
              <MenuItem>Thanh Hóa</MenuItem>
              <MenuItem>Thái Nguyên</MenuItem>
            </Select>
          </span>
        </span>

        {/* ggMap */}
        <span className={cx(styles.ggMap)}>
          <iframe
            title="Magic Post Map"
            src="https://www.google.com/maps/d/embed?mid=11-EJ2awb6FiDtR_WH6UeZEcxIN4EPqI&ehbc=2E312F"
            width="640"
            height="680"
          ></iframe>
        </span>
      </div>
    </div>
  );
};
const DangKyDaiLyThuGom = () => {
  return <div className={cx(styles.subTabContentBox)}>Đăng ký đại lý thu gom content</div>;
};

const Main = () => {
  const [activeTab, setActiveTab] = useState('tra-cuu');
  const [activeSubTab, setActiveSubTab] = useState('tra-cuu-van-don');

  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.serviceContainer)}>
        <ul className={cx(styles.u1)}>
          <li
            className={cx(styles.traCuu, { active: activeTab === 'tra-cuu' })}
            onClick={() => {
              setActiveTab('tra-cuu');
              setActiveSubTab('tra-cuu-van-don');
            }}
          >
            Tra cứu
          </li>
          <li
            className={cx(styles.dichVu, { active: activeTab === 'dich-vu' })}
            onClick={() => setActiveTab('dich-vu')}
          >
            Dịch vụ
          </li>
        </ul>

        <div className={cx(styles.box)}>
          {activeTab === 'tra-cuu' && (
            <div>
              <ul className={cx(styles.menuItems)}>
                <li
                  className={cx(styles.subMenuItem, { active: activeSubTab === 'tra-cuu-van-don' })}
                  onClick={() => setActiveSubTab('tra-cuu-van-don')}
                >
                  <ManageSearchIcon
                    sx={{
                      marginRight: '10px',
                      marginBottom: '-10px',
                      fontSize: '40px',
                      color: activeSubTab === 'tra-cuu-van-don' ? '#4cb9f8' : 'grey',
                    }}
                  />
                  Tra cứu vận đơn
                </li>
                <li
                  className={cx(styles.subMenuItem, { active: activeSubTab === 'uoc-tinh-cuoc-phi' })}
                  onClick={() => setActiveSubTab('uoc-tinh-cuoc-phi')}
                >
                  <AttachMoneyIcon
                    sx={{
                      marginRight: '10px',
                      marginBottom: '-10px',
                      fontSize: '40px',
                      color: activeSubTab === 'uoc-tinh-cuoc-phi' ? '#4cb9f8' : 'grey',
                    }}
                  />
                  Ước tính cước phí
                </li>
                <li
                  className={cx(styles.subMenuItem, { active: activeSubTab === 'tim-kiem-buu-cuc' })}
                  onClick={() => setActiveSubTab('tim-kiem-buu-cuc')}
                >
                  <MapIcon
                    sx={{
                      marginRight: '10px',
                      marginBottom: '-10px',
                      fontSize: '40px',
                      color: activeSubTab === 'tim-kiem-buu-cuc' ? '#4cb9f8' : 'grey',
                    }}
                  />
                  Tìm kiếm bưu cục
                </li>
                <li
                  className={cx(styles.subMenuItem, { active: activeSubTab === 'dang-ky-dai-ly-thu-gom' })}
                  onClick={() => setActiveSubTab('dang-ky-dai-ly-thu-gom')}
                >
                  <StoreIcon
                    sx={{
                      marginRight: '10px',
                      marginBottom: '-10px',
                      fontSize: '40px',
                      color: activeSubTab === 'dang-ky-dai-ly-thu-gom' ? '#4cb9f8' : 'grey',
                    }}
                  />
                  Đăng ký đại lý thu gom
                </li>
              </ul>
            </div>
          )}
          <ul>
            {activeSubTab === 'tra-cuu-van-don' && <TraCuuVanDon />}
            {activeSubTab === 'uoc-tinh-cuoc-phi' && <UocTinhCuocPhi />}
            {activeSubTab === 'tim-kiem-buu-cuc' && <TimKiemBuuCuc />}
            {activeSubTab === 'dang-ky-dai-ly-thu-gom' && <DangKyDaiLyThuGom />}
          </ul>

          {activeTab === 'dich-vu' && <div className={cx(styles.subTabContentBox)}>hehe</div>}
        </div>
      </div>

      {/* quảng cáo 1 */}
      <div className={cx(styles.quangCao1)}>
        <div className={cx(styles.title)}>Phương thức hoạt động</div>
        <div className={cx(styles.greyBg)}>
          <div className={cx(styles.content)}>
            <ul className={cx(styles.row)}>
              <li className={cx(styles.active1)}>
                <LaptopChromebookIcon sx={{ margin: '0px', fontSize: '60px', color: '#4cb9f8' }} />
                <strong>Tiếp nhận đơn hàng</strong>
                Shop đăng nhập và đăng đơn hàng cho trung tâm điều vận Magic Post qua hệ thống quản lý riêng.
              </li>
              <li className={cx(styles.active2)}>
                <EventAvailableIcon sx={{ margin: '0px', fontSize: '60px', color: '#4cb9f8' }} />
                <strong>Lấy hàng</strong>
                Nhân viên Magic Post qua địa chỉ shop để lấy hàng tận nơi
              </li>
              <li className={cx(styles.active3)}>
                <DeliveryDiningIcon sx={{ margin: '0px', fontSize: '60px', color: '#4cb9f8' }} />
                <strong>Giao hàng</strong>
                Magic Post giao hàng cho khách hàng và thu hộ tiền trực tiếp (Cash on Delivery)
              </li>
              <li className={cx(styles.active4)}>
                <LocalAtmIcon sx={{ margin: '0px', fontSize: '60px', color: '#4cb9f8' }} />
                <strong>Đối soát</strong>
                Magic Post đối soát trả tiền cho shop (3 lần/tuần) qua tài khoản ngân hàng. Đồng thời gửi biên bản đối
                soát định kì vào email.
              </li>
              <li className={cx(styles.active5)}>
                <CheckCircleOutlineIcon sx={{ margin: '0px', fontSize: '60px', color: '#4cb9f8' }} />
                <strong>Kết thúc</strong>
                Giao dịch hoàn thành
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tin tức */}
      <div>
        <NewsPage />
      </div>

      {/* quảng cáo 2*/}
      <div className={cx(styles.quangCao2)}>
        <div className={cx(styles.s1)}>
          <h4>
            Mạng lưới bưu cục <br />
            trên 63 tỉnh thành{' '}
          </h4>
          <div>
            <a href="">
              <img className={cx('logo')} src={images.appstore} alt="logo" />
            </a>
            <a href="">
              <img className={cx('logo')} src={images.ggstore} alt="logo" />
            </a>
          </div>
        </div>
        <div className={cx(styles.s2)}>
          <div className={cx(styles.cout)}>
            <div>
              <GroupsIcon sx={{ margin: '10px', fontSize: '80px', color: 'white' }} />
            </div>
            <div>
              <h5>
                <div>300.000 +</div>
              </h5>
              <p>KHÁCH HÀNG TIN DÙNG</p>
            </div>
          </div>

          <div className={cx(styles.cout)}>
            <div>
              <LocalShippingIcon sx={{ margin: '10px', fontSize: '80px', color: 'white' }} />
            </div>
            <div>
              <h5>
                <div>100.000 +</div>
              </h5>
              <p>ĐƠN HÀNG ĐANG VẬN CHUYỂN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
