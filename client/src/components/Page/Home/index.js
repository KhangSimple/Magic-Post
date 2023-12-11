import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import Input from '~/components/Input';
// import { AppBar, Toolbar, Typography, Button, IconButton, Tabs, Tab, Box } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';

const cx = classNames.bind(styles);
//header
const Header = () => {
  return (
    <header>
      <div>
        <img className={cx('logo')} src={images.logo} alt="logo" />
      </div>
      <div className={cx('search-login')}>
        <div className={cx('search')}>
          <input
            className={cx('search-input')}
            // leftIcon={<FontAwesomeIcon icon={faSearch} />}
            placeHolder="Tìm kiếm"
            onChange={(value) => {
              console.log('Hehe');
            }}
          />
        </div>
        <div className={cx('login-register')}>
          <button>Đăng ký/Đăng nhập</button>
        </div>
      </div>
    </header>
  );
};
//app bar
const AppBarMenu = () => {
  const [isFixed, setIsFixed] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsFixed(scrollPosition > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className={cx('app-bar', { 'app-bar-fixed': isFixed })}>
      <ul id="main-menu">
        <li className={cx('menu-item')}>
          Trang chủ
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Dịch vụ
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Tin tức
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Ứng dụng số
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
        <li className={cx('menu-item')}>
          Hỗ trợ khách hàng
          <ul className={cx('sub-menu')}>
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
//banner
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const imageStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    objectFit: 'cover',
  };
  const cx = classNames.bind(styles);
  return (
    <div className={cx('banner-container')}>
      <Slider {...settings}>
        <div>
          <img className={cx('banner')} src={images.banner1} alt="banner1" style={imageStyle} />
        </div>
        <div>
          <img className={cx('banner')} src={images.banner2} alt="banner2" style={imageStyle} />
        </div>
        <div>
          <img className={cx('banner')} src={images.banner3} alt="banner3" style={imageStyle} />
        </div>
      </Slider>
    </div>
  );
};
//main
const Main = () => {
  const imageUrl = 'https://meest.com/uploads/images/58ff1989b97bbae7bcda3158eb77caf2.png';
  return (
    <div>
      Mỗi năm Hoàng Phát Fruit cung ứng 10.000 tấn trái cây cho các thị trường. Vài năm trước, Nhật Bản, Hàn Quốc là thị
      trường xuất chính của họ nhưng nay Trung Quốc mới là "cứ điểm". "Trung Quốc đang là thị trường dẫn đầu về doanh
      thu của công ty, với hàng trăm tấn chuối, mít, thanh long, sầu riêng xuất bán mỗi năm", ông Nguyễn Khắc Huy - CEO
      Hoàng Phát Fruit, một trong những nhà xuất khẩu thanh long tươi lớn nhất Việt Nam - nói. Công ty cổ phần Hoàng Anh
      Gia Lai - đơn vị đã có 4 năm xuất khẩu chính ngạch chuối sang Trung Quốc - cũng cùng quan điểm "Trung Quốc là thị
      trường tuyệt vời". "Trung Quốc hấp thụ nông sản nhiều nhất thế giới. Nếu hàng chất lượng ổn định, Việt Nam chỉ lo
      chưa cung ứng kịp chứ chẳng sợ họ không mua", ông Đoàn Nguyên Đức nói với VnExpress. Trong mắt Công ty Vina T&T,
      đơn vị chuyên xuất khẩu trái cây sang Mỹ, Trung Quốc, Nhật Bản, thị trường với quy mô 1,4 tỷ dân này cũng là một
      mảnh đất màu mỡ. CEO Vina T&T Nguyễn Đình Tùng, người đã có 20 năm làm việc tại Trung Quốc, đánh giá: "Hàng Việt
      nếu đảm bảo chất lượng, xuất bao nhiêu họ cũng mua hết. Không có thị trường nào dân số đông và tiêu thụ nông sản
      Việt tốt như thế". Số liệu của Bộ Nông Nghiệp & Phát triển nông thôn cũng cho thấy, xuất khẩu nông sản Việt sang
      thị trường tỷ dân tăng gần gấp đôi 10 năm qua, từ 3,8 tỷ USD năm 2013 lên 6,8 tỷ USD vào năm ngoái. Mỗi năm Hoàng
      Phát Fruit cung ứng 10.000 tấn trái cây cho các thị trường. Vài năm trước, Nhật Bản, Hàn Quốc là thị trường xuất
      chính của họ nhưng nay Trung Quốc mới là "cứ điểm". "Trung Quốc đang là thị trường dẫn đầu về doanh thu của công
      ty, với hàng trăm tấn chuối, mít, thanh long, sầu riêng xuất bán mỗi năm", ông Nguyễn Khắc Huy - CEO Hoàng Phát
      Fruit, một trong những nhà xuất khẩu thanh long tươi lớn nhất Việt Nam - nói. Công ty cổ phần Hoàng Anh Gia Lai -
      đơn vị đã có 4 năm xuất khẩu chính ngạch chuối sang Trung Quốc - cũng cùng quan điểm "Trung Quốc là thị trường
      tuyệt vời". "Trung Quốc hấp thụ nông sản nhiều nhất thế giới. Nếu hàng chất lượng ổn định, Việt Nam chỉ lo chưa
      cung ứng kịp chứ chẳng sợ họ không mua", ông Đoàn Nguyên Đức nói với VnExpress. Trong mắt Công ty Vina T&T, đơn vị
      chuyên xuất khẩu trái cây sang Mỹ, Trung Quốc, Nhật Bản, thị trường với quy mô 1,4 tỷ dân này cũng là một mảnh đất
      màu mỡ. CEO Vina T&T Nguyễn Đình Tùng, người đã có 20 năm làm việc tại Trung Quốc, đánh giá: "Hàng Việt nếu đảm
      bảo chất lượng, xuất bao nhiêu họ cũng mua hết. Không có thị trường nào dân số đông và tiêu thụ nông sản Việt tốt
      như thế". Số liệu của Bộ Nông Nghiệp & Phát triển nông thôn cũng cho thấy, xuất khẩu nông sản Việt sang thị trường
      tỷ dân tăng gần gấp đôi 10 năm qua, từ 3,8 tỷ USD năm 2013 lên 6,8 tỷ USD vào năm ngoái. Mỗi năm Hoàng Phát Fruit
      cung ứng 10.000 tấn trái cây cho các thị trường. Vài năm trước, Nhật Bản, Hàn Quốc là thị trường xuất chính của họ
      nhưng nay Trung Quốc mới là "cứ điểm". "Trung Quốc đang là thị trường dẫn đầu về doanh thu của công ty, với hàng
      trăm tấn chuối, mít, thanh long, sầu riêng xuất bán mỗi năm", ông Nguyễn Khắc Huy - CEO Hoàng Phát Fruit, một
      trong những nhà xuất khẩu thanh long tươi lớn nhất Việt Nam - nói. Công ty cổ phần Hoàng Anh Gia Lai - đơn vị đã
      có 4 năm xuất khẩu chính ngạch chuối sang Trung Quốc - cũng cùng quan điểm "Trung Quốc là thị trường tuyệt vời".
      "Trung Quốc hấp thụ nông sản nhiều nhất thế giới. Nếu hàng chất lượng ổn định, Việt Nam chỉ lo chưa cung ứng kịp
      chứ chẳng sợ họ không mua", ông Đoàn Nguyên Đức nói với VnExpress. Trong mắt Công ty Vina T&T, đơn vị chuyên xuất
      khẩu trái cây sang Mỹ, Trung Quốc, Nhật Bản, thị trường với quy mô 1,4 tỷ dân này cũng là một mảnh đất màu mỡ. CEO
      Vina T&T Nguyễn Đình Tùng, người đã có 20 năm làm việc tại Trung Quốc, đánh giá: "Hàng Việt nếu đảm bảo chất
      lượng, xuất bao nhiêu họ cũng mua hết. Không có thị trường nào dân số đông và tiêu thụ nông sản Việt tốt như thế".
      Số liệu của Bộ Nông Nghiệp & Phát triển nông thôn cũng cho thấy, xuất khẩu nông sản Việt sang thị trường tỷ dân
      tăng gần gấp đôi 10 năm qua, từ 3,8 tỷ USD năm 2013 lên 6,8 tỷ USD vào năm ngoái. Mỗi năm Hoàng Phát Fruit cung
      ứng 10.000 tấn trái cây cho các thị trường. Vài năm trước, Nhật Bản, Hàn Quốc là thị trường xuất chính của họ
      nhưng nay Trung Quốc mới là "cứ điểm". "Trung Quốc đang là thị trường dẫn đầu về doanh thu của công ty, với hàng
      trăm tấn chuối, mít, thanh long, sầu riêng xuất bán mỗi năm", ông Nguyễn Khắc Huy - CEO Hoàng Phát Fruit, một
      trong những nhà xuất khẩu thanh long tươi lớn nhất Việt Nam - nói. Công ty cổ phần Hoàng Anh Gia Lai - đơn vị đã
      có 4 năm xuất khẩu chính ngạch chuối sang Trung Quốc - cũng cùng quan điểm "Trung Quốc là thị trường tuyệt vời".
      "Trung Quốc hấp thụ nông sản nhiều nhất thế giới. Nếu hàng chất lượng ổn định, Việt Nam chỉ lo chưa cung ứng kịp
      chứ chẳng sợ họ không mua", ông Đoàn Nguyên Đức nói với VnExpress. Trong mắt Công ty Vina T&T, đơn vị chuyên xuất
      khẩu trái cây sang Mỹ, Trung Quốc, Nhật Bản, thị trường với quy mô 1,4 tỷ dân này cũng là một mảnh đất màu mỡ. CEO
      Vina T&T Nguyễn Đình Tùng, người đã có 20 năm làm việc tại Trung Quốc, đánh giá: "Hàng Việt nếu đảm bảo chất
      lượng, xuất bao nhiêu họ cũng mua hết. Không có thị trường nào dân số đông và tiêu thụ nông sản Việt tốt như thế".
      Số liệu của Bộ Nông Nghiệp & Phát triển nông thôn cũng cho thấy, xuất khẩu nông sản Việt sang thị trường tỷ dân
      tăng gần gấp đôi 10 năm qua, từ 3,8 tỷ USD năm 2013 lên 6,8 tỷ USD vào năm ngoái. Mỗi năm Hoàng Phát Fruit cung
      ứng 10.000 tấn trái cây cho các thị trường. Vài năm trước, Nhật Bản, Hàn Quốc là thị trường xuất chính của họ
      nhưng nay Trung Quốc mới là "cứ điểm". "Trung Quốc đang là thị trường dẫn đầu về doanh thu của công ty, với hàng
      trăm tấn chuối, mít, thanh long, sầu riêng xuất bán mỗi năm", ông Nguyễn Khắc Huy - CEO Hoàng Phát Fruit, một
      trong những nhà xuất khẩu thanh long tươi lớn nhất Việt Nam - nói. Công ty cổ phần Hoàng Anh Gia Lai - đơn vị đã
      có 4 năm xuất khẩu chính ngạch chuối sang Trung Quốc - cũng cùng quan điểm "Trung Quốc là thị trường tuyệt vời".
      "Trung Quốc hấp thụ nông sản nhiều nhất thế giới. Nếu hàng chất lượng ổn định, Việt Nam chỉ lo chưa cung ứng kịp
      chứ chẳng sợ họ không mua", ông Đoàn Nguyên Đức nói với VnExpress. Trong mắt Công ty Vina T&T, đơn vị chuyên xuất
      khẩu trái cây sang Mỹ, Trung Quốc, Nhật Bản, thị trường với quy mô 1,4 tỷ dân này cũng là một mảnh đất màu mỡ. CEO
      Vina T&T Nguyễn Đình Tùng, người đã có 20 năm làm việc tại Trung Quốc, đánh giá: "Hàng Việt nếu đảm bảo chất
      lượng, xuất bao nhiêu họ cũng mua hết. Không có thị trường nào dân số đông và tiêu thụ nông sản Việt tốt như thế".
      Số liệu của Bộ Nông Nghiệp & Phát triển nông thôn cũng cho thấy, xuất khẩu nông sản Việt sang thị trường tỷ dân
      tăng gần gấp đôi 10 năm qua, từ 3,8 tỷ USD năm 2013 lên 6,8 tỷ USD vào năm ngoái. Mỗi năm Hoàng Phát Fruit cung
      ứng 10.000 tấn trái cây cho các thị trường. Vài năm trước, Nhật Bản, Hàn Quốc là thị trường xuất chính của họ
      nhưng nay Trung Quốc mới là "cứ điểm". "Trung Quốc đang là thị trường dẫn đầu về doanh thu của công ty, với hàng
      trăm tấn chuối, mít, thanh long, sầu riêng xuất bán mỗi năm", ông Nguyễn Khắc Huy - CEO Hoàng Phát Fruit, một
      trong những nhà xuất khẩu thanh long tươi lớn nhất Việt Nam - nói. Công ty cổ phần Hoàng Anh Gia Lai - đơn vị đã
      có 4 năm xuất khẩu chính ngạch chuối sang Trung Quốc - cũng cùng quan điểm "Trung Quốc là thị trường tuyệt vời".
      "Trung Quốc hấp thụ nông sản nhiều nhất thế giới. Nếu hàng chất lượng ổn định, Việt Nam chỉ lo chưa cung ứng kịp
      chứ chẳng sợ họ không mua", ông Đoàn Nguyên Đức nói với VnExpress. Trong mắt Công ty Vina T&T, đơn vị chuyên xuất
      khẩu trái cây sang Mỹ, Trung Quốc, Nhật Bản, thị trường với quy mô 1,4 tỷ dân này cũng là một mảnh đất màu mỡ. CEO
      Vina T&T Nguyễn Đình Tùng, người đã có 20 năm làm việc tại Trung Quốc, đánh giá: "Hàng Việt nếu đảm bảo chất
      lượng, xuất bao nhiêu họ cũng mua hết. Không có thị trường nào dân số đông và tiêu thụ nông sản Việt tốt như thế".
      Số liệu của Bộ Nông Nghiệp & Phát triển nông thôn cũng cho thấy, xuất khẩu nông sản Việt sang thị trường tỷ dân
      tăng gần gấp đôi 10 năm qua, từ 3,8 tỷ USD năm 2013 lên 6,8 tỷ USD vào năm ngoái.
    </div>
  );
};

function HomePage() {
  return (
    <div className={cx('App')}>
      <div class={cx('header')}>
        <Header />
        <AppBarMenu />
      </div>
      <Banner />
      <Main />
    </div>
  );
}
export default HomePage;
