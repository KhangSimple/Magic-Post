import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Slider from 'react-slick';
import images from '~/assets/images';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
    objectFit: 'cover', // Đảm bảo ảnh fit vào kích thước đã thiết lập
  };
  const cx = classNames.bind(styles);
  return (
    <div>
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

export default Banner;
