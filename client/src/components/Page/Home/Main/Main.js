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
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NewsPage from './NewsPage';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ParcelTracking from '../../ParcelTracking';

const cx = classNames.bind(styles);

const TraCuuVanDon = () => {
  return (
    <div className={cx(styles.subTabContentBox)}>
      <span className={cx(styles.parcelTracking)}>
        <img className={cx('minhhoa3')} src={images.minhhoa3} alt="anhminhhoa" />
      </span>
    </div>
  );
};

const UocTinhCuocPhi = () => {
  return (
    <div className={cx(styles.subTabContentBox)}>
      <div className={cx(styles.uocTinhChiPhi)}>
        <h2>BẢNG CƯỚC PHÍ GỬI HÀNG TỪ 63 TỈNH THÀNH TOÀN QUỐC</h2>
        <table className={cx(styles.shippingRatesTable)}>
          <thead className={cx(styles.tHead)}>
            <tr>
              <th rowSpan="2"></th>
              <th rowSpan="2">Nội tỉnh</th>
              <th rowSpan="2">Nội miền</th>
              <th colSpan="2">Liên miền</th>
            </tr>
            <tr>
              <th>Chuẩn</th>
              <th>Nhanh</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={cx(styles.tdHead)}>Nội thành & Ngoại thành</td>
              <td>
                16.500 <br></br> 3kg
              </td>
              <td>
                30.000 <br></br> 0.5kg
              </td>
              <td>
                30.000 - 32.000 <br></br> 0.5kg
              </td>
              <td> 45.000 </td>
            </tr>
            <tr>
              <td className={cx(styles.tdHead)}>Huyện, xã</td>
              <td>30.000</td>
              <td>35.000</td>
              <td>37.000 - 40.000</td>
              <td>55.000</td>
            </tr>
            <tr>
              <td className={cx(styles.tdHead)}>0,5kg tiếp theo</td>
              <td>+2.500</td>
              <td>+2.000</td>
              <td>+5.000</td>
              <td>+10.000</td>
            </tr>
            <tr>
              <td className={cx(styles.tdHead)}>Ưu đãi</td>
              <td>Giao trong 6h</td>
              <td>Giao trong 24 - 28h</td>
              <td>Giao trong 3 - 5 ngày</td>
              <td>Giao trong 48h</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TimKiemBuuCuc = () => {
  const [province, setProvince] = React.useState('');

  return (
    <div className={cx(styles.subTabContentBox)}>
      <div className={cx(styles.searchBuuCuc)}>
        <span className={cx(styles.sellectProvince)}>
          <span>
            <span>
              <h3>Tra cứu bưu cục</h3>
            </span>
            <span>
              <Select
                className={cx(styles.sellectProvinceButton)}
                value={province}
                label="Chọn tỉnh thành"
                onChange={console.log('hehe')}
              >
                <MenuItem>Hà Nội</MenuItem>
                <MenuItem>Thanh Hóa</MenuItem>
                <MenuItem>Thái Nguyên</MenuItem>
                <MenuItem>Cao Bằng</MenuItem>
                <MenuItem>Lạng Sơn</MenuItem>
                <MenuItem>Quảng Ninh</MenuItem>
              </Select>
            </span>
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
  return (
    <div className={cx(styles.subTabContentBox)}>
      <div className={cx(styles.dangKyDaiLy)}>
        <span className={cx(styles.noidung)}>
          <strong>
            <h3>Đăng ký làm đại lý thu gom</h3>
          </strong>
          <br></br>
          <br></br>
          Magic Post là doanh nghiệp hàng đầu cung cấp dịch vụ chuyển phát hàng hoá, bưu kiện trong nước và quốc tế tại
          Việt Nam.<br></br>
          <br></br> Với mạng lưới rộng khắp 63 tỉnh thành trong nước. Bưu chính Magic Post cam kết cung cấp mọi giải
          phảp vận chuyển tối ưu nhất cho khách hàng với phương châm “NHANH, AN TOÀN, HIỆU QUẢ”.<br></br>
          <br></br> Nhằm mục đích mở rộng mạng lưới phủ trên toàn quốc. Bưu chính Magic Post tuyển dụng đơn vị, cá nhân
          có mặt bằng phù hợp để làm đại lý nhận, chuyển phát hàng hoá trên toàn quốc. <br></br> <br></br>
          <span className={cx(styles.button)}>
            <Button variant="contained">
              Đăng ký đại lý &nbsp;
              <ArrowForwardIcon />
            </Button>
          </span>
        </span>
        <span>
          <img className={cx('minhhoa1')} src={images.minhhoa1} alt="anhminhhoa" />
        </span>
      </div>
    </div>
  );
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
            <div className={cx(styles.mainTabContent)}>
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
              <ul>
                {activeSubTab === 'tra-cuu-van-don' && <TraCuuVanDon />}
                {activeSubTab === 'uoc-tinh-cuoc-phi' && <UocTinhCuocPhi />}
                {activeSubTab === 'tim-kiem-buu-cuc' && <TimKiemBuuCuc />}
                {activeSubTab === 'dang-ky-dai-ly-thu-gom' && <DangKyDaiLyThuGom />}
              </ul>
            </div>
          )}
          {activeTab === 'dich-vu' && (
            <div className={cx(styles.mainTabContent)}>
              <span>
                <span className={cx(styles.DichVuContent1)}>
                  <span className={cx(styles.itemDichVu)}>
                    <LocalShippingIcon sx={{ margin: '10px', fontSize: '80px', color: '#4cb9f8' }} />

                    <h3>
                      <strong>Chuyển phát nhanh hàng hóa, tài liệu</strong>
                    </h3>
                    <br></br>
                    <p>
                      Là dịch vụ nhận gửi, vận chuyển và phát các loại thư, tài liệu, thư từ trong nước theo chỉ tiêu
                      thời gian tiêu chuẩn. Không áp dụng với các đơn hàng có thu hộ COD.
                    </p>
                    <br></br>
                    <Button variant="text">
                      Xem chi tiết &nbsp; <ArrowForwardIcon />
                    </Button>
                  </span>
                  <span className={cx(styles.itemDichVu)}>
                    <LocalShippingIcon sx={{ margin: '10px', fontSize: '80px', color: '#4cb9f8' }} />

                    <h3>
                      <strong>Chuyển phát Thương mại điện tử</strong>
                    </h3>
                    <br></br>
                    <p>
                      I. ĐỊNH NGHĨA Dịch vụ Chuyển phát Thương mại điện tử là dịch vụ giao hàng thu tiền, nhận gửi, vận
                      chuyển hàng hóa, vật phẩm với thời gian tối ưu, áp dụng cho khách hàng kinh doanh online và
                      offline trên toàn quốc. Dịch vụ cung cấp nhiều ưu đãi liên quan đến phí thu […]
                    </p>
                    <br></br>
                    <Button variant="text">
                      Xem chi tiết &nbsp; <ArrowForwardIcon />
                    </Button>
                  </span>
                </span>
                <span className={cx(styles.DichVuContent2)}>
                  <span className={cx(styles.itemDichVu)}>
                    <LocalShippingIcon sx={{ margin: '10px', fontSize: '80px', color: '#4cb9f8' }} />

                    <h3>
                      <strong>Chuyển phát Tiết kiệm</strong>
                    </h3>
                    <br></br>
                    <p>
                      I. ĐỊNH NGHĨA Dịch vụ Chuyển phát tiết kiệm là dịch vụ nhận gửi, vận chuyển và phát các loại hàng
                      hóa, bưu phẩm, bưu kiện trong nước, không giới hạn mức trọng lượng, theo chỉ tiêu thời gian tiêu
                      chuẩn, giá cước hợp lý. Bảng giá không áp dụng với các đơn hàng có thu […]
                    </p>
                    <br></br>
                    <Button variant="text">
                      Xem chi tiết &nbsp; <ArrowForwardIcon />
                    </Button>
                  </span>

                  <span className={cx(styles.itemDichVu)}>
                    <RocketLaunchIcon sx={{ margin: '10px', fontSize: '80px', color: '#4cb9f8' }} />

                    <h3>
                      <strong>Chuyển phát Hoả tốc, hẹn giờ</strong>
                    </h3>
                    <br></br>
                    <p>
                      I. ĐỊNH NGHĨA Dịch vụ Chuyển phát tiết kiệm là dịch vụ nhận gửi, vận chuyển và phát các loại hàng
                      hóa, bưu phẩm, bưu kiện trong nước, không giới hạn mức trọng lượng, theo chỉ tiêu thời gian tiêu
                      chuẩn, giá cước hợp lý. Bảng giá không áp dụng với các đơn hàng có thu […]
                    </p>
                    <br></br>
                    <Button variant="text">
                      Xem chi tiết &nbsp; <ArrowForwardIcon />
                    </Button>
                  </span>
                </span>{' '}
              </span>
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className={cx(styles.parcelTrackingTitle)}>Tra cứu mã vận đơn</h3>
        <ParcelTracking />
      </div>

      {/* quảng cáo 1 */}
      <div className={cx(styles.quangCao1)}>
        <div>
          <h3 className={cx(styles.ptTitle)}>Phương thức hoạt động</h3>
        </div>
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
            <a href="https://example.com/">
              <img className={cx('logoGG')} src={images.appstore} alt="logo" />
            </a>
            <a href="https://example.com/">
              <img className={cx('logoApple')} src={images.ggstore} alt="logo" />
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
